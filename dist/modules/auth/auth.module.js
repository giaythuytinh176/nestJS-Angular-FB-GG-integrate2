"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const passport_1 = require("@nestjs/passport");
const server_constants_1 = require("../../server.constants");
const user_schema_1 = require("../user/schemas/user.schema");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const body_validator_middleware_1 = require("./middlewares/body-validator.middleware");
const facebook_strategy_1 = require("./passport/facebook.strategy");
const google_strategy_1 = require("./passport/google.strategy");
const jwt_strategy_1 = require("./passport/jwt-strategy");
const google_plus_strategy_1 = require("./passport/google-plus.strategy");
let AuthModule = class AuthModule {
    configure(consumer) {
        consumer
            .apply(body_validator_middleware_1.bodyValidatorMiddleware)
            .forRoutes({ path: 'auth/local/signup', method: common_1.RequestMethod.POST });
    }
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: server_constants_1.USER_MODEL_TOKEN, schema: user_schema_1.UserSchema }]),
            passport_1.PassportModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            facebook_strategy_1.FacebookStrategy,
            google_strategy_1.GoogleStrategy,
            jwt_strategy_1.JwtStrategy,
            google_plus_strategy_1.GoogleStrategy1,
        ],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map