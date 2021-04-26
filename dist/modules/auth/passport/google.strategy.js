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
exports.GoogleStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const common_1 = require("@nestjs/common");
const server_constants_1 = require("../../../server.constants");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let GoogleStrategy = class GoogleStrategy extends passport_1.PassportStrategy(passport_google_oauth20_1.Strategy, 'google') {
    constructor(userModel) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: 'http://192.168.31.18:4200/recipes',
            scope: ['email', 'profile'],
            prompt: 'select_account',
            accessType: 'offline',
            includeGrantedScopes: true,
        });
        this.userModel = userModel;
    }
    async validate(accessToken, refreshToken, profile, done) {
        console.log('xxx', profile);
        const existingUser = await this.userModel.findOne({
            'google.id': profile.id,
        });
        if (existingUser) {
            return existingUser;
        }
        try {
            const user = new this.userModel({
                method: 'google',
                google: {
                    id: profile.id,
                    email: profile.emails ? profile.emails[0].value : undefined,
                    displayName: profile.displayName,
                    token: accessToken,
                },
            });
            return await user.save();
        }
        catch (err) {
            throw new common_1.InternalServerErrorException();
        }
    }
};
GoogleStrategy = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel(server_constants_1.USER_MODEL_TOKEN)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], GoogleStrategy);
exports.GoogleStrategy = GoogleStrategy;
//# sourceMappingURL=google.strategy.js.map