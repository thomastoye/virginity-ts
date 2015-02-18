/*jslint node: true */
'use strict';

var test = require('tape');
var tapSpec = require('tap-spec');

var fmt = require('../lib/formatters.js');

var contact = require('./contact.js');

test.createStream()
  .pipe(tapSpec())
  .pipe(process.stdout);

test('formatters', function(t){

  var name = fmt.name(contact.name);
  t.equal(name, 'N:Polino;Michael;Robert;Mr.;CPA,D.U.D.E.', name);

  var formattedName = fmt.formattedName(contact.name);
  t.equal(formattedName, 'FN:Mr. Michael Robert Polino\\, CPA\\, D.U.D.E.', formattedName);

  var address = fmt.address(contact.adr[0]);
  t.equal(address, 'ADR;TYPE=home:;;1800 Computer Ave\\, Apt 401;Los Angeles;CA;90028;USA', address);

  var bday = fmt.bday(contact.bday);
  t.equal(bday, 'BDAY:1989-05-22', bday);

  var categories = fmt.categories(contact.categories);
  t.equal(categories, 'CATEGORIES:Coworker,Nice Guy', categories);

  var email = fmt.email(contact.email[0]);
  t.equal(email, 'EMAIL;TYPE=personal,pref:mrpolino@gmail.com', email);

  var nickname = fmt.nickname(contact.nickname);
  t.equal(nickname, 'NICKNAME:Mike,JS Daddy', nickname);

  var note = fmt.note(contact.note);
  t.equal(note, "NOTE:This is the note\\, but it's boring.", note);

  var org = fmt.org(contact.org);
  t.equal(org, 'ORG:Miichu;Western Region;', org);

  var title = fmt.title(contact.title);
  t.equal(title, 'TITLE:Chief Boss', title);

  var photo = fmt.photo(contact.photo);
  t.equal(photo, 'PHOTO;VALUE=uri:https://lh5.googleusercontent.com/-3H8sEnuMe8I/AAAAAAAAAAI/AAAAAAAAArc/lUPHkShnxh0/photo.jpg', photo);

  var tel = fmt.tel(contact.tel[0]);
  t.equal(tel, 'TEL;TYPE=cell,pref:410-555-5169', tel);

  var url = fmt.url(contact.url[0], 1);
  t.equal(url, 'item1.URL:www.mplno.com\n\ritem1.X-ABLabel:_$!<HomePage>!$_', url);

  var im = fmt.im(contact.im[0]);
  t.equal(im, 'X-SKYPE:mrpolino', im);

  t.end();
});

test('formatter behviors', function(t){
  var badIM = fmt.im({type: 'notReal', name: 'mplno'});
  t.notOk(badIM, 'IM formatter returns false for non-extant chat service');

  t.end();
});
