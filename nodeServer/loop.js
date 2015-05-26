var express = require('express');
var bodyparser = require('body-parser');
var http = require('http');
var app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
var res;
var arduinoResponse;

function postURL(url, data) {
    try {
		var querystring = require('querystring');
		var http = require('http');
		var data = querystring.stringify(data);

		var options = {
			host: url,
			port: 80,
			path: '',
			method: 'POST',
			headers: {
	    		'Content-Type': 'application/x-www-form-urlencoded',
	    		'Content-Length': Buffer.byteLength(data)
			}
		};

		var req = http.request(options, function(resp) {
			if (resp.statusCode == 200) {
				resp.setEncoding('utf8');
				resp.on('data', function (chunk) {
					//if (chunk != null) res = JSON.parse(chunk);
					console.log(chunk);
				});
				//console.log("GUUUUUT!");
			} else {
				console.log("BaaaT - Man!");
			}
		});

		req.write(data);
		req.end();
		return res;	
    } 
    catch(err) {}
}

function getURL(url) {
	//try {
		var request = require('request');

		// Set the headers
		var headers = {
			'User-Agent':       'Super Agent/0.0.1',
			'Content-Type':     'application/x-www-form-urlencoded'
		}

		// Configure the request
		var options = {
			url: url,
			method: 'GET',
			headers: headers,
			qs: {'key1': 'xxx', 'key2': 'yyy'}
		}

		// Start the request
		request(options, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				if (body != null) res = JSON.parse(body);
				console.log("Gut! :)");
			} else {
				console.log("error :(");
			}
		})
		return res;
    //} 
    //catch(err) {}
}

function deleteURL(url) {
    try {
		var request = require('request');

		// Set the headers
		var headers = {
			'User-Agent':       'Super Agent/0.0.1',
			'Content-Type':     'application/x-www-form-urlencoded'
		}

		// Configure the request
		var options = {
			url: url,
			method: 'DELETE',
			headers: headers,
			qs: {'key1': 'xxx', 'key2': 'yyy'}
		}

		// Start the request
		request(options, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				if (body != null ) res = JSON.parse(body);
				console.log("Gut! :)");
			} else {
				console.log("error :(");
			}
		})
		return res;
    } 
    catch(err) {}
}


//Main function 
function loop(callback) {
	// get connectedhouse.no-ip.org:9000/tasks
	
	var tasks = getURL('http://connectedhouseweb.no-ip.org:9000/tasks');

	for (var i in tasks) {
		var t = tasks[i];
		var id = t.device_id;
		var action = t.action; 
		var date = t.date;
		var currentdate = new Date();
		var currentdateString = currentdate.getHours()+':'+currentdate.getMinutes();
		console.log(currentdateString);
		if (date == 'NOW' || currentdateString == date) {
			switch (id) {
				case '554133ea5a6531af894ff621':
					var taskid = t._id;
					var data = {
						'device': id,
						'action': action,
						'value': 'hola',
						'aklsjdlk':'asd'
					};
					var a = postURL('192.168.137.5',data);
					deleteURL('http://connectedhouseweb.no-ip.org:9000/deletetask'+taskid);
					break;
				case '554f622face87f411b1c018e':
					var taskid = t._id;
					var data = {
						'device': id,
						'action': action,
						'value': 'hola',
						'aklsjdlk':'asd'
					};
					var a = postURL('192.168.137.6',data);
					deleteURL('http://connectedhouseweb.no-ip.org:9000/deletetask'+taskid);
					break;
				default:
					console.log("DEFAULT");
		
			} 
		}
	}
	
	console.log(a);
	if (a != undefined) console.log(a.response);
	
	console.log('-----------iteration---------------');
	callback();
}



// wait function
function wait(){
	setTimeout(function(){
       	loop(wait);
    }, 2000);
}

loop(wait);
