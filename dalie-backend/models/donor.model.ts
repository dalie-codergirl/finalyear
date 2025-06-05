import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './index';
import { BaseModel } from './base.model';
import { v4 as uuidv4 } from 'uuid';

interface DonorAttributes {
  id: string;
  name: string;
  contact_email?: string | null;
  contact_phone?: string | null;
  website?: string | null;
  created_at: Date;
  updated_at: Date;
}

interface DonorCreationAttributes extends Optional<DonorAttributes, 'id' | 'created_at' | 'updated_at'> {}

class DonorModel extends Model<DonorAttributes, DonorCreationAttributes> implements DonorAttributes {
  public id!: string;
  public name!: string;
  public contact_email!: string | null;
  public contact_phone!: string | null;
  public website!: string | null;
  public created_at!: Date;
  public updated_at!: Date;
}

DonorModel.init(
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
      unique: true,
    },
    contact_email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        isEmail: true,
      },
      field: 'contact_email',
    },
    contact_phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'contact_phone',
    },
    website: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        isUrl: true,
      },
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
    tableName: 'donors',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    hooks: {
      beforeCreate: (donor) => {
        if (!donor.id) {
          donor.id = uuidv4();
        }
      },
    },
  }
);

export class Donor extends BaseModel<DonorAttributes, DonorCreationAttributes> {
  constructor() {
    super(DonorModel);
  }

  // Add any custom donor methods here
  async findByName(name: string): Promise<DonorModel | null> {
    return DonorModel.findOne({ where: { name } });
  }
}

export default DonorModel;