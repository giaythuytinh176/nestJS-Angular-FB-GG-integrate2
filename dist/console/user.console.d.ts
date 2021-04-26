import { Model } from 'mongoose';
import { ConsoleService } from 'nestjs-console';
import { IUser } from '../modules/user/interfaces/user.interface';
import { CreateUserDTO } from '../modules/user/dto/create-user.dto';
export declare class UserConsole {
    private readonly userModel;
    private readonly consoleService;
    constructor(userModel: Model<IUser>, consoleService: ConsoleService);
    createUser: (email: string, password: string) => Promise<any>;
    signUp(createUserDto: CreateUserDTO): Promise<void>;
}
