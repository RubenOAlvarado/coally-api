import 'express-async-errors';
import { Router } from 'express';
import TaskController from '../../infrastructure/http/controllers/TaskController';
import { createTaskValidation, getAllTasksValidation, getTaskByIdValidation, updateTaskValidation } from '../../infrastructure/http/validators/TaskValidator';
import { validationMiddleware } from '../middleware/validationMiddleware';

/**
 * @swagger
 * tags:
 *  name: Tasks
 *  description: Tasks management
 */
class TasksRoutes {
    router = Router();
    controller = new TaskController();

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post(
            '/',
            createTaskValidation,
            validationMiddleware, 
            this.controller.createTask
        );
        this.router.get(
            '/',
            getAllTasksValidation,
            validationMiddleware,
            this.controller.getAllTasks
        );
        this.router.get(
            '/:id',
            getTaskByIdValidation,
            validationMiddleware, 
            this.controller.getTaskById
        );
        this.router.put(
            '/:id',
            updateTaskValidation,
            validationMiddleware, 
            this.controller.updateTask
        );
        this.router.delete(
            '/:id',
            getTaskByIdValidation,
            validationMiddleware, 
            this.controller.deleteTask
        );
        this.router.patch(
            '/:id/complete',
            getTaskByIdValidation,
            validationMiddleware, 
            this.controller.completeTask
        );
    }
}

export default new TasksRoutes().router;