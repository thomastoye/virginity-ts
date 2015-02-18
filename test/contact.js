var contact = {
	name: {
		first: 'Michael',
		additional: ['Robert'],
		last: 'Polino',
		prefix: 'Mr.',
		suffix: ['CPA', 'D.U.D.E.']
	},
	adr: [{
		type: 'home',
		street: '1800 Computer Ave, Apt 401',
		city: 'Los Angeles',
		state: 'CA',
		zip: '90028',
		country: 'USA'
	}],
	bday: '1989-05-22',
	categories: ['Coworker', 'Nice Guy'],
	email: [{
		type: 'personal',
		address: 'mrpolino@gmail.com',
		preferred: true
	}, {
		type: 'work',
		address: 'mike@miichu.com',
		preferred: false
	}],
	nickname: ['Mike', 'JS Daddy'],
	note: 'This is the note, but it\'s boring.',
	org: {
		company: 'Miichu',
		suborg1: 'Western Region',
		suborg2: ''
	},
	title: 'Chief Boss',
	photo: {
		type: 'uri',
    ext: '',
		photo: 'https://lh5.googleusercontent.com/-3H8sEnuMe8I/AAAAAAAAAAI/AAAAAAAAArc/lUPHkShnxh0/photo.jpg'
	},
	tel: [{
		type: 'cell',
    pref: true,
		number: '410-555-5169'
	}],
	url: [{
		type: 'homepage',
		url: 'www.mplno.com'
	}, {
		type: 'github',
		url: 'www.github.com/mplno'
	}],
	im: [{
		type: 'skype',
		name: 'mrpolino'
	}, {
		type: 'google',
		name: 'mrpolino'
	}]
};

module.exports = contact;
