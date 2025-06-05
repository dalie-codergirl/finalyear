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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const express_1 = require("@decorators/express");
const di_1 = require("@decorators/di");
const user_service_1 = require("../services/user.service");
const user_model_1 = __importDefault(require("../models/user.model"));
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const api_error_1 = require("../errors/api.error");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getUsers(req, res, next) {
        try {
            const users = await this.userService.getAllUsers();
            res.json(users);
        }
        catch (err) {
            next(err);
        }
    }
    async getUser(req, res, next) {
        try {
            const user = await this.userService.getUserById(req.params.id);
            res.json(user);
        }
        catch (err) {
            next(err);
        }
    }
    async createUser(req, res, next) {
        try {
            const user = (0, class_transformer_1.plainToInstance)(user_model_1.default, req.body);
            const errors = await (0, class_validator_1.validate)(user, { skipMissingProperties: false });
            if (errors.length > 0) {
                throw new api_error_1.BadRequestError('Validation failed', errors);
            }
            const newUser = await this.userService.createUser(req.body);
            res.status(201).json(newUser);
        }
        catch (err) {
            next(err);
        }
    }
    async updateUser(req, res, next) {
        try {
            const user = (0, class_transformer_1.plainToInstance)(user_model_1.default, req.body);
            const errors = await (0, class_validator_1.validate)(user, { skipMissingProperties: true });
            if (errors.length > 0) {
                throw new api_error_1.BadRequestError('Validation failed', errors);
            }
            const updatedUser = await this.userService.updateUser(req.params.id, req.body);
            res.json(updatedUser);
        }
        catch (err) {
            next(err);
        }
    }
    async deleteUser(req, res, next) {
        try {
            await this.userService.deleteUser(req.params.id);
            res.status(204).end();
        }
        catch (err) {
            next(err);
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, express_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, express_1.Get)('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, express_1.Post)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, express_1.Put)('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, express_1.Delete)('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, di_1.Injectable)(),
    (0, express_1.Controller)('/users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
