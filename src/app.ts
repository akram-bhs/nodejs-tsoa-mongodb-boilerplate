import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import methodOverride from 'method-override';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { environment } from './config/environment';
import { connectToMongoDB } from './data-access/database/connection';
import { HttpException, errorHandler } from './middleware/error.middleware';
import { RegisterRoutes as RegisterAdminRoutes } from './routes/admin/routes';
import { RegisterRoutes as RegisterCustomerRoutes } from './routes/customer/routes';
import { logger, stream } from './utils/logger';

export default class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.initializeDBConnections();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeSwagger();
        this.initializeErrorHandling();
    }

    public listen() {
        this.app.listen(environment.port, () => {
            logger.info('=================================');
            logger.info(`======== ENV: ${environment.nodeEnv} ========`);
            logger.info(`🚀 App listening on the port ${environment.port}`);
            logger.info('=================================');
        });
    }

    private initializeDBConnections() {
        connectToMongoDB();
    }

    private initializeMiddlewares() {
        this.app.use(express.json({ limit: '50mb' }));
        this.app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
        this.app.use(compression());
        this.app.use(cookieParser());
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(hpp());
        this.app.use(methodOverride());
        this.app.use(morgan('dev', { stream }));
        if (environment.nodeEnv == 'production') {
            this.app.use('/', rateLimit({
                max: environment.maxRequestsPerHour,
                windowMs: 60 * 60 * 1000,
                handler: function (_req: express.Request, _res: express.Response, _next: express.NextFunction) {
                    throw new HttpException(429, 'TooManyRequests');
                }
            }));
        }
    }

    private initializeRoutes() {
        RegisterAdminRoutes(this.app);
        RegisterCustomerRoutes(this.app);
    }

    private initializeSwagger() {
        this.app.use(express.static('public'));
        this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(undefined, {
            explorer: true,
            customSiteTitle: 'Prestige Finder API',
            swaggerOptions: {
                urls: [
                    {
                        url: '/docs/admin/swagger.json',
                        name: 'Admin API V1'
                    },
                    {
                        url: '/docs/customer/swagger.json',
                        name: 'Customer API V1'
                    }
                ]
            }
        }));
    }

    private initializeErrorHandling() {
        this.app.use(errorHandler);
    }
}