import { CreateTaskService } from "../../../domain/services/CreateTaskService";
import { Request, Response } from 'express';
import { TaskRepository } from "../../repositories/TaskRepository";
import { DeleteTaskService } from "../../../domain/services/DeleteTaskService";
import { GetTaskService } from "../../../domain/services/GetTaskService";
import { UpdateTaskService } from "../../../domain/services/UpdateTaskService";
import { GetAllTasksService } from "../../../domain/services/GetAllTasksService";
import { CompleteTaskService } from "../../../domain/services/CompleteTaskService";

export default class TaskController {
    /**
     * @swagger
     *  /tasks:
     *      post:
     *          summary: Create a new task
     *          tags: [Tasks]
     *          requestBody:
     *              required: true
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/CreateTask'
     *          responses:
     *              201:
     *                  description: Task created successfully
     *              500:
     *                  description: An unknown error occurred 
    */
    async createTask(req: Request, res: Response){
        const { title, description } = req.body;
        const createTaskService = new CreateTaskService(new TaskRepository());
    
        try {
            await createTaskService.execute({ title, description });
            res.status(201).json({ message: 'Task created successfully' });
        } catch (error) {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }

    /**
     * @swagger
     *  /tasks/{id}:
     *      get:
     *          summary: Get a task by id
     *          tags: 
     *              - Tasks
     *          parameters:
     *              - in: path
     *                name: id
     *                required: true
     *                description: Task id
     *                schema:
     *                  type: string
     *          responses:
     *              200:
     *                  description: Task found
     *              404:
     *                  description: Task not found
     *              500:
     *                  description: An unknown error occurred
     */
    async getTaskById(req: Request, res: Response){
        const { id } = req.params;
        const getTaskByIdService = new GetTaskService(new TaskRepository());

        try {
            const task = await getTaskByIdService.execute(id);
            res.status(200).json(task);
        } catch (error) {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }

    /**
     * @swagger
     *  /tasks:
     *      get:
     *          summary: Get all tasks
     *          tags: 
     *              - Tasks
     *          parameters:
     *              - in: query
     *                name: status
     *                description: Task status
     *                required: false
     *                schema:
     *                  type: string
     *                  enum: [completed, pending]
     *                  example: completed
     *          responses:
     *              200:
     *                  description: Tasks found
     *              500:
     *                  description: An unknown error occurred
     *              404:
     *                  description: Tasks not found
     *              400:
     *                  description: Invalid status
     */

    async getAllTasks(req: Request, res: Response){
        const { status } = req.query;
        const getTaskService = new GetAllTasksService(new TaskRepository());
    
        try {
            const tasks = await getTaskService.execute(status as 'completed' | 'pending');
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }

    /**
     * @swagger
     *  /tasks/{id}:
     *      put:
     *          summary: Update a task
     *          tags: 
     *              - Tasks
     *          parameters:
     *              - in: path
     *                name: id
     *                required: true
     *                description: Task id
     *                schema:
     *                  type: string
     *          requestBody:
     *              required: true
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/CreateTask'
     *          responses:
     *              200:
     *                  description: Task updated successfully
     *              404:
     *                  description: Task not found
     *              500:
     *                  description: An unknown error occurred
     */
    async updateTask(req: Request, res: Response){
        const { id } = req.params;
        const { title, description } = req.body;
        const updateTaskService = new UpdateTaskService(new TaskRepository());
    
        try {
            await updateTaskService.execute(id, { title, description });
            res.status(200).json({ message: 'Task updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }

    /**
     * @swagger
     *  /tasks/{id}:
     *      delete:
     *          summary: Delete a task
     *          tags: 
     *              - Tasks
     *          parameters:
     *              - in: path
     *                name: id
     *                required: true
     *                description: Task id
     *                schema:
     *                  type: string
     *          responses:
     *              204:
     *                  description: Task deleted successfully
     *              500:
     *                  description: An unknown error occurred
     *              404:
     *                  description: Task not found
     */
    async deleteTask(req: Request, res: Response){
        const { id } = req.params;
        const deleteTaskService = new DeleteTaskService(new TaskRepository());
    
        try {
            await deleteTaskService.execute(id);
            res.status(204).json({ message: 'Task deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }

    /**
     * @swagger
     *  /tasks/{id}/complete:
     *      patch:
     *          summary: Complete a task
     *          tags: 
     *              - Tasks
     *          parameters:
     *              - in: path
     *                name: id
     *                required: true
     *                description: Task id
     *                schema:
     *                  type: string
     *          responses:
     *              204:
     *                  description: Task completed successfully
     *              500:
     *                  description: An unknown error occurred
     *              404:
     *                  description: Task not found
    */
    async completeTask(req: Request, res: Response){
        const { id } = req.params;
        const completeTaskService = new CompleteTaskService(new TaskRepository());
    
        try {
            await completeTaskService.execute(id);
            res.status(204).json({ message: 'Task completed successfully' });
        } catch (error) {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}