import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Activity extends Model {
  public id!: string;
  public title!: string;
  public description!: string;
  public category!: string;
  public estimatedDuration!: string;
  public requiredFields!: {
    id: string;
    type: string;
    label: string;
    required: boolean;
    options?: string[];
  }[];
}

Activity.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estimatedDuration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    requiredFields: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Activity',
    tableName: 'activities',
  }
);

export default Activity; 