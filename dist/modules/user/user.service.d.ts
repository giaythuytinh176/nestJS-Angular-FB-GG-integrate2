import { Model } from 'mongoose';
import { IUser } from './interfaces/user.interface';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<IUser>);
    getUserByEmail(email: string): Promise<IUser>;
    getUsers(): Promise<IUser[]>;
}
