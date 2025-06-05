import { Request, Response, NextFunction } from 'express';
import { Controller, Get, Post, Put, Delete } from '@decorators/express';
import { Injectable } from '@decorators/di';
import { UserService } from '../services/user.service';
import UserModel from '../models/user.model';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { BadRequestError } from '../errors/api.error';

@Injectable()
@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (err) {
      next(err);
    }
  } 

  @Get('/:id')
  async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await this.userService.getUserById(req.params.id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  @Post('/')
  async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = plainToInstance(UserModel, req.body);
      const errors = await validate(user, { skipMissingProperties: false });
      
      if (errors.length > 0) {
        throw new BadRequestError('Validation failed', errors);
      }

      const newUser = await this.userService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  }

  @Put('/:id')
  async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = plainToInstance(UserModel, req.body);
      const errors = await validate(user, { skipMissingProperties: true });
      
      if (errors.length > 0) {
        throw new BadRequestError('Validation failed', errors);
      }

      const updatedUser = await this.userService.updateUser(req.params.id, req.body);
      res.json(updatedUser);
    } catch (err) {
      next(err);
    }
  }

  @Delete('/:id')
  async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.userService.deleteUser(req.params.id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
}