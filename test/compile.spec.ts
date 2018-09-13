import { contact } from './contact';
import { compile } from '../src';

import { expect } from 'chai';
import 'mocha';

describe('compiled VCard', () => {
   it('compiled VCard should be a string', () => {
       expect(compile(contact)).to.be.a('string');
   });

   it('should begin with VCard header', () => {
       expect(compile(contact).slice(0,13)).to.eq('BEGIN:VCARD\r\n');
   });

   it('should end with VCard trailer', () => {
       expect(compile(contact).slice(-11)).to.eq('\r\nEND:VCARD');
   });

    //     var compiled = compile(contact);
//
//     t.ok(compiled.slice(0,13) == 'BEGIN:VCARD\r\n', 'first line of vcard is BEGIN:VCARD');
//
//     t.ok(compiled.substr(compiled.length - 11) == '\r\nEND:VCARD', 'last line of vcard is END:VCARD');
});