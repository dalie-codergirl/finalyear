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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const di_1 = require("@decorators/di");
const user_repository_1 = require("../repositories/user.repository");
const api_error_1 = require("../errors/api.error");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getAllUsers() {
        return this.userRepository.findAll();
    }
    async getUserById(id) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new api_error_1.NotFoundError('User not found');
        }
        return user;
    }
    async createUser(userData) {
        const existingUser = await this.userRepository.findByEmail(userData.email || '');
        if (existingUser) {
            throw new api_error_1.BadRequestError('Email already in use');
        }
        return this.userRepository.create(userData);
    }
    async updateUser(id, userData) {
        const [affectedCount, users] = await this.userRepository.update(id, userData);
        if (affectedCount === 0) {
            throw new api_error_1.NotFoundError('User not found');
        }
        return users[0];
    }
    async deleteUser(id) {
        const affectedCount = await this.userRepository.delete(id);
        if (affectedCount === 0) {
            throw new api_error_1.NotFoundError('User not found');
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, di_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserService);
