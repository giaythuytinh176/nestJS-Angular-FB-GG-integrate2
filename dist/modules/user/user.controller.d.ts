import { IUser } from './interfaces/user.interface';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    private logger;
    constructor(userService: UserService);
    getUsers(): Promise<IUser[]>;
}
