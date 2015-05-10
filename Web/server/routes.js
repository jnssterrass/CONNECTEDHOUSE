/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var config = require('./config/environment');


module.exports = function(app, passport) {
 // Insert routes below
 app.use('/api/devices', require('./api/devices'));
  app.use('/api/repo', require('./api/repo'));
  app.use('/api/messages', require('./api/message'));
  app.use('/api/things', require('./api/thing'));

console.log(app.get('appPath'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  //Parche para poder acceder a portada creo que falla algon con
  //la BD. todo este app.route tiene que ir fuera
  app.route('/portada')
    .get(function(req, res) {
      res.sendFile(config.root + '/client/app/portada/portada.html');
    });
    console.log(config.root);


// normal routes ===============================================================

    //Login screen

    app.get('/', function(req, res) {

      res.sendfile(config.root+'/client/app/login/login.html');
    });


    // Portada screen

    app.get('/portada', isLoggedIn, function(req, res) {
       res.sendfile(config.root+ '/client/app/portada/portada.html', {
           user : req.user
       });
    });

  // LOGOUT ==============================
  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

  // locally --------------------------------
      // LOGIN ===============================
      // show the login form
      app.get('/login', function(req, res) {
          res.sendFile(config.root+ '/client/app/login/login.html', { message: req.flash('loginMessage') });
      });

      // process the login form
      app.post('/login', passport.authenticate('local-login', {
          successRedirect : '/portada', // redirect to the secure profile section
          failureRedirect : '/login', // redirect back to the signup page if there is an error
          failureFlash : true // allow flash messages
      }));

      // SIGNUP =================================
      // show the signup form
      app.get('/signup', function(req, res) {
         res.sendFile(config.root + '/client/app/login/signup.html', { message: req.flash('signupMessage') });
     });


       //process the signup form
      app.post('/signup', passport.authenticate('local-signup', {
          successRedirect : '/portada', // redirect to the secure profile section
          failureRedirect : '/login', // redirect back to the signup page if there is an error
          failureFlash : true // allow flash messages
      }));



// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

  // locally --------------------------------
      app.get('/connect/local', function(req, res) {
          res.sendFile(config.root+ '/client/app/login/connect-local.html', { message: req.flash('loginMessage') });
      });
      app.post('/connect/local', passport.authenticate('local-signup', {
          successRedirect : '/portada', // redirect to the secure profile section
          failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
          failureFlash : true // allow flash messages
      }));


// local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function(req, res) {
      var user            = req.user;
      user.local.email    = undefined;
      user.local.password = undefined;
      user.save(function(err) {
          res.redirect('/portada');
      });
  });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();

  res.redirect('/');
}
