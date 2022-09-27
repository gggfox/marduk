import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    private users;
    findAll(name?: string): Promise<User[]>;
    findById(userId: number): User;
    findByUsername(username: string): User;
    create(createUserDto: CreateUserDto): Promise<User>;
}
