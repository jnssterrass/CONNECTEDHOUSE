/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/repo', require('./api/repo'));
  app.use('/api/messages', require('./api/message'));
  app.use('/api/things', require('./api/thing'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

   //routes
   app.route('/login')
     .get(function(req, res) {
       res.sendfile(app.get('appPath') + '/app/login/login.html');
     });

    app.route('/portada')
       .get(function(req, res) {
         res.sendfile(app.get('appPath') + '/index.html');
       });


  /*
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    }); */
};
