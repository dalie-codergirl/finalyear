import express from 'express';
import cors from 'cors';
import { Container } from '@decorators/di';
import { errorMiddleware } from './middlewares/error.middleware';
import { attachControllers } from '@decorators/express';
import morgan from 'morgan';
import { createServer } from 'http';
import { PORT, CORS_ORIGINS, CORS_CREDENTIALS, CORS_METHODS, CORS_ALLOWED_HEADERS } from './config';
import { UserController } from './controllers/user.controller';

export class Server {
  private app: express.Application;
  private port: number;

  constructor(private httpServer?: ReturnType<typeof createServer>) {
    this.app = express();
    this.port = parseInt(String(PORT) || '3000');
    this.configureMiddlewares();
    this.configureRoutes();
    this.configureErrorHandling();
    this.configureRequestMonitoring();
  }

  private configureMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors({
      origin: CORS_ORIGINS,
      credentials: CORS_CREDENTIALS === 'true',
      methods: CORS_METHODS,
      allowedHeaders: CORS_ALLOWED_HEADERS
    }));
    
    // Add Morgan logging
    this.app.use(morgan('dev'));
  }

  private configureRequestMonitoring() {
    this.app.use((req, res, next) => {
      const start = Date.now();
      
      res.on('finish', () => {
        const duration = Date.now() - start;
        const requestData = {
          method: req.method,
          path: req.path,
          status: res.statusCode,
          duration,
          timestamp: new Date().toISOString(),
          ip: req.ip,
          userAgent: req.headers['user-agent']
        };
        
        // Emit to all connected monitoring clients
        if (this.httpServer) {
          const io = (this.httpServer as any).io;
          if (io) {
            io.emit('request', requestData);
          }
        }
        
        console.log(`${requestData.method} ${requestData.path} ${requestData.status} - ${duration}ms`);
      });
      
      next();
    });
  }

  private configureRoutes() {
    attachControllers(this.app, [UserController]);
  }

  private configureErrorHandling() {
    this.app.use(errorMiddleware as any);
  }

  public start() {
    if (this.httpServer) {
      this.httpServer.on('request', this.app);
      this.httpServer.listen(this.port, () => {
        console.log(`Server running on port ${this.port}`);
      });
    } else {
      this.app.listen(this.port, () => {
        console.log(`Server running on port ${this.port}`);
      });
    }
  }
}