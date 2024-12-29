import { Task } from "../../domain/entities/Task";
import { ITaskRepository } from "../../domain/interfaces/ITaskRepository";
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

    async findById(id: string): Promise<Task | null> {
        const taskDoc = await TaskModel.findById(id).exec();
        if (!taskDoc) {
            return null;
        }
        return new Task(taskDoc.id, taskDoc.title, taskDoc.description, taskDoc.isCompleted);
    }

    async update(id: string, updateTaskDTO: UpdateTaskDTO): Promise<Task> {
        const taskDoc = await TaskModel.findByIdAndUpdate(id, { title: updateTaskDTO.title, description: updateTaskDTO.description }).exec();
        if (!taskDoc) {
            throw new Error("Task not found");
        }
        return new Task(taskDoc.id, taskDoc.title, taskDoc.description, taskDoc.isCompleted);
    }

    async delete(id: string): Promise<void> {
        await TaskModel.findByIdAndDelete(id).exec();
    }

    async complete(id: string): Promise<void> {
        const taskDoc = await TaskModel.findByIdAndUpdate(id, { isCompleted: true }).exec();
        if (!taskDoc) {
            throw new Error("Task not found");
        }
    }

    async findAll(status?: string): Promise<Task[]> {
        const tasksDoc = status ? await TaskModel.find({ isCompleted: status === 'completed' }).exec() : await TaskModel.find().exec();
        return tasksDoc.map(taskDoc => new Task(taskDoc.id, taskDoc.title, taskDoc.description, taskDoc.isCompleted));
    }
}