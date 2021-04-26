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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const encryption_1 = require("../../utilities/encryption");
const server_constants_1 = require("../../server.constants");
const jsonwebtoken_1 = require("jsonwebtoken");
const request_1 = require("request");
let AuthService = class AuthService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async signUp(createUserDto) {
        const { email: email, password: password } = createUserDto;
        if (await this.userModel.findOne({ 'local.email': email.toLowerCase() })) {
            throw new common_1.UnauthorizedException(server_constants_1.MESSAGES.UNAUTHORIZED_EMAIL_IN_USE);
        }
        try {
            const salt = encryption_1.generateSalt();
            const user = new this.userModel({
                method: 'local',
                local: {
                    email,
                    salt,
                    hashedPassword: encryption_1.generateHashedPassword(salt, password),
                },
            });
            await user.save();
            return await this.createToken(user);
        }
        catch (error) {
            if (error.code === '23505' ||
                error.message === server_constants_1.MESSAGES.UNAUTHORIZED_EMAIL_IN_USE) {
                throw new common_1.ConflictException(server_constants_1.MESSAGES.UNAUTHORIZED_EMAIL_IN_USE);
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async findUserById(id) {
        return await this.userModel.findById(id);
    }
    async googleSignIn(code) {
        return new Promise((resolve, reject) => {
            request_1.post({
                url: `${process.env.google_token_uri}`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                form: {
                    code,
                    client_id: process.env.GOOGLE_CLIENT_ID,
                    client_secret: process.env.GOOGLE_SECRET,
                    redirect_uri: process.env.redirect_uri,
                    grant_type: 'authorization_code',
                },
            }, async (err, res, body) => {
                if (err) {
                    return reject(err);
                }
                if (body.error) {
                    return reject(body.error);
                }
                const { access_token } = JSON.parse(body);
                request_1.post({
                    url: `${process.env.backend_uri}/auth/google/token`,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    form: {
                        access_token,
                    },
                }, async (err, res, body) => {
                    if (err) {
                        return reject(err);
                    }
                    if (body.error) {
                        return reject(body.error);
                    }
                    resolve(body);
                });
            });
        });
    }
    async createGoogleAccount(body, access_token) {
        const existingUser = await this.userModel.findOne({
            'google.id': body.sub,
        });
        if (existingUser) {
            return await this.createToken(existingUser, 'google');
        }
        try {
            const user = new this.userModel({
                method: 'google',
                google: {
                    id: body.sub,
                    email: body.email ? body.email : undefined,
                    displayName: body.name,
                    token: access_token,
                },
            });
            await user.save();
            return await this.createToken(user, 'google');
        }
        catch (err) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async verifyTokenGoogle(access_token) {
        return new Promise((resolve, reject) => {
            request_1.post({
                url: `${process.env.google_userinfo_uri}`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }, async (err, res, body) => {
                if (err) {
                    return reject(err);
                }
                if (body.error) {
                    return reject(body.error);
                }
                if (!access_token) {
                    return reject('Access token not found');
                }
                const bd1 = JSON.parse(body);
                if (!bd1.sub) {
                    return reject('Account not found');
                }
                const token = await this.createGoogleAccount(bd1, access_token);
                resolve({ body, token });
            });
        });
    }
    async facebookSignIn(code) {
        const queryParams = [
            `client_id=${process.env.FACEBOOK_APP_ID}`,
            `redirect_uri=${process.env.redirect_uri}`,
            `client_secret=${process.env.FACEBOOK_APP_SECRET}`,
            `code=${code}`,
        ];
        const uri = `${process.env.facebook_token_uri}?${queryParams.join('&')}`;
        return new Promise((resolve, reject) => {
            request_1.get(uri, (error, response, body) => {
                if (error) {
                    return reject(error);
                }
                if (body.error) {
                    return reject(body.error);
                }
                const { access_token } = JSON.parse(body);
                request_1.post({
                    url: `${process.env.backend_uri}/auth/facebook/token`,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    form: {
                        access_token,
                    },
                }, async (err, res, body) => {
                    if (err) {
                        return reject(err);
                    }
                    if (body.error) {
                        return reject(body.error);
                    }
                    resolve(body);
                });
            });
        });
    }
    async createFacebookAccount(body, access_token) {
        const existingUser = await this.userModel.findOne({
            'facebook.id': body.id,
        });
        if (existingUser) {
            return await this.createToken(existingUser, 'facebook');
        }
        try {
            const user = new this.userModel({
                method: 'facebook',
                facebook: {
                    id: body.id,
                    email: body.email ? body.email : undefined,
                    displayName: body.name,
                    token: access_token,
                },
            });
            await user.save();
            return await this.createToken(user, 'facebook');
        }
        catch (err) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async verifyTokenFacebook(access_token) {
        return new Promise((resolve, reject) => {
            request_1.post({
                url: `https://graph.facebook.com/me?fields=id,email,name&access_token=${access_token}`,
            }, async (err, res, body) => {
                if (err) {
                    return reject(err);
                }
                if (body.error) {
                    return reject(body.error);
                }
                const bd = JSON.parse(body);
                if (!access_token) {
                    return reject('Access token not found');
                }
                if (!bd.id) {
                    return reject('Account not found');
                }
                const token = await this.createFacebookAccount(bd, access_token);
                resolve({ body: bd, token });
            });
        });
    }
    async createToken(user, method = null) {
        const expiresIn = '48h';
        const token = jsonwebtoken_1.sign({
            sub: user.id,
        }, process.env.jwtSecret, { expiresIn });
        return {
            token,
        };
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(server_constants_1.USER_MODEL_TOKEN)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map