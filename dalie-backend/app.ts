import express from 'express';
import cors from 'cors';
import { Container } from '@decorators/di';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
// import morgan from 'morgan';
import { Server } from './server';
import { sequelize } from './models';
import { UserController } from './controllers/user.controller';

class Application {
  private server: Server;
  private container: Container;
  private httpServer: ReturnType<typeof createServer>;
  private io: SocketServer;

  constructor() {
    this.httpServer = createServer();
    this.io = new SocketServer(this.httpServer, {
      cors: {
        origin: process.env.CORS_ORIGINS?.split(',') || '*',
        methods: ['GET', 'POST']
      }
    });
    this.container = new Container();
    this.registerControllers();
    this.server = new Server(this.httpServer);
    this.setupDatabase();
    this.setupSocketMonitoring();
  }

  private async setupDatabase() {
    try {
      await sequelize.authenticate();
      console.log('Database connection established');
      
      await sequelize.sync({ alter: true });
      console.log('Database synchronized');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      process.exit(1);
    }
  }

  private registerControllers() {
    this.container.provide([
      { provide: UserController, useClass: UserController }
    ]);
  }

  private setupSocketMonitoring() {
    this.io.on('connection', (socket) => {
      console.log('Monitoring client connected');
      socket.on('disconnect', () => {
        console.log('Monitoring client disconnected');
      });
    });
  }

  public start() {
    this.server.start();
  }
}

const app = new Application();
app.start();