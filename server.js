const express = require('express');
const bodyParser = require('body-parser');
const mongoose= require('mongoose');
const path = require('path');
const ejs = require('ejs');
const session = require('express-session');
const PORT = process.env.PORT || 9000;

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
	session({
		secret: "keyboard cat",
		resave: true,
		saveUninitialized: true
	})
);

const pages = require('./route/pages');
const admin = require('./route/admin');
app.use('/', pages);
app.use('/admin', admin);

app.listen(PORT, (err) => {
	if(err) throw err;
	console.log(`Server is running on PORT ${PORT}`);
})