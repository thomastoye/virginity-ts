# virginity-ts

A module for creating vendor-agnostic vcard contact files.

### About
With this module, I assert that users would favor the ability to move contact cards across platforms versus support for every possible vcard option. I only add options that are platform agnostic and relevant (sorry, no support for pagers).

### Useage
The module exposes the function `compile`, which takes an object filled with contact data and returns a formatted vcard string.  Write this string to a .vcf file and you've got yourself a card that can be imported into your favorite contact application.

```typescript
var contact = {
	name: {
		first: 'Michael',
		additional: ['Robert'],
		last: 'Polino'
	},
	categories: ['Friend'],
	email: [{
		type: 'personal',
		address: 'mrpolino@gmail.com',
		preferred: true
	}]
};

const compile = require('virginity-ts').compile; // JavaScript
import { compile } from 'virginity-ts'; // TypeScript

console.log(compile(contact));
```
See the examples folder for another example.  Details on how to format the data object are included in `docs/`.
