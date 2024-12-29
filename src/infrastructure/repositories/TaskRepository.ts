import { Task } from "../../domain/entities/Task";
import { ITaskRepository } from "../../domain/interfaces/ITaskRepository";
import NotFoundError from "../../shared/httperrors/NotFoundError";
import { TaskModel } from "../database/models/TaskModel";
import { CreateTaskDTO } from "../http/dtos/CreateTaskDTO";
import { UpdateTaskDTO } from "../http/dtos/UpdateTaskDTO";

export class TaskRepository implements ITaskRepository {
    async create(createTaskDTO: CreateTaskDTO): Promise<void> {
        const newTask = new TaskModel({
            title: createTaskDTO.title,
            description: createTaskDTO?.description,
            isCompleted: false
        });
        await newTask.save();
    }

    async findById(id: string): Promise<Task> {
        const taskDoc = await TaskModel.findById(id).exec();
        if (!taskDoc) {
            throw new NotFoundError({ message: "Task not found" });
        }
        return new Task(
                    taskDoc.id, 
                    taskDoc.title, 
                    taskDoc.description, 
                    taskDoc.isCompleted, 
                    taskDoc.createdAt
                );
    }

    async update(id: string, updateTaskDTO: UpdateTaskDTO): Promise<void> {
        const updatedTask = await TaskModel.findByIdAndUpdate(id, { title: updateTaskDTO.title, description: updateTaskDTO.description }).exec();
        if (!updatedTask) {
            throw new NotFoundError({ message: "Task not found" });
        }
    }

    async delete(id: string): Promise<void> {
        const taskDeleted = TaskModel.findByIdAndDelete(id).exec();
        if (!taskDeleted) {
            throw new NotFoundError({ message: "Task not found" });
        }
    }

    async complete(id: string): Promise<void> {
        const completedTask = await TaskModel.findByIdAndUpdate(id, { isCompleted: true }).exec();
        if (!completedTask) {
            throw new NotFoundError({ message: "Task not found" });
        }
    }

    async findAll(completed?: boolean): Promise<Task[]> {
        const query = completed !== undefined ? { isCompleted: completed } : {};
        const tasksDoc = await TaskModel.find(query).exec();
        return tasksDoc.map(
            ({ id, title, description, isCompleted, createdAt }) => 
                new Task(
                    id, title, description, isCompleted, createdAt)
        );
    }
}