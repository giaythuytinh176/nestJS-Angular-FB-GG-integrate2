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
exports.GoogleStrategy1 = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const passport_1 = require("passport");
const server_constants_1 = require("../../../server.constants");
const GoogleTokenStrategy = require('passport-google-oauth2').Strategy;
let GoogleStrategy1 = class GoogleStrategy1 {
    constructor(userModel) {
        this.userModel = userModel;
        this.init();
    }
    init() {
        passport_1.use('google1', new GoogleTokenStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }, async (request, accessToken, refreshToken, profile, done) => {
            try {
                const existingUser = await this.userModel.findOne({
                    'google.id': profile.id,
                });
                if (existingUser) {
                    return done(null, existingUser);
                }
                const { id, displayName } = profile;
                const email = profile.emails.shift().value;
                const user = new this.userModel({
                    method: 'google',
                    google: {
                        id,
                        email,
                        displayName,
                    },
                });
                done(null, await user.save());
            }
            catch (err) {
                done(err, null);
            }
        }));
    }
};
GoogleStrategy1 = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(server_constants_1.USER_MODEL_TOKEN)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], GoogleStrategy1);
exports.GoogleStrategy1 = GoogleStrategy1;
//# sourceMappingURL=google-plus.strategy.js.map