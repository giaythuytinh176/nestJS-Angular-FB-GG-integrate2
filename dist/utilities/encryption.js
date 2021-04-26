"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHashedPassword = exports.generateSalt = void 0;
const crypto_1 = require("crypto");
const generateSalt = () => {
    return crypto_1.randomBytes(128).toString('base64');
};
exports.generateSalt = generateSalt;
const generateHashedPassword = (salt, password) => {
    return crypto_1.createHmac('sha256', salt).update(password).digest('hex');
};
exports.generateHashedPassword = generateHashedPassword;
//# sourceMappingURL=encryption.js.map