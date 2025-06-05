"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserRole = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
const base_model_1 = require("./base.model");
const uuid_1 = require("uuid");
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["MANAGER"] = "manager";
    UserRole["FIELD_OFFICER"] = "field_officer";
    UserRole["VIEWER"] = "viewer";
})(UserRole || (exports.UserRole = UserRole = {}));
class UserModel extends sequelize_1.Model {
    toJSON() {
        const values = super.toJSON();
        delete values.password_hash;
        return values;
    }
}
UserModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password_hash: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    first_name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    phone_number: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true,
    },
    district: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
    role: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(UserRole)),
        allowNull: false,
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
    last_login: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    fullName: {
        type: sequelize_1.DataTypes.VIRTUAL,
        get() {
            return `${this.first_name} ${this.last_name}`;
        }
    },
}, {
    sequelize: index_1.sequelize,
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    hooks: {
        beforeCreate: (user) => {
            if (!user.id) {
                user.id = (0, uuid_1.v4)();
            }
        },
    },
});
class User extends base_model_1.BaseModel {
    constructor() {
        super(UserModel);
    }
    async findByEmail(email) {
        return UserModel.findOne({ where: { email } });
    }
}
exports.User = User;
exports.default = UserModel;
