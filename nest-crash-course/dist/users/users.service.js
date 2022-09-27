"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.users = [
            { id: 0, name: 'Mario', username: 'M', password: '123' },
            { id: 1, name: 'Luigi', username: 'L', password: '123' },
            { id: 2, name: 'Peach', username: 'P', password: '123' },
        ];
    }
    async findAll(name) {
        if (name) {
            return this.users.filter((user) => user.name === name);
        }
        return await this.userRepository.find();
    }
    findById(userId) {
        return this.users.find((user) => user.id === userId);
    }
    findByUsername(username) {
        return this.users.find((user) => user.username === username);
    }
    async create(createUserDto) {
        console.log(this.userRepository, typeof this.userRepository);
        const newUser = Object.assign({ id: this.users.length }, createUserDto);
        await this.userRepository.insert(newUser);
        return newUser;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map