import { Model } from 'mongoose';
import { IUser } from '../../user/interfaces/user.interface';
export declare class GoogleStrategy1 {
    private readonly userModel;
    constructor(userModel: Model<IUser>);
    private init;
}
