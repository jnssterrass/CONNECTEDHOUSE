var express = require('express');
var bodyparser = require('body-parser');
var http = require('http');
var app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

function postURL(url) {
    try {
    	var data2 = {
    		'device_id':'554133ea5a6531af894ff621',
    		'action':'a1',
    		'date':'NOW'
    	};
		var querystring = require('querystring');
		var http = require('http');
		var data = querystring.stringify(data2);

		var options = {
			host: url,
			port: 9000,
			path: '/newtask',
			method: 'POST',
			headers: {
	    		'Content-Type': 'application/x-www-form-urlencoded',
	    		'Content-Length': Buffer.byteLength(data)
			}
		};

		var req = http.request(options, function(resp) {});

		req.write(data);
		req.end();
    } 
    catch(err) {}
}

app.get('/nfctag', function (req, res) {
	var url = 'connectedhouseweb.no-ip.org';
	var a = postURL(url);
});

app.listen(50000, function () {
	console.log('listening on 50000');
});
