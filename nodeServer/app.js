// Servidor raspi
//creator: Didac Caminero
//Fecha: 1/5/2015
//Version: 0.2
var querystring = require('querystring');
var http = require('http');
var express = require('express'),
	bodyParser = require('body-parser'),
	request = require('request');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/forwardtoarduino', function (req, res) {

	var querystring = require('querystring');
	var http = require('http');

	var data = querystring.stringify({
	      device: req.body.device,
	      action: req.body.action,
	      value: req.body.value
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

	var req = http.request(options, function(res2) {
	    res2.setEncoding('utf8');
	    res2.on('data', function (chunk) {
		//console.log("body: " + chunk);
		res.send(chunk);
	    });
	});

	req.write(data);
	req.end();
});

app.listen(8080, function () {
	console.log('listening on 8080');
});
