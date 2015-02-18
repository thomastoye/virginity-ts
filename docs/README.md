# vCard Formats

[vCard standard v3](http://tools.ietf.org/html/rfc2426)

#### Name - name - N
The order of values: Family Name; Given Name; Additional Names; Honorific Prefixes; Honorific Suffixes.  Multiple items are comma separated.
```
N:Polino;Michael;Robert;Mr.;D.U.D.E.,CPA
```

#### Formatted name - - FN
The non-delimited, string-formatted name
```
FN:Mr. Michael Robert Polino\, D.U.D.E.\, CPA
```

#### Address - adr - ADR
The first two positions for address (PO Box and extended address) are left blank as a convention that improves interoperability.
```
ADR;TYPE=home:;;1800 Computer Ave\, Apt 401;Los Angeles;CA;90028;USA
```

#### Birthday - bday - BDAY
Formatted as `yyyy-mm-dd`.
```
BDAY:1989-05-04
```

#### Categories - categories - CATEGORIES
A comma-separated list of text values.
```
CATEGORIES:INTERNET,MEETUP,BOOK CLUB
```

#### Email - email - EMAIL
TYPE field can include the type and `pref` if it's the preferred address, separated by a comma.
```
EMAIL;TYPE=work,pref:mrpolino@gmail.com
```

#### Nickname - nickname - NICKNAME
Comma-separated list of alternate names
```
NICKNAME:Bill,Billy
```

#### Note - note - NOTE
```
NOTE:We met at a bar\, but I don't remember which one.
```

#### Company - org - ORG
Company name, followed by two optional sub-organizations, separated by a semicolon.
```
ORG:Computers\,Inc;Western Region;
```

#### Title - title - TITLE
```
TITLE: Senior Developer
```

#### Photo - photo - PHOTO
Can be remote uri or base64 encoded image
```
PHOTO;VALUE=uri:http://www.abc.com/pub/photos/jqpublic.gif
```
or
```
 PHOTO;ENCODING=b;TYPE=JPEG:MIICajCCAdO...
```

#### Phone - tel - TEL
Standard values for `TYPE` parameter are `home`, `work`, `cell`.  Optional `pref` parameter can be included, separated by a comma.
```
TEL;TYPE=cell,pref:410-555-5169
```

#### URL - url - URL
The standard states:
>Non-standard, private types with a name starting with "X-" may be defined bilaterally between two cooperating agents without outside registration or standardization.

It seems like a number of services use this paradigm for urls.  
```
item1.URL:www.mplno.com
item1.X-ABLabel:_$!<HomePage>!$_
item2.URL:www.github.com/mplno
item2.X-ABLabel:Github
```
Home pages have this special `_$!<HomePage>!$_` syntax. Everything else (blog, work, etc) can be tagged normally, like `X-ABLabel:Blog`

#### IM - im - x`X-[client]
Google and Apple contacts differ on how they handle wilcard chat clients, so I err on the side of known standards.
Options are: `X-YAHOO`, `X-GTALK`, `X-AIM`, `X-SKYPE`, `X-QQ`, `X-MSN`, `X-ICQ`, `X-JABBER`.
```
X-SKYPE:mrpolino
```
