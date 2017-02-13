var thrift = require('thrift');
var tokenservice = require('./gen-nodejs/TokenService');
var ttypes = require('./gen-nodejs/verifytoken_types');

var transport = thrift.TBufferedTransport;
var protocol = thrift.TBinaryProtocol;

var connection = thrift.createConnection("localhost", 9090, {
  transport : transport,
  protocol : protocol
});

connection.on('error', function(err) {
  assert(false, err);
});


// Create a Calculator client with the connection
var client = thrift.createClient(tokenservice, connection);

client.sendtoken('my-fucking-random-token', function(err, response) {
  console.log("token" + response);
});
