const CryptoJS = require("crypto-js");

const SECRET = process.env.AES_SECRET || "default_32_characters_long_secret!!";

module.exports = {
  encrypt(text) {
    try {
      return CryptoJS.AES.encrypt(text, SECRET).toString();
    } catch (err) {
      console.error("AES encrypt error:", err);
      return text;
    }
  },

  decrypt(cipher) {
    try {
      const bytes = CryptoJS.AES.decrypt(cipher, SECRET);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return decrypted || cipher;
    } catch (err) {
      console.error("AES decrypt error:", err);
      return cipher;
    }
  }
};
