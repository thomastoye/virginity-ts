/*jslint node: true */
'use strict';

var path = require('path');

var esc = function(s){
  if (typeof s !== 'string'){
    return '';
  }
  return s.replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
};

var escJoin = function(a, char){
  a.map(function(d){ return esc(d); });
  return a.join(char);
};

var imLookup = {
	yahoo: 'X-YAHOO:',
	google: 'X-GTALK:',
	aim: 'X-AIM:',
	skype: 'X-SKYPE:',
	qq: 'X-QQ:',
	msn: 'X-MSN:',
	icq: 'X-ICQ:',
	jabber: 'X-JABBER:'
};

// TODO: function to turn an array of vcard lines into a string

var formatters = {
  name: function(data){
    var base = 'N:';
    var last = (data.last) ? esc(data.last) : '';
    var first = (data.first) ? esc(data.first) : '';
    var additional = (data.additional) ? escJoin(data.additional, ',') : '';
    var prefix = (data.prefix) ? esc(data.prefix) : '';
    var suffix = (data.suffix) ? escJoin(data.suffix, ',') : '';
    var n = [last, first, additional, prefix, suffix].join(';');
    return base + n;
  },
  formattedName: function(data){
    var base = 'FN:';
    var prefix = (data.prefix) ? esc(data.prefix) : '';
    var first = (data.first) ? esc(data.first) : '';
    var additional = (data.additional) ? escJoin(data.additional, ' ') : '';
    var last = (data.last) ? esc(data.last) : '';
    var suffix = (data.suffix) ? escJoin(data.suffix, '\\, ') : '';
    var n = base + [prefix, first, additional, last].join(' ') + '\\, ' + suffix;
    return n;
  },
  address: function(data){
    var base = 'ADR';
    var type = (data.type) ? data.type : '';
    type = 'TYPE=' + type + ':';
    var country = (data.country) ? data.country : '';
    var address = [base, type, '', esc(data.street), esc(data.city), esc(data.state), esc(data.zip), esc(country)].join(';');
    return address;
  },
  bday: function(data){
    // for now, assume that date is coming in formatted yyyy-mm-dd
    var base = 'BDAY:';
    return base + data;
  },
  categories: function(data){
    var base = 'CATEGORIES:';
    var categories = escJoin(data, ',');
    return base + categories;
  },
  email: function(data){
    var base = 'EMAIL;';
    var type = (data.type) ? 'TYPE=' + esc(data.type) : 'TYPE=';
    if (data.preferred){
      type += ',pref';
    }
    type += ':';
    var address = esc(data.address);
    return base + type + address;
  },
  nickname: function(data){
    var base = 'NICKNAME:';
    var names = escJoin(data, ',');
    return base + names;
  },
  note: function(data){
    var base = 'NOTE:';
    var note = esc(data);
    return base + note;
  },
  org: function(data){
    var base = 'ORG:';
    var company = (data.company) ? esc(data.company) : '';
    var suborg1 = (data.suborg1) ? esc(data.suborg1) : '';
    var suborg2 = (data.suborg2) ? esc(data.suborg2) : '';
    return base + [company, suborg1, suborg2].join(';');
  },
  title: function(data){
    var base = 'TITLE:';
    var out = base + esc(data);
    return out;
  },
  photo: function(data){
    var base = 'PHOTO;';
    var meta;
    if (data.type === 'uri'){
      meta = 'VALUE=uri:';
    } else{
      meta = 'ENCODING=b;TYPE=' + data.ext + ':';
    }
    return base + meta + data.photo;
  },
  tel: function(data){
    var base = 'TEL;';
    var type = (data.type) ? esc(data.type) : '';
    type = 'TYPE=' + type;
    if (data.pref){
      type += ',pref:';
    } else{
      type += ':';
    }
    return base + type + esc(data.number);
  },
  url: function(data, i){
    var item = 'item' + i;
    var url = item + '.URL:' + data.url;
    var label = item + '.X-ABLabel:';
    if (data.type === 'homepage'){
      label += '_$!<HomePage>!$_';
    } else{
      label += esc(data.type);
    }
    return url + '\n\r' + label;
  },
  im: function(data){
    if (imLookup.hasOwnProperty(data.type)){
      return imLookup[data.type] + esc(data.name);
    } else{
      return false;
    }
  }
};

module.exports = formatters;
