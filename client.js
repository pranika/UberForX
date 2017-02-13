var jwt = require('jsonwebtoken')
var WebSocket = require('ws');

var token = jwt.sign({name:'iostreamer'},'secret-key',{
    expiresIn : 15 * 24 * 60 * 60 * 1000 // 15 days
});

ws = new WebSocket('ws://localhost:8000',{
    headers : {
      token: token
    }
});

ws.on('message', function(data, flags) {
  console.log('received: %s', data);
});


ws.on('open', function open() {
    for (var i = 0; i < 10; i++) {
        ws.send(i.toString());
    }
});