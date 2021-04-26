"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUserSchema = void 0;
const joi_1 = require("joi");
const Joi = require("joi");
exports.authUserSchema = Joi.object({
    email: joi_1.string().email().required(),
    password: joi_1.string().min(6).max(36).required(),
});
//# sourceMappingURL=auth-user.joi.js.map