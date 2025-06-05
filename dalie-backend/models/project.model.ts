import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './index';
import { BaseModel } from './base.model';

export enum ProjectStatus {
  PLANNED = 'planned',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  SUSPENDED = 'suspended',
}

interface ProjectAttributes {
  id: string;
  name: string;
  description?: string | null;
  donor_id?: string | null;
  start_date: Date;
  end_date: Date;
  budget?: number | null;
  status: ProjectStatus;
  created_at: Date;
  updated_at: Date;
}

interface ProjectCreationAttributes extends Optional<ProjectAttributes, 'id' | 'created_at' | 'updated_at'> {}

class ProjectModel extends Model<ProjectAttributes, ProjectCreationAttributes> implements ProjectAttributes {
  public id!: string;
  public name!: string;
  public description!: string | null;
  public donor_id!: string | null;
  public start_date!: Date;
  public end_date!: Date;
  public budget!: number | null;
  public status!: ProjectStatus;
  public created_at!: Date;
  public updated_at!: Date;
}

ProjectModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    donor_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'donors',
        key: 'id',
      },
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    budget: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(ProjectStatus)),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'projects',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export class Project extends BaseModel<ProjectAttributes, ProjectCreationAttributes> {
  constructor() {
    super(ProjectModel);
  }
}

export default ProjectModel;