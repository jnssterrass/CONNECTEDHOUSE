// Servidor raspi
//creator: Didac Caminero
//Fecha: 1/5/2015
//Version: 0.2

var multer = require('multer');


var express = require('express'),
	bodyParser = require('body-parser'),
	request = require('request');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(multer()); // for parsing multipart/form-data


app.post('/forwardtoarduino', function (req, res) {

	//Imprime por pantalla los campos que le llegan
	//console.log(req.body.device);
	//console.log(req.body.action);
	//console.log(req.body.value);
	

	//Genera el request en formato x-www-form-encoded
	var options = {
        url: '192.168.1.177',
        form: {
		    "device": req.body.device,
		    "action": req.body.action,
		    "value": req.body.value,
		    "response": ""
		}
	};

	//Genera el request en formato form-data
	/*var formData = {

		device: req.body.device,
		action: req.body.action,
		value: req.body.value,
		response: ''

	};*/

	//Imprime por pantalla el formulario generado
	//console.log(formData);

	//Forma para el formData
	//request.post({url: '192.168.1.177', formData: formData}, function (err, httpResponse, body) {
	
	//Forma para el x-www-form-encoded
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

app.listen(8080, function () {
	console.log('listening on 8080');
});
