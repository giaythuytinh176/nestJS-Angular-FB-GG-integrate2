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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const swagger_1 = require("@nestjs/swagger");
const token_dto_1 = require("./dto/token.dto");
const create_user_dto_1 = require("../user/dto/create-user.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.logger = new common_1.Logger('UsersController');
    }
    signUp(createUserDto) {
        return this.authService.signUp(createUserDto);
    }
    async googleAuth() {
        const queryParams = [
            `client_id=${process.env.GOOGLE_CLIENT_ID}`,
            `redirect_uri=${process.env.redirect_uri}`,
            `response_type=code`,
            `scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email`,
        ];
        const redirect_uri = `${process.env.google_auth_uri}?${queryParams.join('&')}`;
        return {
            redirect_uri,
        };
    }
    async googleSignIn(req) {
        return await this.authService.googleSignIn(req.body.code);
    }
    async requestJsonWebTokenAfterGoogleSignIn(req) {
        return await this.authService.verifyTokenGoogle(req.body.access_token);
    }
    async requestFacebookRedirectUrl() {
        const queryParams = [
            `client_id=${process.env.FACEBOOK_APP_ID}`,
            `redirect_uri=${process.env.redirect_uri}`,
            `state={fbstate}`,
        ];
        const redirect_uri = `${process.env.facebook_oauth_uri}?${queryParams.join('&')}`;
        return {
            redirect_uri,
        };
    }
    async facebookSignIn(req) {
        return await this.authService.facebookSignIn(req.body.code);
    }
    async requestJsonWebTokenAfterFacebookSignIn(req) {
        return await this.authService.verifyTokenFacebook(req.body.access_token);
    }
    async authorized(req) {
        return { 'message': req.user };
    }
};
__decorate([
    common_1.Post('local/signup'),
    swagger_1.ApiOperation({ summary: 'Create user' }),
    swagger_1.ApiBody({ type: create_user_dto_1.CreateUserDTO }),
    swagger_1.ApiOkResponse({ type: token_dto_1.tokenDTO }),
    swagger_1.ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
    }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad Request.' }),
    swagger_1.ApiResponse({ status: 401, description: 'Unauthorized.' }),
    swagger_1.ApiResponse({ status: 403, description: 'Forbidden.' }),
    swagger_1.ApiResponse({ status: 422, description: 'Entity Validation Error.' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    common_1.Get('google/uri'),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Redirect Url for Google.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuth", null);
__decorate([
    common_1.Post('google/signin'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleSignIn", null);
__decorate([
    common_1.Post('google/token'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestJsonWebTokenAfterGoogleSignIn", null);
__decorate([
    common_1.Get('facebook/uri'),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Redirect Url for Facebook.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestFacebookRedirectUrl", null);
__decorate([
    common_1.Post('facebook/signin'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "facebookSignIn", null);
__decorate([
    common_1.Post('facebook/token'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestJsonWebTokenAfterFacebookSignIn", null);
__decorate([
    common_1.Get('authorized'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "authorized", null);
AuthController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiTags('users'),
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map