"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    method: {
        type: String,
        enum: ['local', 'facebook', 'google'],
        required: true,
    },
    local: {
        email: { type: String, lowercase: true, unique: true, sparse: true },
        salt: String,
        hashedPassword: String,
    },
    facebook: {
        id: String,
        email: String,
        displayName: String,
        token: String,
    },
    google: {
        id: String,
        email: String,
        displayName: String,
        token: String,
    },
});
//# sourceMappingURL=user.schema.js.map