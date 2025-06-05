"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@decorators/di");
const server_1 = require("./server");
const models_1 = require("./models");
const user_controller_1 = require("./controllers/user.controller");
class Application {
    constructor() {
        this.server = new server_1.Server();
        this.container = new di_1.Container();
        this.setupDatabase();
        this.registerControllers();
    }
    async setupDatabase() {
        try {
            await models_1.sequelize.authenticate();
            console.log('Database connection established');
            // Sync models with database
            await models_1.sequelize.sync({ alter: true }); // Use { force: true } only in development
            console.log('Database synchronized');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
            process.exit(1);
        }
    }
    registerControllers() {
        // Register all controllers here
        this.container.provide([
            { provide: user_controller_1.UserController, useClass: user_controller_1.UserController }
        ]);
    }
    start() {
        this.server.start();
    }
}
const app = new Application();
app.start();
