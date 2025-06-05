"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
(async () => {
    try {
        const sequelize = new sequelize_1.Sequelize({
            database: process.env.DB_NAME,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || '5432'),
            dialect: 'postgres',
            logging: console.log
        });
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.close();
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
