# vCard Formats

[vCard standard v3](http://tools.ietf.org/html/rfc2426)

#### Name - name - N
The order of values: Family Name; Given Name; Additional Names; Honorific Prefixes; Honorific Suffixes.  Multiple items are comma separated.
```javascript
name: {
  first: 'Michael',
  additional: ['Robert'],
  last: 'Polino',
  prefix: 'Mr.',
  suffix: ['CPA', 'D.U.D.E.']
}
// N:Polino;Michael;Robert;Mr.;D.U.D.E.,CPA
```

#### Formatted name - - FN
The non-delimited, string-formatted name
``` javascript
// same data as name (above)
// FN:Mr. Michael Robert Polino\, D.U.D.E.\, CPA
```

#### Address - adr - ADR
The first two positions for address (PO Box and extended address) are left blank as a convention that improves interoperability.
``` javascript
adr: [{
  type: 'home',
  street: '1800 Computer Ave, Apt 401',
  city: 'Los Angeles',
  state: 'CA',
  zip: '90028',
  country: 'USA'
}]
// ADR;TYPE=home:;;1800 Computer Ave\, Apt 401;Los Angeles;CA;90028;USA
```

#### Birthday - bday - BDAY
Formatted as `yyyy-mm-dd`.
``` javascript
bday: '1989-05-22'
// BDAY:1989-05-22
```

#### Categories - categories - CATEGORIES
A comma-separated list of text values.
```javascript
categories: ['INTERNET','MEETUP','BOOK CLUB']
// CATEGORIES:INTERNET,MEETUP,BOOK CLUB
```

#### Email - email - EMAIL
TYPE field can include the type and `pref` if it's the preferred address, separated by a comma.
```javascript
email: [{
  type: 'personal',
  address: 'mrpolino@gmail.com',
  preferred: true
}]
// EMAIL;TYPE=personal,pref:mrpolino@gmail.com
```

#### Nickname - nickname - NICKNAME
Comma-separated list of alternate names
```javascript
nickname: ['Bill', 'Billy']
// NICKNAME:Bill,Billy
```

#### Note - note - NOTE
```javascript
note: 'This is the note, but it\'s boring.',
// NOTE:This is the note, but it\'s boring.
```

#### Company - org - ORG
Company name, followed by two optional sub-organizations, separated by a semicolon.
```javascript
org: {
  company: 'Computers, Inc',
  suborg1: 'Western Region',
  suborg2: ''
}
// ORG:Computers\,Inc;Western Region;
```

#### Title - title - TITLE
```javascript
title: 'Chief Boss'
// TITLE: Chief Boss
```

#### Photo - photo - PHOTO
Can be remote uri or base64 encoded image
```javascript
photo: {
  type: 'uri',
  ext: '',
  photo: 'http://www.abc.com/pub/photos/jqpublic.gif'
}
// PHOTO;VALUE=uri:http://www.abc.com/pub/photos/jqpublic.gif
```
or
```javascript
photo: {
  type: 'base64',
  ext: 'PNG',
  photo: 'iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAIAAAAiOjnJA ...'
}
// PHOTO;ENCODING=b;TYPE=PNG:iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAIAAAAiOjnJA ...
```

#### Phone - tel - TEL
Standard values for `TYPE` parameter are `home`, `work`, `cell`.  Optional `pref` parameter can be included, separated by a comma.
```javascript
tel: [{
  type: 'cell',
  pref: true,
  number: '410-555-5169'
}]
// TEL;TYPE=cell,pref:410-555-5169
```

#### URL - url - URL
The standard states:
>Non-standard, private types with a name starting with "X-" may be defined bilaterally between two cooperating agents without outside registration or standardization.

It seems like a number of services use this paradigm for urls.  
```javascript
url: [{
  type: 'homepage',
  url: 'www.mplno.com'
}, {
  type: 'github',
  url: 'www.github.com/mplno'
}]
// item1.URL:www.mplno.com
// item1.X-ABLabel:_$!<HomePage>!$_
// item2.URL:www.github.com/mplno
// item2.X-ABLabel:Github
```
Home pages get the special `_$!<HomePage>!$_` syntax. Everything else (blog, work, etc) can be tagged normally, like `X-ABLabel:Blog`

#### IM - im - X-[client]
Google and Apple contacts differ on how they handle wilcard chat clients, so I err on the side of known standards.
Options are: `X-YAHOO`, `X-GTALK`, `X-AIM`, `X-SKYPE`, `X-QQ`, `X-MSN`, `X-ICQ`, `X-JABBER`.
```javascript
im: [{
  type: 'skype',
  name: 'mrpolino'
}]
// X-SKYPE:mrpolino
```
