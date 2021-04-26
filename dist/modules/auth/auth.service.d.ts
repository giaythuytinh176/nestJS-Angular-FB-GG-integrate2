import { Model } from 'mongoose';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import { IUser } from '../user/interfaces/user.interface';
import { tokenDTO } from './dto/token.dto';
import { IToken } from './interfaces/token.interface';
export declare class AuthService {
    private readonly userModel;
    constructor(userModel: Model<IUser>);
    signUp(createUserDto: CreateUserDTO): Promise<tokenDTO>;
    findUserById(id: string): Promise<IUser>;
    googleSignIn(code: string): Promise<any>;
    createGoogleAccount(body: any, access_token: IToken): Promise<any>;
    verifyTokenGoogle(access_token: IToken): Promise<any>;
    facebookSignIn(code: string): Promise<any>;
    createFacebookAccount(body: any, access_token: IToken): Promise<any>;
    verifyTokenFacebook(access_token: IToken): Promise<any>;
    createToken(user: IUser, method?: string): Promise<IToken>;
}
