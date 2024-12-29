import { Application, Router } from "express";
import taskRoutes from "./tasks.routes";

class Routes {
    private app: Application;
    private apiRouter: Router;

    constructor(app: Application) {
        this.app = app;
        this.apiRouter = Router();
        this.setup();
    }

    private setup() {
        this.setupApiRoutes();
        this.app.use('/api/v1', this.apiRouter);
    }

    private setupApiRoutes() {
        this.apiRouter.use('/tasks', taskRoutes);
        this.apiRouter.get('/health', (req, res) => {
            res.status(200).json({ message: 'Server is running' });
        });
    }
}

export default Routes;