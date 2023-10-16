const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const path = require('path');
const nodemailer = require('nodemailer');
const url = require('url');
var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'projectvera.requests@gmail.com',
		pass: 'vegn fnds hcco pxcq'
	}
});

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));


var PORT = process.env.PORT || 3000;
app.use(express.static(__dirname + '/static'));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname,'/static/web/index.html'));
});

app.get('/body', (req, res) => {
	var url_parts = url.parse(req.url, true);
	var dType = url_parts.query.deviceType;
	if (dType == 'true') {
		res.sendFile(path.join(__dirname,'/static/web/bodyMobile.html'));
	} else {
		res.sendFile(path.join(__dirname,'/static/web/body.html'));
	}
});

app.put('/uzenet', (req, res) => {
	var mailOptions = {
		from: req.body.tg,
		to: 'systeel@gmail.com',
		subject: '[HONLAP]:' + req.body.oj,
		text: 'Email from ' + req.body.tg + ':\n' + req.body.mg
	};
	
	transporter.sendMail(mailOptions, function(err, info) {
		if (err) {
			console.log(err)
			res.json(err);
		} else {
			console.log('mail sent from ' + req.body.tg);
			res.json({ok: 1});
		}
	});
});

app.listen(PORT,()=>{
	console.log("app listening on port " + PORT);
});

