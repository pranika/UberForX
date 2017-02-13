
var redis = require('redis');
var client = redis.createClient();
client.on("error", function (err) {
    console.log("Error " + err);
});
var geo = require('georedis').initialize(client);

        var geoset = geo.addSet('ludhiana');

        var newuser = geoset.addLocation('vendor1',{latitude: 43.646838, longitude: -79.403723}
                                                   
        , function(err, reply){
        if(err) console.error(err);
        else console.log('added location:', reply);
        });

        var targetVendorCount = 25;
        var maxGeoRadius = 50000;
        var geoRadius = 200;

    var nearbylocations = function() {
    
    geoset.nearby(
        {latitude: 43.646838, longitude: -79.403723}, geoRadius,
        function(err, vendors){
            if(err) { console.error(err); return }
            if(vendors.length <= targetVendorCount  && geoRadius <= maxGeoRadius) {
                geoRadius *= 2;
                return nearbylocations();
            }
            return vendors;
    });
    
}

    

    