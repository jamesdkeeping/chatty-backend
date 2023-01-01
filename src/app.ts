import express, { Express } from 'express';
import { AppServer } from '../src/setupServer';
import dataBaseConnection from './setupDatabase';
import { config } from './config';

class Application {
  async initialize() {
    await this.loadConfig();
    dataBaseConnection();
    const app: Express = express();
    const server: AppServer = new AppServer(app);
    server.start();
  }

  private loadConfig() {
    config.validateConfig();
  }
}

const application: Application = new Application();
application.initialize();
