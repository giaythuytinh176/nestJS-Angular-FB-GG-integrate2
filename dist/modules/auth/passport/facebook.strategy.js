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
exports.FacebookStrategy = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const passport_1 = require("@nestjs/passport");
const mongoose_2 = require("mongoose");
const passport_facebook_1 = require("passport-facebook");
const server_constants_1 = require("../../../server.constants");
let FacebookStrategy = class FacebookStrategy extends passport_1.PassportStrategy(passport_facebook_1.Strategy, 'facebook') {
    constructor(userModel) {
        super({
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: 'http://192.168.31.18:4200/recipes',
            scope: 'email',
            profileFields: ['emails', 'name', 'id', 'displayName', 'photos'],
            enableProof: true,
        });
        this.userModel = userModel;
    }
    async validate(accessToken, refreshToken, profile, done) {
        var _a, _b;
        const existingUser = await this.userModel.findOne({
            'facebook.id': profile.id,
        });
        if (existingUser) {
            return done(null, existingUser);
        }
        try {
            const user = new this.userModel({
                method: 'facebook',
                facebook: {
                    email: profile.emails ? profile.emails[0].value : undefined,
                    id: profile.id,
                    displayName: ((_a = profile.name.givenName) !== null && _a !== void 0 ? _a : '') +
                        ' ' +
                        ((_b = profile.name.familyName) !== null && _b !== void 0 ? _b : ''),
                    token: accessToken,
                },
            });
            done(null, await user.save());
        }
        catch (err) {
            done(err, null);
        }
    }
};
FacebookStrategy = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(server_constants_1.USER_MODEL_TOKEN)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FacebookStrategy);
exports.FacebookStrategy = FacebookStrategy;
//# sourceMappingURL=facebook.strategy.js.map