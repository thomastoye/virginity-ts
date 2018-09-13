import { formatters as fmt } from '../src/formatters';
import { contact } from './contact';

import { expect } from 'chai';
import 'mocha';

describe('formatters', () => {
    it('name formatter should correcty format', () => {
        const name = fmt.name(contact.name);

        expect(name).to.equal('N:Polino;Michael;Robert;Mr.;CPA,D.U.D.E.');
    });

    it('formattedName formatter should correcty format', () => {
        const name = fmt.formattedName(contact.name);

        expect(name).to.equal('FN:Mr. Michael Robert Polino\\, CPA\\, D.U.D.E.');
    });

    it('address formatter should correcty format', () => {
        const address = fmt.adr(contact.adr[0]);

        expect(address).to.equal('ADR;TYPE=home:;;1800 Computer Ave\\, Apt 401;Los Angeles;CA;90028;USA');
    });

    it('bday formatter should correcty format', () => {
        const bday = fmt.bday(contact.bday);

        expect(bday).to.equal('BDAY:1989-05-22');
    });

    it('categories formatter should correcty format', () => {
        const categories = fmt.categories(contact.categories);

        expect(categories).to.equal('CATEGORIES:Coworker,Nice Guy');
    });

    it('email formatter should correcty format', () => {
        const email = fmt.email(contact.email[0]);

        expect(email).to.equal('EMAIL;TYPE=personal,pref:mrpolino@gmail.com');
    });

    it('nickname formatter should correcty format', () => {
        const nickname = fmt.nickname(contact.nickname);

        expect(nickname).to.equal('NICKNAME:Mike,JS Daddy');
    });

    it('note formatter should correcty format', () => {
        const note = fmt.note(contact.note);

        expect(note).to.equal('NOTE:This is the note\\, but it\'s boring.');
    });

    it('org formatter should correcty format', () => {
        const org = fmt.org(contact.org);

        expect(org).to.equal('ORG:Miichu;Western Region;');
    });

    it('title formatter should correcty format', () => {
        const title = fmt.title(contact.title);

        expect(title).to.equal('TITLE:Chief Boss');
    });

    it('tel formatter should correcty format', () => {
        const tel = fmt.tel(contact.tel[0]);

        expect(tel).to.equal('TEL;TYPE=cell,pref:410-555-5169');
    });

    it('url formatter should correcty format', () => {
        const url = fmt.url(contact.url[0], 1);

        expect(url).to.equal('item1.URL:www.mplno.com\r\nitem1.X-ABLabel:_$!<HomePage>!$_');
    });

    it('im formatter should correcty format', () => {
        const im = fmt.im(contact.im[0]);

        expect(im).to.equal('X-SKYPE:mrpolino');
    });

    it('photo formatter should correcty format', () => {
        const photo = fmt.photo(contact.photo);

        expect(photo).to.equal('PHOTO;ENCODING=b;TYPE=PNG:iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAIAAAAiOjnJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkU2QjAyQUNBRkY5MTFFNDhEMjU4RTc0NTEyNDA0OEUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkU2QjAyQURBRkY5MTFFNDhEMjU4RTc0NTEyNDA0OEUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCRTZCMDJBQUFGRjkxMUU0OEQyNThFNzQ1MTI0MDQ4RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCRTZCMDJBQkFGRjkxMUU0OEQyNThFNzQ1MTI0MDQ4RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pu5/fTwAABcNSURBVHja7J13jFVV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');
    });
});

describe('formatter behaviour', () => {
    it('IM formatter should return false for non-existant IM service', () => {
        const im = fmt.im({ type: 'not_real', name: 'test' });

        expect(im).to.equal(false);
    });
});

// test('compile vcard', function(t){
//     t.plan(3);
//
//     var compiled = compile(contact);
//     t.ok(typeof(compiled) === 'string', '`compile` makes a string');
//
//     t.ok(compiled.slice(0,13) == 'BEGIN:VCARD\r\n', 'first line of vcard is BEGIN:VCARD');
//
//     t.ok(compiled.substr(compiled.length - 11) == '\r\nEND:VCARD', 'last line of vcard is END:VCARD');
// });
