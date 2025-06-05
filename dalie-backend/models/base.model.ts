import { Model, ModelDefined, Optional, WhereOptions } from 'sequelize';

export interface Timestamps {
  created_at: Date;
  updated_at: Date;
}

export interface HasId {
  id: string;
}

export abstract class BaseModel<T extends HasId, TCreationAttributes extends Partial<T>> {
  protected model: ModelDefined<T, TCreationAttributes>;

  constructor(model: ModelDefined<T, TCreationAttributes>) {
    this.model = model;
  }

  async findAll(): Promise<Model<T, TCreationAttributes>[]> {
    return this.model.findAll();
  }

  async findById(id: string): Promise<Model<T, TCreationAttributes> | null> {
    return this.model.findByPk(id);
  }

  async create(data: TCreationAttributes): Promise<Model<T, TCreationAttributes>> {
    return this.model.create(data as any);
  }

  async update(
    id: string,
    data: Partial<T>
  ): Promise<[number, Model<T, TCreationAttributes>[]]> {
    const where: WhereOptions<T> = { id } as WhereOptions<T>;
    return this.model.update(
      data as any,
      { where, returning: true }
    );
  }

  async delete(id: string): Promise<number> {
    const where: WhereOptions<T> = { id } as WhereOptions<T>;
    return this.model.destroy({ where });
  }
}