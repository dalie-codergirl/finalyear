import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Activity from './Activity';
import User from './User';

class ActivityReport extends Model {
  public id!: string;
  public activityId!: string;
  public fieldOfficerId!: string;
  public formData!: Record<string, any>;
  public attachments?: string[];
  public status!: 'pending' | 'approved' | 'rejected';
  public submittedAt!: Date;
}

ActivityReport.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    activityId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'activities',
        key: 'id',
      },
    },
    fieldOfficerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    formData: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    attachments: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending',
      allowNull: false,
    },
    submittedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'ActivityReport',
    tableName: 'activity_reports',
  }
);

// Define associations
ActivityReport.belongsTo(Activity, { foreignKey: 'activityId' });
ActivityReport.belongsTo(User, { foreignKey: 'fieldOfficerId' });

export default ActivityReport; 