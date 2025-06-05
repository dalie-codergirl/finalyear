"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = void 0;
class BaseModel {
    constructor(model) {
        this.model = model;
    }
    async findAll() {
        return this.model.findAll();
    }
    async findById(id) {
        return this.model.findByPk(id);
    }
    async create(data) {
        return this.model.create(data);
    }
    async update(id, data) {
        const where = { id };
        return this.model.update(data, { where, returning: true });
    }
    async delete(id) {
        const where = { id };
        return this.model.destroy({ where });
    }
}
exports.BaseModel = BaseModel;
