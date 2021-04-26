"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const nestjs_console_1 = require("nestjs-console");
const server_constants_1 = require("../../server.constants");
const user_console_1 = require("../../console/user.console");
const user_schema_1 = require("./schemas/user.schema");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
const jwt_strategy_1 = require("../auth/passport/jwt-strategy");
const auth_module_1 = require("../auth/auth.module");
let UserModule = class UserModule {
    configure(consumer) {
        consumer.apply().forRoutes({ path: '/user', method: common_1.RequestMethod.GET });
    }
};
UserModule = __decorate([
    common_1.Module({
        imports: [
            auth_module_1.AuthModule,
            nestjs_console_1.ConsoleModule,
            mongoose_1.MongooseModule.forFeature([{ name: server_constants_1.USER_MODEL_TOKEN, schema: user_schema_1.UserSchema }]),
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, user_console_1.UserConsole, jwt_strategy_1.JwtStrategy],
        exports: [],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map