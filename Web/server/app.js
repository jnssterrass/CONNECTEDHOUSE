/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express  = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var config   = require('./config/environment');

// Connect to database
//mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connect(configDB.url); // connect to our database

// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
    app.use(morgan('dev'));
    app.use(cookieParser());
    app.use(bodyParser());
    app.set('view engine', 'ejs');
    app.use(session({ secret: 'albertjuandidacjonathan' }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

var server = require('http').createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: (config.env === 'production') ? false : true,
  path: '/socket.io-client'
});
require('./config/socketio')(socketio);
require('./config/express')(app);

require('./routes')(app, passport);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
