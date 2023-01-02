import dotenv from 'dotenv';
import bunyan from 'bunyan';
import cloudinary from 'cloudinary';

dotenv.config({});

class Config {
  DATABASE_URL: string | undefined;
  JWT_TOKEN: string | undefined;
  NODE_ENV: string | undefined;
  SECRET_KEY_ONE: string | undefined;
  SECRET_KEY_TWO: string | undefined;
  CLIENT_URL: string | undefined;
  REDIS_HOST: string | undefined;
  CLOUD_NAME: string | undefined;
  CLOUD_API_KEY: string | undefined;
  CLOUD_API_SECRET: string | undefined;

  private readonly DEFAULT_DATABASE_URL = 'mongodb://localhost:27017/chattyapp-backend';

  constructor() {
    this.DATABASE_URL = process.env.DATABASE_URL || this.DEFAULT_DATABASE_URL;
    this.JWT_TOKEN = process.env.JWT_TOKEN || '1234';
    this.NODE_ENV = process.env.NODE_ENV;
    this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE || '';
    this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO || '';
    this.CLIENT_URL = process.env.CLIENT_URL || '';
    this.REDIS_HOST = process.env.REDIS_HOST || '';
    this.CLOUD_NAME = process.env.CLOUD_NAME || '';
    this.CLOUD_API_KEY = process.env.CLOUD_API_KEY || '';
    this.CLOUD_API_SECRET = process.env.CLOUD_API_SECRET || '';
  }

  public createLogger(name: string): bunyan {
    return bunyan.createLogger({ name, level: 'debug' });
  }



  async validateConfig(): Promise<boolean> {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`Configuration ${key} is undefined.`);
      }
    }
    return Promise.resolve(true);
  }

  public cloudinaryConfig() {
    cloudinary.v2.config({
      cloud_name: this.CLOUD_NAME,
      api_key: this.CLOUD_API_KEY,
      api_secret: this.CLOUD_API_SECRET
    });
  }

}

export const config: Config = new Config();
