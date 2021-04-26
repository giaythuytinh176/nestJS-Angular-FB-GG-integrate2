"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyValidatorMiddleware = void 0;
const common_1 = require("@nestjs/common");
const auth_user_joi_1 = require("../../user/joi/auth-user.joi");
let bodyValidatorMiddleware = class bodyValidatorMiddleware {
    use(req, res, next) {
        console.log('Request...');
        const schema = auth_user_joi_1.authUserSchema;
        const result = schema.validate(req.body);
        if (result.error) {
            const errorMessage = result.error.details.shift().message;
            const message = errorMessage.replace(/["]/g, '');
            return next(new common_1.BadRequestException(`Validation failed: ${message}`));
        }
        next();
    }
};
bodyValidatorMiddleware = __decorate([
    common_1.Injectable()
], bodyValidatorMiddleware);
exports.bodyValidatorMiddleware = bodyValidatorMiddleware;
//# sourceMappingURL=body-validator.middleware.js.map