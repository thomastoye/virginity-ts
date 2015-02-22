/*jslint node: true */
'use strict';

var fmt = require('./lib/formatters.js');

var has = function(data, key){
  return data.hasOwnProperty(key);
};

var fold = function(data){
  var parts = data.match(/[\s\S]{1,75}/g) || [];
  return parts.join('\r\n ');
};


function compile(data){
  var elements = [];
  var head = 'BEGIN:VCARD\r\nVERSION:3.0';
  elements.push(head);

  if (has(data, 'name')){
    elements.push(fmt.name(data.name));
    elements.push(fmt.formattedName(data.name));
  }
  if (has(data, 'adr')){
    var address = data.adr.map(function(d){
      return fmt.adr(d);
    });
    elements = elements.concat(address);
  }
  if (has(data, 'bday')){
    elements.push(fmt.bday(data.bday));
  }
  if (has(data, 'categories')){
    elements.push(fmt.categories(data.categories));
  }
  if (has(data, 'email')){
    var email = data.email.map(function(d){
      return fmt.email(d);
    });
    elements = elements.concat(email);
  }
  if (has(data, 'nickname')){
    elements.push(fmt.nickname(data.nickname));
  }
  if (has(data, 'note')){
    elements.push(fmt.note(data.note));
  }
  if (has(data, 'org')){
    elements.push(fmt.org(data.org));
  }
  if (has(data, 'title')){
    elements.push(fmt.title(data.title));
  }
  if (has(data, 'photo')){
    elements.push(fmt.photo(data.photo));
  }
  if (has(data, 'tel')){
    var tel = data.tel.map(function(d){
      return fmt.tel(d);
    });
    elements = elements.concat(tel);
  }
  if (has(data, 'url')){
    var url = data.url.map(function(d, i){
      return fmt.url(d, i + 1);
    });
    elements = elements.concat(url);
  }
  if (has(data, 'im')){
    var im = data.im.map(function(d){
      return fmt.im(d);
    });
    elements = elements.concat(im);
  }

  elements.push('END:VCARD');

  var newLine = '\r\n';
  var folded = elements.map(fold);
  var joined = folded.join(newLine);

  return joined;
}

module.exports = compile;
