import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Model } from 'mongoose';
import { IUser } from '../../user/interfaces/user.interface';
declare const GoogleStrategy_base: new (...args: any[]) => Strategy;
export declare class GoogleStrategy extends GoogleStrategy_base {
    private readonly userModel;
    constructor(userModel: Model<IUser>);
    validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any>;
}
export {};
