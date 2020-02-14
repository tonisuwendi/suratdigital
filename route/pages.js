const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const dateN = require('../config/date_now');
const router = express.Router();

const conn = require('../config/database');

module.exports = router;

router.get('/', (req, res) => {
	if(req.session.login){
		if(req.session.student){
			conn.query("SELECT *, students.name AS name, schools.name AS school FROM students JOIN schools ON students.school=schools.id WHERE students.id = '" + req.session.user + "'", (err, user) => {
				res.render('home/student', {
					title: 'Surat Digital - Student',
					css: 'home-student',
					user: user[0]
				})
			})
		}else if(req.session.parent){
			conn.query("SELECT *, parents.name AS name, schools.name AS school_name FROM parents JOIN schools ON parents.school=schools.id WHERE parents.id = '" + req.session.user + "'", (err, user) => {
				conn.query("SELECT * FROM students WHERE nis = '" + user[0].nis + "' AND school = '" + user[0].school + "'", (err, student) => {
					conn.query("SELECT * FROM letters WHERE user = '" + student[0].id + "' AND verify = '0' ORDER BY id DESC", (err, letter) => {
						res.render('home/parent', {
							title: 'Surat Digital - Parent',
							css: 'home-parent',
							user: user[0],
							letter: letter,
							confirm: ''
						})
					})
				})
			})
		}else if(req.session.teacher){
			conn.query("SELECT *, schools.name AS school_name, teachers.name AS name FROM teachers JOIN schools ON teachers.school=schools.id WHERE teachers.id = '" + req.session.user + "'", (err, user) => {
				conn.query("SELECT * FROM schools WHERE id = '" + user[0].school + "'", (err, sch) => {
					res.render('home/teacher', {
						title: 'Surat Digital - Teacher',
						css: 'home-teacher',
						user: user[0],
						class: sch[0].class
					})
				})
			})
		}else{
			res.render('welcome', {
				title: 'Surat Digital',
				css: 'welcome'
			})
		}
	}else{
		req.session.destroy();
		res.render('welcome', {
			title: 'Surat Digital',
			css: 'welcome'
		})
	}
})

router.get('/history', (req, res) => {
	if(req.session.login){
		if(req.session.student){
			const user = req.session.user;
			conn.query("SELECT * FROM letters WHERE user = '" + user + "' ORDER BY id DESC", (err, letter) => {
				res.render('history/student', {
					title: 'Riwayat Surat',
					css: 'history-student',
					letter: letter
				})
			})
		}else if(req.session.parent){
			conn.query("SELECT * FROM parents WHERE id = '" + req.session.user + "'", (err, parent) => {
				conn.query("SELECT * FROM students WHERE nis = '" + parent[0].nis + "' AND school = '" + parent[0].school + "'", (err, student) => {
					conn.query("SELECT * FROM letters WHERE user = '" + student[0].id + "' AND verify = '1' ORDER BY id DESC", (err, letter) => {
						res.render('history/parent', {
							title: 'Riwayat Surat',
							css: 'history-parent',
							letter: letter
						})
					})
				})
			})
		}else if(req.session.teacher){
			res.send("Coming Soon");
		}
	}else{
		res.redirect('/');
	}
})

const storage = multer.diskStorage({
	destination: path.join(__dirname + '/../public/img/letters/'),
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
})

const upload = multer({
	storage: storage
}).single('img');

router.get('/sick', (req, res) => {
	if(!req.session.login){
		res.redirect('/');
	}
	if(req.session.student){
		res.render('create/sick', {
			title: 'Buat Surat Sakit',
			css: 'create',
			titleShow: '',
			description: '',
			error: '',
			checkError: '',
			send: ''
		})
	}else{
		res.redirect('/');
	}
})

router.get('/permission', (req, res) => {
	if(!req.session.login){
		res.redirect('/');
	}
	if(req.session.student){
		res.render('create/permission', {
			title: 'Buat Surat Izin',
			css: 'create',
			titleShow: '',
			description: '',
			error: '',
			checkError: '',
			send: ''
		})
	}else{
		res.redirect('/');
	}
})

router.get('/dispen', (req, res) => {
	if(!req.session.login){
		res.redirect('/');
	}
	if(req.session.teacher){
		res.render('create/dispen', {
			title: 'Buat Surat Dispen',
			css: 'create',
			titleShow: '',
			description: '',
			error: '',
			checkError: '',
			send: ''
		})
	}else{
		res.redirect('/');
	}
})

router.get('/confirm/:id', (req, res) => {
	if(!req.session.parent){
		res.redirect('/');
	}
	const id = req.params.id;
	conn.query("SELECT * FROM parents WHERE id = '" + req.session.user + "'", (err, parent) => {
		conn.query("SELECT * FROM students WHERE nis = '" + parent[0].nis + "' AND school = '" + parent[0].school + "'", (err, student) => {
			conn.query("SELECT * FROM letters WHERE id = '" + id + "'", (err, check) => {
				if(check[0].user != student[0].id){
					res.redirect('/');
				}else{
					conn.query("UPDATE letters SET verify = '1' WHERE id = '" + id + "'", (err, resp) => {
						if(resp){
							res.render('home/alert', {
								title: 'Berhasil Konfirmasi',
								css: 'home-parent'
							})
						}
					})
				}
			})
		})
	})
})

router.get('/profile', (req, res) => {
	if(req.session.login){
		if(req.session.student){
			conn.query("SELECT *, students.name AS name, majors.short AS majors, majors.name AS major_name, schools.name AS school FROM students JOIN class ON students.class=class.id JOIN majors ON students.majors=majors.id JOIN schools ON students.school=schools.id WHERE students.id = '" + req.session.user + "'", (err, user) => {
				conn.query("SELECT * FROM letters WHERE user = '" + req.session.user + "' AND type = '1' ", (err, sick) => {
					conn.query("SELECT * FROM letters WHERE user = '" + req.session.user + "' AND type = '2' ", (err, permission) => {
						res.render('profile/student', {
							title: 'Profil',
							css: 'profile',
							user: user[0],
							sick: sick,
							permission: permission
						})
					})
				})
			})
		}else if(req.session.parent){
			conn.query("SELECT *, parents.name AS name, schools.name AS school FROM parents JOIN schools ON parents.school=schools.id WHERE parents.id = '" + req.session.user + "'", (err, user) => {
				conn.query("SELECT *, majors.name AS majors, students.name AS name FROM students JOIN majors ON students.majors=majors.id WHERE nis = '" + user[0].nis + "'", (err, student) => {
					conn.query("SELECT * FROM letters WHERE user = '" + student[0].id + "' AND type = '1' ", (err, sick) => {
						conn.query("SELECT * FROM letters WHERE user = '" + student[0].id + "' AND type = '2' ", (err, permission) => {
							res.render('profile/parent', {
								title: 'Profil',
								css: 'profile',
								student: student[0],
								user: user[0],
								sick: sick,
								permission: permission
							})
						})
					})
				})
			})
		}else if(req.session.teacher){
			conn.query("SELECT *, teachers.name AS name, schools.name AS school FROM teachers JOIN schools ON teachers.school=schools.id WHERE teachers.id = '" + req.session.user + "'", (err, user) => {
				res.render('profile/teacher', {
					title: 'Profil',
					css: 'profile',
					user: user[0]
				})
			})
		}
	}else{
		res.redirect('/');
	}
})

router.get('/login', (req, res) => {
	let sess = req.session;
	if(sess.student){
		res.render('auth/student', {
			title: 'Login Siswa',
			css: 'auth',
			nis: '',
			error: ''
		})
	}else if(sess.parent){
		res.render('auth/parent', {
			title: 'Login Orang Tua',
			css: 'auth',
			nis: '',
			error: ''
		})
	}else if(sess.teacher){
		res.render('auth/teacher', {
			title: 'Login Guru',
			css: 'auth',
			username: '',
			error: ''
		})
	}else{
		res.redirect('/');
	}
})

router.get('/logout', (req, res) => {
	req.session.destroy();
	res.redirect('/');
})

router.get('/:role', (req,res, next) => {
	const role = req.params.role;
	if(role == "student"){
		req.session.student = true;
		res.redirect('/login');
	}else if(role == "parent"){
		req.session.parent = true;
		res.redirect('/login');
	}else if(role == "teacher"){
		req.session.teacher = true;
		res.redirect('/login');
	}else{
		next();
	}
})

router.get('/class/:class', (req, res, next) => {
	if(!req.session.login){
		res.redirect('/');
	}else if(!req.session.teacher){
		res.redirect('/');
	}
	const clss = req.params.class;
	let kelas = clss;
	(kelas == "xii") ? kelas = "Kelas XII" : null;
	(kelas == "xi") ? kelas = "Kelas XI" : null;
	(kelas == "x") ? kelas = "Kelas X" : null;
	if(clss == "xii" || clss == "xi" || clss == "x"){
		conn.query("SELECT * FROM teachers WHERE id = '" + req.session.user + "'", (err, user) => {
			conn.query("SELECT * FROM majors", (err, major) => {
				res.render('class/major', {
					title: 'Kelas ' + kelas,
					css: 'major',
					major: major,
					kelas: kelas,
					clss: clss
				})
			})
		})
	}else{
		next();
	}
})

router.get('/class/:class/:major/:team', (req, res, next) => {
	if(!req.session.login){
		res.redirect('/');
	}else if(!req.session.teacher){
		res.redirect('/');
	}
	const clss = req.params.class;
	const major = req.params.major;
	const team = req.params.team;
	conn.query("SELECT * FROM majors WHERE short = '" + major + "'", (err, majorr) => {
		conn.query("SELECT * FROM class WHERE roman = '" + clss + "'", (err, classs) => {
			conn.query("SELECT * FROM students WHERE class = '" + classs[0].id + "' AND majors = '" + majorr[0].id + "' AND team = '" + team + "' AND school = '1'", (err, student) => {
				if(student.length > 0){
					conn.query("SELECT *, letters.id AS id_letter FROM letters JOIN students ON letters.user=students.id WHERE letters.user = '" + student[0].id + "' AND date = '" + dateN + "'", (err, letter) => {
						res.render('class/class', {
							title: "Kelas " + clss.toUpperCase() + " " + major.toUpperCase() + " " + team,
							css: 'see-class',
							kelas: clss.toUpperCase() + " " + major.toUpperCase() + " " + team,
							clss: clss,
							letter: letter
						})
					})
				}else{
					res.send("<h2>Belum ada siswa di kelas ini.</h2>");
				}
			})
		})
	})
})

router.get('/letter/:id', (req, res) => {
	if(!req.session.login){
		res.redirect('/');
	}else if(!req.session.teacher){
		res.redirect('/');
	}
	const id = req.params.id;

	conn.query("SELECT * FROM letters JOIN students ON letters.user=students.id WHERE letters.id = '" + id + "'", (err, letter) => {
		conn.query("SELECT * FROM class WHERE id = '" + letter[0].class + "'", (err, clss) => {
			conn.query("SELECT * FROM majors WHERE id = '" + letter[0].majors + "'", (err, major) => {
				conn.query("SELECT * FROM parents WHERE nis = '" + letter[0].nis + "' AND school = '" + letter[0].school + "'", (err, parent) => {
					res.render('class/letter', {
						title: 'Surat',
						css: 'letter-teacher',
						letter: letter[0],
						link: '/class/' + clss[0].roman + '/' + major[0].short + '/' + letter[0].team,
						kelas: clss[0].roman.toUpperCase() + ' ' + major[0].short.toUpperCase() + ' ' + letter[0].team,
						parent: parent[0]
					})
				})
			})
		})
	})
})

router.post('/login', (req, res) => {
	const nis = req.body.nis;
	const username = req.body.username;
	const password = req.body.password;
	const school = 1;
	if(req.session.student || req.session.parent){
		if(nis == "" || password == ""){
			if(req.session.student){
				res.render('auth/student', {
					title: 'Login Siswa',
					css: 'auth',
					nis: nis,
					error: 'Semua form harus diisi.'
				})
			}else{
				res.render('auth/parent', {
					title: 'Login Orang Tua',
					css: 'auth',
					nis: nis,
					error: 'Semua form harus diisi!'
				})
			}
		}else{
			if(req.session.student){
				conn.query("SELECT * FROM students WHERE nis = '" + nis + "' AND school = '" + school + "'", (err, user) => {
					if(user.length > 0){
						bcrypt.compare(password, user[0].password, (err, isMatch) => {
							if(isMatch){
								req.session.login = true;
								req.session.user = user[0].id;
								res.redirect('/');
							}else{
								res.render('auth/student', {
									title: 'Login Siswa',
									css: 'auth',
									nis: nis,
									error: 'Password salah!'
								})
							}
						})
					}else{
						res.render('auth/student', {
							title: 'Login Siswa',
							css: 'auth',
							nis: nis,
							error: 'Siswa dengan NISN tersebut tidak ditemukan!'
						})
					}
				})
			}else if(req.session.parent){
				conn.query("SELECT * FROM parents WHERE nis = '" + nis + "' AND school = '" + school + "'", (err, user) => {
					if(user.length > 0){
						bcrypt.compare(password, user[0].password, (err, isMatch) => {
							if(isMatch){
								req.session.login = true;
								req.session.user = user[0].id;
								res.redirect('/');
							}else{
								res.render('auth/parent', {
									title: 'Login Orang Tua',
									css: 'auth',
									nis: nis,
									error: 'Password salah!'
								})
							}
						})
					}else{
						res.render('auth/parent', {
							title: 'Login Orang Tua',
							css: 'auth',
							nis: nis,
							error: 'Siswa dengan NISN tersebut tidak ditemukan!'
						})
					}
				})
			}
		}
	}else if(req.session.teacher){
		if(username == "" || password == ""){
			res.render('auth/teacher', {
				title: 'Login Guru',
				css: 'auth',
				username: username,
				error: 'Semua form harus diisi.'
			})
		}else{
			conn.query("SELECT * FROM teachers WHERE username = '" + username + "'", (err, user) => {
				if(user.length > 0){
					bcrypt.compare(password, user[0].password, (err, isMatch) => {
						if(isMatch){
							req.session.login = true;
							req.session.user = user[0].id;
							res.redirect('/');
						}else{
							res.render('auth/teacher', {
								title: 'Login Guru',
								css: 'auth',
								username: username,
								error: 'Password salah!'
							})
						}
					})
				}else{
					res.render('auth/teacher', {
						title: 'Login Guru',
						css: 'auth',
						username: username,
						error: 'Username tidak ditemukan!'
					})
				}
			})
		}
	}else{
		res.redirect('/');
	}
})

router.post('/sick', upload, (req, res) => {
	if(!req.session.student){
		res.redirect('/');
	};
	const filee = req.file;
	const type = "sick";
	createLetter(req, res, type, filee);
})

router.post('/permission', upload, (req, res) => {
	if(!req.session.student){
		res.redirect('/');
	};
	const filee = req.file;
	const type = "permission";
	createLetter(req, res, type, filee);
})

function createLetter(req, res, type, filee){
	const user = req.session.user;

	let typeVar;

	if(type == "sick"){
		typeVar = "Sakit";
		idType = "1";
	}else{
		typeVar = "Izin";
		idType = "2";
	}

	const title = req.body.titleShow;
	const description = req.body.description;
	let file = filee;
	const check = req.body.check;
	
	if(file == undefined){
		file = "";
	}

	if(title == "" || description == ""){
		res.render(`create/${type}`, {
			title: 'Buat Surat ' + typeVar,
			css: 'create',
			titleShow: title,
			description: description,
			error: 'Semua form harus diisi',
			checkError: '',
			send: ''
		})
	}else{
		if(check == ""){
			res.render(`create/${type}`, {
				title: 'Buat Surat ' + typeVar,
				css: 'create',
				titleShow: title,
				description: description,
				error: '',
				checkError: 'Ceklis terlebih dahulu',
				send: ''
			})
		}else{
			if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file == ""){
				let date = new Date().toString()
			    let hari = date.slice(0,3)
			    let tanggal = date.slice(8,10)
			    let bulan = date.slice(4,7)
			    let tahun = date.slice(11,15)

			    switch(hari){
			        case 'Mon':
			            hari = "Senin"
			            break
			        case 'Tue':
			            hari = "Selasa"
			            break
			        case 'Wed':
			            hari = "Rabu"
			            break
			        case 'Thu':
			            hari = "Kamis"
			            break
			        case 'Fri':
			            hari = "Jumat"
			            break
			        case 'Sat':
			            hari = "Sabtu"
			            break
			        case 'Sun':
			            hari = "Minggu"
			            break
			    }

			    switch (bulan){
			        case 'Jan':
			            bulan = "Januari"
			            break
			        case 'Feb':
			            bulan = "Februari"
			            break
			        case 'Mar':
			            bulan = "Maret"
			            break
			        case 'Apr':
			            bulan = "April"
			            break
			        case 'May':
			            bulan = "Mei"
			            break
			        case 'Jun':
			            bulan = "Juni"
			            break
			        case 'Jul':
			            bulan = "Juli"
			            break
			        case 'Aug':
			            bulan = "Agustus"
			            break
			        case 'Sep':
			            bulan = "September"
			            break
			        case 'Oct':
			            bulan = "Oktober"
			            break
			        case 'Nov':
			            bulan = "November"
			            break
			        case 'Dec':
			            bulan = "Desember"
			            break
			    }

			    const dateNow = hari + ", " + tanggal + " " + bulan + " " + tahun;

			    if(file == ""){
			    	fileFix = "";
			    }else{
			    	fileFix = file.filename;
			    }

			   	const data = [
			   		[req.session.user, idType, title, description, fileFix, dateNow, 0]
			   	];
			   	conn.query("INSERT INTO letters (user, type, title, description, file, date, verify) VALUES ?", [data], (err) => {
			   		if(err) console.log(err);
			   		res.render(`create/${type}`, {
						title: 'Buat Surat ' + typeVar,
						css: 'create',
						titleShow: title,
						description: description,
						error: '',
						checkError: '',
						send: 'ok'
					})
			   	})
			}else{
				res.render(`create/${type}`, {
					title: 'Buat Surat ' + typeVar,
					css: 'create',
					titleShow: title,
					description: description,
					error: 'Format file/gambar yang didukung hanya png, jpg, dan jpeg',
					checkError: '',
					send: ''
				})
			}
		}
	}
}