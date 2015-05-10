/**
 * Main application routes
 */
'use strict';

var errors = require('./components/errors');
var config = require('./config/environment');

module.exports = function(app, passport, mongoose) {

//===== API REST ====== //

var Devices   = require('./models/devices.js');
var Users     = require('./models/users.js');
var Tasks     = require('./models/tasks.js');

//===== Devices ====== //
app.get('/findAlldevices', function(req, res) {
  	Devices.find(function(err, devices) {
  		if(!err) {
        console.log('GET /devices')
  			res.send(devices);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
});

app.get('/finddevice:id', function(req, res) {
  	devices.findById(req.param.id, function(err, Devices) {
  		if(!err) {
        console.log('GET /devices')
  			res.send(Devices);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
});

app.post('/newdevice', function(req, res){
    console.log('POST');
    console.log(req.body);

    var devices = new Devices({
      name     : req.body.name,
      device_id: req.body.device_id,
      address  : req.body.address,
      status   : req.body.status

    });

    devices.save(function(err) {
      if(!err){
        console.log('New device on da house');
      }
      else {
        console.log('ERROR:' + err);
      }
    });
    res.send(devices);
});


app.put('/changestatus:id', function(req, res){
    console.log('PUT');
    console.log(req.body);

    Devices.findById(req.params.id, function(err, devices) {
      devices.name     = req.body.name;
      devices.device_id= req.body.device_id;
      devices.address  = req.body.address;
      devices.status   = req.body.status;

      devices.save(function(err) {
        if(!err){
          console.log('Status changed');
        }
        else {
          console.log('ERROR:' + err);
        }
        res.send(devices);
      });
   });
});


app.delete('/deletetask:id', function(req,res){
  console.log('DELETE');
  console.log(req.body);

  Devices.findById(req.params.id, function(err, devices) {
    		devices.remove(function(err) {
    			if(!err) {
    				console.log('Removed task from system');
    			} else {
    				console.log('ERROR: ' + err);
    			}
    		});
    });
});

//===== Users ====== //
app.get('/findAllUsers', function(req, res) {
  	users.find(function(err, users) {
  		if(!err) {
        console.log('GET /users')
  			res.send(users);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
});


//=====  Task ====== //
app.get('/tasks', function(req, res) {
  Tasks.find(function(err, tasks) {
  		if(!err) {
        console.log('GET /tasks')
  			res.send(tasks);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
});


app.post('/newtask', function(req, res){
    console.log('POST');
    console.log(req.body);

    var tasks = new Tasks({
      device_id: req.body.device_id,
      action   : req.body.action

    });

    tasks.save(function(err) {
      if(!err){
        console.log('New action on the queue');
      }
      else {
        console.log('ERROR:' + err);
      }
    });
    res.send(tasks);
});

//===== END API REST ====== //

console.log(app.get('appPath'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

// PASSPORT ===============================================================

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
