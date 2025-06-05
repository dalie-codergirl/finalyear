import { Service } from 'typedi';
import UserModel, { UserCreationAttributes } from '../models/user.model';

@Service()
export class UserRepository {
  async findAll(): Promise<UserModel[]> {
    return UserModel.findAll({
      attributes: ['id', 'email', 'first_name', 'last_name', 'role'],
    });
  }

  async findById(id: string): Promise<UserModel | null> {
    return UserModel.findByPk(id);
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    return UserModel.findOne({ where: { email } });
  }

async create(userData: Partial<UserModel>): Promise<UserModel> {
    return UserModel.create(userData as UserCreationAttributes);
  }

  async update(id: string, userData: Partial<UserModel>): Promise<[number, UserModel[]]> {
    return UserModel.update(userData, { 
      where: { id },
      returning: true 
    });
  }

  async delete(id: string): Promise<number> {
    return UserModel.destroy({ where: { id } });
  }
}