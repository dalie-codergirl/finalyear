import { Injectable } from '@decorators/di';
import { UserRepository } from '../repositories/user.repository';
import UserModel, { UserCreationAttributes } from '../models/user.model';
import { BadRequestError, NotFoundError } from '../errors/api.error';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers(): Promise<UserModel[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: string): Promise<UserModel> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

async createUser(userData: UserCreationAttributes): Promise<UserModel> {
    const existingUser = await this.userRepository.findByEmail(userData.email || '');
    if (existingUser) {
      throw new BadRequestError('Email already in use');
    }
    return this.userRepository.create(userData);
  }

  async updateUser(id: string, userData: Partial<UserModel>): Promise<UserModel> {
    const [affectedCount, users] = await this.userRepository.update(id, userData);
    if (affectedCount === 0) {
      throw new NotFoundError('User not found');
    }
    return users[0];
  }

  async deleteUser(id: string): Promise<void> {
    const affectedCount = await this.userRepository.delete(id);
    if (affectedCount === 0) {
      throw new NotFoundError('User not found');
    }
  }
}