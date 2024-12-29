import express, { Application, NextFunction, Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';
import { errorHandler } from './middleware/errorHandler';
import swaggerDocs from '../config/swaggerDocs';
import Routes from './routes';
import "express-async-errors";

export default class Server {
    constructor(app: Application) {
        this.config(app);
        this.setupRoutes(app);
        this.setupSwagger(app);
        this.setupErrorHandlers(app);
    }

    private config(app: Application): void {
        const corsOptions: CorsOptions = {
            origin: '*',
            optionsSuccessStatus: 200,
        };

        app.use(cors(corsOptions));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
    }

    private setupRoutes(app: Application): void {
        new Routes(app);
    }

    private setupSwagger(app: Application): void {
        if(!process.env.RAILWAY_ENVIRONMENT_NAME)
            swaggerDocs(app);
        else return;
    }

    private setupErrorHandlers(app: Application): void {
        app.use((req: Request, res: Response, next: NextFunction) => {
            res.status(404).json({ message: 'Route not found' });
        });
        app.use(errorHandler);
    }
}