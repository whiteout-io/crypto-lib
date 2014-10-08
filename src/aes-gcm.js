(function(factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(['forge'], factory);
    } else if (typeof exports === 'object') {
        var forge = typeof window !== 'undefined' && window.forge ? window.forge : require('node-forge');
        module.exports = factory(forge);
    }
})(function(forge) {
    'use strict';

    var AesGcm = function() {};

    /**
     * Encrypt a String using AES-GCM using the provided keysize (e.g. 128, 256)
     * @param plaintext [String] The input string in UTF-16
     * @param key [String] The base64 encoded key
     * @param iv [String] The base64 encoded IV
     * @return [String] The base64 encoded ciphertext
     */
    AesGcm.prototype.encrypt = function(plaintext, key, iv) {
        // validate args
        if (!plaintext || !key || !iv) {
            throw new Error("Missing args for encryption!");
        }

        // decode args to utf8 and encrypt
        var cipher = forge.cipher.createCipher('AES-GCM', forge.util.decode64(key));
        cipher.start({
            iv: forge.util.decode64(iv)
        });
        cipher.update(forge.util.createBuffer(forge.util.encodeUtf8(plaintext)));
        cipher.finish();

        // encode to base64
        return forge.util.encode64(cipher.output.getBytes());
    };

    /**
     * Decrypt a String using AES-GCM using the provided keysize (e.g. 128, 256)
     * @param ciphertext [String] The base64 encoded ciphertext
     * @param key [String] The base64 encoded key
     * @param iv [String] The base64 encoded IV
     * @return [String] The decrypted plaintext in UTF-16
     */
    AesGcm.prototype.decrypt = function(ciphertext, key, iv) {
        // validate args
        if (!ciphertext || !key || !iv) {
            throw new Error("Missing args for decryption!");
        }

        // decode args input to utf8 decrypt
        var cipher = forge.cipher.createCipher('AES-GCM', forge.util.decode64(key));
        cipher.start({
            iv: forge.util.decode64(iv)
        });
        cipher.update(forge.util.createBuffer(forge.util.decode64(ciphertext)));
        cipher.finish();

        // decode to utf16
        return forge.util.decodeUtf8(cipher.output.getBytes());
    };

    return new AesGcm();
});