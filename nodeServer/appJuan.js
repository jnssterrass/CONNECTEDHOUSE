var querystring = require('querystring');
var http = require('http');

var data = querystring.stringify({
      device: 'relay1',
      action: 'disable',
      value: 'ninguno'
});

var options = {
    host: '192.168.137.5',
    port: 80,
    path: '',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data)
    }
};

var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log("body: " + chunk);
    });
});

req.write(data);
req.end();
