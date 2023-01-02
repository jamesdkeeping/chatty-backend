import express, { Express } from 'express';
import { AppServer } from '@root/setupServer';
import dataBaseConnection from '@root/setupDatabase';
import { config } from '@root/config';

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
    config.cloudinaryConfig();
  }
}

const application: Application = new Application();
application.initialize();
