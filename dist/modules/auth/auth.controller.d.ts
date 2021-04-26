import { AuthService } from './auth.service';
import { tokenDTO } from './dto/token.dto';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import { IToken } from './interfaces/token.interface';
import { Request } from 'express';
export declare class AuthController {
    private readonly authService;
    private logger;
    constructor(authService: AuthService);
    signUp(createUserDto: CreateUserDTO): Promise<tokenDTO>;
    googleAuth(): Promise<{
        redirect_uri: string;
    }>;
    googleSignIn(req: any): Promise<any>;
    requestJsonWebTokenAfterGoogleSignIn(req: any): Promise<IToken>;
    requestFacebookRedirectUrl(): Promise<{
        redirect_uri: string;
    }>;
    facebookSignIn(req: Request): Promise<IToken>;
    requestJsonWebTokenAfterFacebookSignIn(req: any): Promise<IToken>;
    authorized(req: any): Promise<any>;
}
