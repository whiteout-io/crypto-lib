crypto-lib
==========

A high level crypto module for node.js and the browser. This Library exposes a basic high level crypto api, which does low level operations such as item-key generation, initialization-vector generation, UTF-8 encoding, AES item encryption, Base64 encoding, RSA item-key encryption and RSA signing of all items in few simple steps.

Peer review and feedback are appreciated!

## Usage:

	var lib = require('crypto-lib');

	// generate RSA keypair
	lib.rsa.generateKeypair(1024);

	// package objects into batchable envelope format
	var envelopes = [{
		id: lib.util.UUID(),
		plaintext: 'Hello, World!',
		key: lib.util.random(128),
		iv: lib.util.random(128)
	}];

	// encrypt and sign using AES and RSA
	var encryptedList = lib.cryptoBatch.encryptListForUser(envelopes);

	// decrypt and verify using AES and RSA
	var decryptedList = lib.cryptoBatch.decryptListForUser(encryptedList);

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
