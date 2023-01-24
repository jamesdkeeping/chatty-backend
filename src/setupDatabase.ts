import mongoose from 'mongoose';
import Logger from 'bunyan';
import { config } from '@root/config';
import { redisConnection } from '@service/redis/redis.connection';
const log: Logger = config.createLogger('setUpDatabase');
export default () => {
  const connect = () => {
    mongoose.set('strictQuery', false);
    mongoose
      .connect(`${config.DATABASE_URL}`)
      .then(() => {
        log.info('Successfully connected to database.');
        redisConnection.connect();
      })
      .catch((error) => {
        log.error('Error connecting to database', error);
        if (error) {
          return process.exit(1);
        }
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};
