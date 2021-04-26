"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserConsole = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const nestjs_console_1 = require("nestjs-console");
const encryption_1 = require("../utilities/encryption");
const server_constants_1 = require("../server.constants");
const auth_user_joi_1 = require("../modules/user/joi/auth-user.joi");
let UserConsole = class UserConsole {
    constructor(userModel, consoleService) {
        this.userModel = userModel;
        this.consoleService = consoleService;
        this.createUser = async (email, password) => {
            const createUserDto = { email, password };
            const schema = auth_user_joi_1.authUserSchema;
            const result = schema.validate(createUserDto);
            if (result.error) {
                const errorMessage = result.error.details.shift().message;
                const message = errorMessage.replace(/["]/g, '');
                console.log(`Validation failed: ${message}`);
                return;
            }
            return await this.signUp(createUserDto);
        };
        const cli = this.consoleService.getCli();
        this.consoleService.createCommand({
            command: 'createUser <email> <password>',
            description: 'To create user using console-nestJS',
            options: [
                {
                    flags: '--email, -e <o1Value>',
                    required: true,
                },
                {
                    flags: '--password, -p <o1Value>',
                    required: true,
                },
            ],
        }, this.createUser, cli);
    }
    async signUp(createUserDto) {
        const email = createUserDto.email.toLowerCase();
        if (await this.userModel.findOne({ 'local.email': email })) {
            console.log(server_constants_1.MESSAGES.UNAUTHORIZED_EMAIL_IN_USE);
            return;
        }
        try {
            const salt = encryption_1.generateSalt();
            const user = new this.userModel({
                method: 'local',
                local: {
                    email,
                    salt,
                    hashedPassword: encryption_1.generateHashedPassword(salt, createUserDto.password),
                },
            });
            await user.save();
            console.log('User created successfully', user.local.email);
        }
        catch (e) {
            console.log(new common_1.InternalServerErrorException());
        }
    }
};
UserConsole = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(server_constants_1.USER_MODEL_TOKEN)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        nestjs_console_1.ConsoleService])
], UserConsole);
exports.UserConsole = UserConsole;
//# sourceMappingURL=user.console.js.map