import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index';
import { BaseModel } from './base.model';

export enum ProjectStatus {
  PLANNED = 'planned',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  SUSPENDED = 'suspended',
}

export class Project extends Model {
  public id!: string;
  public name!: string;
  public description!: string;
  public status!: 'active' | 'completed' | 'on_hold' | 'cancelled';
  public startDate!: Date;
  public endDate!: Date;
  public budget!: number;
  public location!: string;
  public managerId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Project.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'completed', 'on_hold', 'cancelled'),
      allowNull: false,
      defaultValue: 'active',
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    budget: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    managerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'projects',
    modelName: 'Project',
  }
);

export default Project;