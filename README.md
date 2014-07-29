crypto-lib [![Build Status](https://travis-ci.org/whiteout-io/crypto-lib.png?branch=master)](https://travis-ci.org/whiteout-io/crypto-lib)
==========

A high level crypto module for node.js and the browser. This library exposes a basic high level api, which combines the following low level operations:

* UTF-8 plaintext encoding
* item-key generation
* initialization-vector generation
* AES-GCM item encryption
* Base64 ciphertext encoding

**[Checkout the Demo](http://whiteout-io.github.io/crypto-lib/test/index.html)**


## Getting started - Node.js

### Install and Test

	npm install crypto-lib
	cd node_modules/crypto-lib/
	npm test

### Example Code

	var lib = require('crypto-lib');

	var key = lib.util.random(128);
	var iv = lib.util.random(128);

	var ciphertext = lib.aes.encrypt('Hello, World!', key, iv);
	var decrypted = lib.aes.decrypt(ciphertext, key, iv);


## Getting started - HTML5:

* To get started, check out the mocha browser tests. There is currently no require.js build for the client yet so you'll have to include the individual scripts by hands.
* Has been tested to work on iOS, Chrome, Firefox, Safari and Internet Explorer 10.
* For browsers that don't support window.crypto.getRandomValues(), forge's fortuna algorithm is used to generate pseudo random numbers.
* The crypto operations should be done inside of a Web Worker thread to not block the main UI thread.
* [This video](http://www.youtube.com/watch?v=WljJ5guzcLs&feature=share&list=PLBNz3Grrh0qUDwpT0G_1zt9n_uOuan920) also gives some good pointers on how to secure your HTML5 app using Content Security Policy (CSP), sandboxed iframes and CORS in order to protect against XSS and other attacks.


## License

licensed under the [MIT license](http://opensource.org/licenses/MIT):

> Copyright &copy; 2013 Whiteout Networks GmbH.
>
> Permission is hereby granted, free of charge, to any person
> obtaining a copy of this software and associated documentation files
> (the "Software"), to deal in the Software without restriction,
> including without limitation the rights to use, copy, modify, merge,
> publish, distribute, sublicense, and/or sell copies of the Software,
> and to permit persons to whom the Software is furnished to do so,
> subject to the following conditions:
>
> The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
> NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
> BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
> ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
> CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.

The Library's uses crypto primitives from [Forge](https://github.com/digitalbazaar/forge) by Digital Bazaar, Inc. which is licensed under [BSD and GPL](https://github.com/digitalbazaar/forge/blob/master/LICENSE).
