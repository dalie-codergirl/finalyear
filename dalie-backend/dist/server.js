"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const error_middleware_1 = require("./middlewares/error.middleware");
const user_controller_1 = require("./controllers/user.controller");
const express_2 = require("@decorators/express");
const config_1 = require("./config");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = parseInt(String(config_1.PORT) || '3000');
        this.configureMiddlewares();
        this.configureRoutes();
        this.configureErrorHandling();
    }
    configureMiddlewares() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cors_1.default)({
            origin: config_1.CORS_ORIGINS,
            credentials: config_1.CORS_CREDENTIALS === 'true',
            methods: config_1.CORS_METHODS,
            allowedHeaders: config_1.CORS_ALLOWED_HEADERS
        }));
    }
    configureRoutes() {
        (0, express_2.attachControllers)(this.app, [user_controller_1.UserController]);
    }
    configureErrorHandling() {
        this.app.use(error_middleware_1.errorMiddleware);
    }
    start() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}
exports.Server = Server;
