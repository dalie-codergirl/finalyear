"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const typedi_1 = require("typedi");
const user_model_1 = __importDefault(require("../models/user.model"));
let UserRepository = class UserRepository {
    async findAll() {
        return user_model_1.default.findAll({
            attributes: ['id', 'email', 'first_name', 'last_name', 'role'],
        });
    }
    async findById(id) {
        return user_model_1.default.findByPk(id);
    }
    async findByEmail(email) {
        return user_model_1.default.findOne({ where: { email } });
    }
    async create(userData) {
        return user_model_1.default.create(userData);
    }
    async update(id, userData) {
        return user_model_1.default.update(userData, {
            where: { id },
            returning: true
        });
    }
    async delete(id) {
        return user_model_1.default.destroy({ where: { id } });
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, typedi_1.Service)()
], UserRepository);
