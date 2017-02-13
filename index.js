var jwt = require('jsonwebtoken')
var WebSocketServer = require('ws').Server;
var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;

var thrift = require('thrift');
var tokenservice = require('./gen-nodejs/TokenService');
var ttypes = require('./gen-nodejs/verifytoken_types');
var assert = require('assert')
var transport = thrift.TBufferedTransport;
var protocol = thrift.TBinaryProtocol;

var connection = thrift.createConnection("localhost", 9090, {
  transport : transport,
  protocol : protocol
});

connection.on('error', function(err) {
  assert(false, err);
});
//********************************
var redis = require('redis');
var redisClient = redis.createClient();
redisClient.on("error", function (err) {
    console.log("Error " + err);
});
var geo = require('georedis').initialize(redisClient);
var geoset = geo.addSet('ludhiana');
        


//*******************************************

var thriftClient = thrift.createClient(tokenservice, connection);

var mongoDb;

MongoClient.connect('mongodb://127.0.0.1:27017/testdata', function(err, db) {
    if (err) throw err;
    mongoDb = db;
    console.log("mongo connected");
});

var wss = new WebSocketServer({
    port: 8000,
    verifyClient: function (info, cb) {
        var token = info.req.headers.token;
        if (!token)
            cb(false, 401, 'Unauthorized')
        else {
             thriftClient.sendtoken(token, function(err, response) {
                if (err)  throw err; 
                else {//TODO: check if token response is valid
                    console.log("token verified");
                    cb(true, 200, 'Ok');
                }
            });
        }
    }
});
        
    wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        ws.send('ECHO: ' + message);
        //ws.upgradeReq.user.name
        var document = {user: 'userName', data: message};
        console.log("message data" +document);
        mongoDb.collection('testdata').insert(document, function(err, records) {
            if (err) throw err;
        });
        
        var updateRedis = geoset.addLocation(
            'userName',
            { latitude: 43.646838, longitude: -79.403723 },
            function(err, reply) {
                if(err) console.error(err);
                else console.log('added location:', reply);
            }
        );
    });
                
    ws.send('Hi'); 
//  var user = ws.upgradeReq.user
    ws.send('Welcome!');
});

//        var targetVendorCount = 25;
//        var maxGeoRadius = 50000;
//        var geoRadius = 200;
//
//    var nearbylocations = function() {
//    
//    geoset.nearby(
//        {latitude: 43.646838, longitude: -79.403723}, geoRadius,
//        function(err, vendors){
//            if(err) { console.error(err); return }
//            if(vendors.length <= targetVendorCount  && geoRadius <= maxGeoRadius) {
//                geoRadius *= 2;
//                return nearbylocations();
//            }
//            return vendors;
//    });
//    
//}
            
            
                    