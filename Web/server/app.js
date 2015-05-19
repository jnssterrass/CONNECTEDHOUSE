/**
 * CONNECTED-HOUSE - 2015 (Barcelona)
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express      = require('express'),
    bodyParser   = require('body-parser'),
    request      = require('request');
var mongoose     = require('mongoose');
var config       = require('./config/environment');
var multer       = require('multer');
var passport     = require('passport');
var flash        = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
var server = require('http').createServer(app);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/express')(app);
require('./config/passport')(passport);
require('./routes')(app,passport, mongoose);

//mongoose.connect(config.mongo.uri, config.mongo.options);
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

server.listen(config.port, config.ip, function () {
  console.log('Connected-House Web Server');
  console.log('AlbertC & JuanS & DidacC JonathanA');
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

exports = module.exports = app;
