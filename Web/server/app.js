/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express'),
      bodyParser = require('body-parser'),
      request = require('request');

var mongoose = require('mongoose');
var config = require('./config/environment');
var multer = require('multer');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
var server = require('http').createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: (config.env === 'production') ? false : true,
  path: '/socket.io-client'
});
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

app.post('/forwardtoarduino', function (req, res) {
	var options = {
        url: '192.168.1.177',
        form: {
		    "device": req.body.device,
		    "action": req.body.action,
		    "value": req.body.value,
		    "response": ""
		}
	};

	request.post(options, function (err, httpResponse, body) {

            if (!err && httpResponse.statusCode == 200) {

                console.log('success');
                res.send('ha ido bien');

            } else {

            	console.log('pinch');
            	res.send('hemos pinchado');
            }
        });
});

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
