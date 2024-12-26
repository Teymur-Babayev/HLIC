/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  decrypt: () => (/* binding */ decrypt),
  derive: () => (/* binding */ derive),
  derivePadded: () => (/* binding */ derivePadded),
  deriveUnpadded: () => (/* binding */ deriveUnpadded),
  encrypt: () => (/* binding */ encrypt),
  generatePrivate: () => (/* binding */ generatePrivate),
  getPublic: () => (/* binding */ getPublic),
  getPublicCompressed: () => (/* binding */ getPublicCompressed),
  sign: () => (/* binding */ sign),
  verify: () => (/* binding */ verify)
});

;// CONCATENATED MODULE: external "crypto"
const external_crypto_namespaceObject = require("crypto");
var external_crypto_default = /*#__PURE__*/__webpack_require__.n(external_crypto_namespaceObject);
;// CONCATENATED MODULE: external "elliptic"
const external_elliptic_namespaceObject = require("elliptic");
;// CONCATENATED MODULE: ./src/index.ts


const ec = new external_elliptic_namespaceObject.ec("secp256k1");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const browserCrypto = __webpack_require__.g.crypto || __webpack_require__.g.msCrypto || {};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const subtle = browserCrypto.subtle || browserCrypto.webkitSubtle;
const EC_GROUP_ORDER = Buffer.from("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141", "hex");
const ZERO32 = Buffer.alloc(32, 0);
function assert(condition, message) {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}
function isScalar(x) {
  return Buffer.isBuffer(x) && x.length === 32;
}
function isValidPrivateKey(privateKey) {
  if (!isScalar(privateKey)) {
    return false;
  }
  return privateKey.compare(ZERO32) > 0 &&
  // > 0
  privateKey.compare(EC_GROUP_ORDER) < 0; // < G
}

// Compare two buffers in constant time to prevent timing attacks.
function equalConstTime(b1, b2) {
  if (b1.length !== b2.length) {
    return false;
  }
  let res = 0;
  for (let i = 0; i < b1.length; i++) {
    res |= b1[i] ^ b2[i]; // jshint ignore:line
  }

  return res === 0;
}

/* This must check if we're in the browser or
not, since the functions are different and does
not convert using browserify */
function randomBytes(size) {
  const arr = new Uint8Array(size);
  if (typeof browserCrypto.getRandomValues === "undefined") {
    return Buffer.from(external_crypto_default().randomBytes(size));
  }
  browserCrypto.getRandomValues(arr);
  return Buffer.from(arr);
}
async function sha512(msg) {
  if (subtle) {
    const hash = await subtle.digest("SHA-512", msg);
    const result = new Uint8Array(hash);
    return result;
  }
  const hash = external_crypto_default().createHash("sha512");
  const result = hash.update(msg).digest();
  return new Uint8Array(result);
}
function getAes(op) {
  return async function (iv, key, data) {
    if (subtle) {
      const importAlgorithm = {
        name: "AES-CBC"
      };
      const cryptoKey = await subtle.importKey("raw", key, importAlgorithm, false, [op]);
      const encAlgorithm = {
        name: "AES-CBC",
        iv
      };
      const result = await subtle[op](encAlgorithm, cryptoKey, data);
      return Buffer.from(new Uint8Array(result));
    } else if (op === "encrypt") {
      const cipher = external_crypto_default().createCipheriv("aes-256-cbc", key, iv);
      const firstChunk = cipher.update(data);
      const secondChunk = cipher.final();
      return Buffer.concat([firstChunk, secondChunk]);
    } else if (op === "decrypt") {
      const decipher = external_crypto_default().createDecipheriv("aes-256-cbc", key, iv);
      const firstChunk = decipher.update(data);
      const secondChunk = decipher.final();
      return Buffer.concat([firstChunk, secondChunk]);
    }
    throw new Error(`Unsupported operation: ${op}`);
  };
}
const aesCbcEncrypt = getAes("encrypt");
const aesCbcDecrypt = getAes("decrypt");
async function hmacSha256Sign(key, msg) {
  if (subtle) {
    const importAlgorithm = {
      name: "HMAC",
      hash: {
        name: "SHA-256"
      }
    };
    const cryptoKey = await subtle.importKey("raw", new Uint8Array(key), importAlgorithm, false, ["sign", "verify"]);
    const sig = await subtle.sign("HMAC", cryptoKey, msg);
    const result = Buffer.from(new Uint8Array(sig));
    return result;
  }
  const hmac = external_crypto_default().createHmac("sha256", Buffer.from(key));
  hmac.update(msg);
  const result = hmac.digest();
  return result;
}
async function hmacSha256Verify(key, msg, sig) {
  const expectedSig = await hmacSha256Sign(key, msg);
  return equalConstTime(expectedSig, sig);
}

/**
 * Generate a new valid private key. Will use the window.crypto or window.msCrypto as source
 * depending on your browser.
 */
const generatePrivate = function () {
  let privateKey = randomBytes(32);
  while (!isValidPrivateKey(privateKey)) {
    privateKey = randomBytes(32);
  }
  return privateKey;
};
const getPublic = function (privateKey) {
  // This function has sync API so we throw an error immediately.
  assert(privateKey.length === 32, "Bad private key");
  assert(isValidPrivateKey(privateKey), "Bad private key");
  // XXX(Kagami): `elliptic.utils.encode` returns array for every
  // encoding except `hex`.
  return Buffer.from(ec.keyFromPrivate(privateKey).getPublic("array"));
};

/**
 * Get compressed version of public key.
 */
const getPublicCompressed = function (privateKey) {
  // jshint ignore:line
  assert(privateKey.length === 32, "Bad private key");
  assert(isValidPrivateKey(privateKey), "Bad private key");
  // See https://github.com/wanderer/secp256k1-node/issues/46
  const compressed = true;
  return Buffer.from(ec.keyFromPrivate(privateKey).getPublic(compressed, "array"));
};

// NOTE(Kagami): We don't use promise shim in Browser implementation
// because it's supported natively in new browsers (see
// <http://caniuse.com/#feat=promises>) and we can use only new browsers
// because of the WebCryptoAPI (see
// <http://caniuse.com/#feat=cryptography>).
const sign = async function (privateKey, msg) {
  assert(privateKey.length === 32, "Bad private key");
  assert(isValidPrivateKey(privateKey), "Bad private key");
  assert(msg.length > 0, "Message should not be empty");
  assert(msg.length <= 32, "Message is too long");
  return Buffer.from(ec.sign(msg, privateKey, {
    canonical: true
  }).toDER());
};
const verify = async function (publicKey, msg, sig) {
  assert(publicKey.length === 65 || publicKey.length === 33, "Bad public key");
  if (publicKey.length === 65) {
    assert(publicKey[0] === 4, "Bad public key");
  }
  if (publicKey.length === 33) {
    assert(publicKey[0] === 2 || publicKey[0] === 3, "Bad public key");
  }
  assert(msg.length > 0, "Message should not be empty");
  assert(msg.length <= 32, "Message is too long");
  if (ec.verify(msg, sig, publicKey)) {
    return null;
  }
  throw new Error("Bad signature");
};
const derive = async function (privateKeyA, publicKeyB) {
  assert(Buffer.isBuffer(privateKeyA), "Bad private key");
  assert(Buffer.isBuffer(publicKeyB), "Bad public key");
  assert(privateKeyA.length === 32, "Bad private key");
  assert(isValidPrivateKey(privateKeyA), "Bad private key");
  assert(publicKeyB.length === 65 || publicKeyB.length === 33, "Bad public key");
  if (publicKeyB.length === 65) {
    assert(publicKeyB[0] === 4, "Bad public key");
  }
  if (publicKeyB.length === 33) {
    assert(publicKeyB[0] === 2 || publicKeyB[0] === 3, "Bad public key");
  }
  const keyA = ec.keyFromPrivate(privateKeyA);
  const keyB = ec.keyFromPublic(publicKeyB);
  const Px = keyA.derive(keyB.getPublic()); // BN instance
  return Buffer.from(Px.toArray());
};
const deriveUnpadded = derive;
const derivePadded = async function (privateKeyA, publicKeyB) {
  assert(Buffer.isBuffer(privateKeyA), "Bad private key");
  assert(Buffer.isBuffer(publicKeyB), "Bad public key");
  assert(privateKeyA.length === 32, "Bad private key");
  assert(isValidPrivateKey(privateKeyA), "Bad private key");
  assert(publicKeyB.length === 65 || publicKeyB.length === 33, "Bad public key");
  if (publicKeyB.length === 65) {
    assert(publicKeyB[0] === 4, "Bad public key");
  }
  if (publicKeyB.length === 33) {
    assert(publicKeyB[0] === 2 || publicKeyB[0] === 3, "Bad public key");
  }
  const keyA = ec.keyFromPrivate(privateKeyA);
  const keyB = ec.keyFromPublic(publicKeyB);
  const Px = keyA.derive(keyB.getPublic()); // BN instance
  return Buffer.from(Px.toString(16, 64), "hex");
};
const encrypt = async function (publicKeyTo, msg, opts) {
  opts = opts || {};
  let ephemPrivateKey = opts.ephemPrivateKey || randomBytes(32);
  // There is a very unlikely possibility that it is not a valid key
  while (!isValidPrivateKey(ephemPrivateKey)) {
    ephemPrivateKey = opts.ephemPrivateKey || randomBytes(32);
  }
  const ephemPublicKey = getPublic(ephemPrivateKey);
  const Px = await deriveUnpadded(ephemPrivateKey, publicKeyTo);
  const hash = await sha512(Px);
  const iv = opts.iv || randomBytes(16);
  const encryptionKey = hash.slice(0, 32);
  const macKey = hash.slice(32);
  const data = await aesCbcEncrypt(iv, Buffer.from(encryptionKey), msg);
  const ciphertext = data;
  const dataToMac = Buffer.concat([iv, ephemPublicKey, ciphertext]);
  const mac = await hmacSha256Sign(Buffer.from(macKey), dataToMac);
  return {
    iv,
    ephemPublicKey,
    ciphertext,
    mac
  };
};
const decrypt = async function (privateKey, opts, _padding) {
  const padding = _padding !== null && _padding !== void 0 ? _padding : false;
  const deriveLocal = padding ? derivePadded : deriveUnpadded;
  const Px = await deriveLocal(privateKey, opts.ephemPublicKey);
  const hash = await sha512(Px);
  const encryptionKey = hash.slice(0, 32);
  const macKey = hash.slice(32);
  const dataToMac = Buffer.concat([opts.iv, opts.ephemPublicKey, opts.ciphertext]);
  const macGood = await hmacSha256Verify(Buffer.from(macKey), dataToMac, opts.mac);
  if (!macGood && padding === false) {
    return decrypt(privateKey, opts, true);
  } else if (!macGood && padding === true) {
    throw new Error("bad MAC after trying padded");
  }
  const msg = await aesCbcDecrypt(opts.iv, Buffer.from(encryptionKey), opts.ciphertext);
  return Buffer.from(new Uint8Array(msg));
};
module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=eccrypto.cjs.js.map