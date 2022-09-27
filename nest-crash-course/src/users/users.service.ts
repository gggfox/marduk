import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  private users: User[] = [
    { id: 0, name: 'Mario', username: 'M', password: '123' },
    { id: 1, name: 'Luigi', username: 'L', password: '123' },
    { id: 2, name: 'Peach', username: 'P', password: '123' },
  ];

  async findAll(name?: string): Promise<User[]> {
    if (name) {
      return this.users.filter((user) => user.name === name);
    }
    return await this.userRepository.find();
  }

  findById(userId: number): User {
    return this.users.find((user) => user.id === userId);
  }

  findByUsername(username: string): User {
    return this.users.find((user) => user.username === username);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log(this.userRepository, typeof this.userRepository);
    const newUser: User = { id: this.users.length, ...createUserDto };
    await this.userRepository.insert(newUser);
    return newUser;
  }
}
