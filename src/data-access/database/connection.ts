import mongoose from 'mongoose';
import { environment } from '../../config/environment';
import { logger } from '../../utils/logger';

export const connectToMongoDB = (): void => {
    mongoose.connect(environment.mongodbUri)
        .then(() => {
            logger.info('Connected to MongoDB');
        })
        .catch(err => logger.error('Failed to create connection with MongoDB: ', err));
}