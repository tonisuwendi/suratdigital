const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const router = express.Router();

const conn = require('../config/database');

module.exports = router;

router.get('/', (req, res) => {
	if(req.session.admin){
		res.render('admin/index', {
	        title: 'Admin Panel',
	        css: 'admin/index'
	    })
	}else{
		res.render('admin/login', {
			title: 'Login Admin',
			css: 'auth',
			error: '',
			email: ''
		})
	}
})

router.post('/login', (req, res) => {
	if(req.session.admin){
		res.redirect('/admin');
	}
	let email = req.body.email;
	let password = req.body.password;

	if(email == "" || password == ""){
		res.render('admin/login', {
			title: 'Login Admin',
			css: 'auth',
			error: 'Semua form harus diisi',
			email: email
		})
	}else{
		conn.query("SELECT * FROM admin WHERE email = '" + email + "'", (err, user) => {
			if(user.length > 0){
				bcrypt.compare(password, user[0].password, (err, isMatch) => {
					if(isMatch){
						req.session.admin = true;
						res.redirect('/admin');
					}else{
						res.render('admin/login', {
							title: 'Login Admin',
							css: 'auth',
							error: 'Password salah!',
							email: email
						})
					}
				})
			}else{
				res.render('admin/login', {
					title: 'Login Admin',
					css: 'auth',
					error: 'Email tidak ditemukan!',
					email: email
				})
			}
		})
	}
})