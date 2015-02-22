var fs = require('fs');
var path = require('path');
var compile = require('../');

// some basic contact info for a friend, Billy
var contact = {
	name: {
		first: 'Billy',
		additional: ['Jean', 'Dude'],
		last: 'Example'
	},
	bday: '1989-05-22',
	categories: ['Friend'],
	email: [{
		type: 'personal',
		address: 'billy@example.co',
		preferred: true
	}],
	note: 'This is Billy\'s example',
	tel: [{
		type: 'cell',
    pref: true,
		number: '410-555-5169'
	}],
	im: [{
		type: 'skype',
		name: 'virgin-billy'
	}]
};

// Billy just sent us a photo to use with his contact card
var fileLocation = __dirname + '/logo.png';

// read the file, add it to Billy's contact info and write the .vcs file
fs.readFile(fileLocation, function(err, data){

  if (err) throw err;

  var update = {};

  update.photo = data.toString('base64');
  update.type = 'base64';
  update.ext = path.extname(fileLocation).toUpperCase().replace(/\./g, "");

  contact.photo = update;

  var compiledContact = compile(contact);

  fs.writeFile(__dirname + '/billy.vcf', compiledContact, function(err){
    if (err) throw err;
    process.exit(0);
  });

});
