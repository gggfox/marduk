import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    getUsers(name?: string): Promise<User[]>;
    getUserById(id: number): User;
    create(body: CreateUserDto): Promise<User>;
}
