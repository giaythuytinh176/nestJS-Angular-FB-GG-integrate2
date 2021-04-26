import { Model } from 'mongoose';
import { Profile, Strategy } from 'passport-facebook';
import { IUser } from '../../user/interfaces/user.interface';
declare const FacebookStrategy_base: new (...args: any[]) => Strategy;
export declare class FacebookStrategy extends FacebookStrategy_base {
    private readonly userModel;
    constructor(userModel: Model<IUser>);
    validate(accessToken: string, refreshToken: string, profile: Profile, done: (err: any, user: any, info?: any) => void): Promise<any>;
}
export {};
