import { TaskRepository } from "../../infrastructure/repositories/TaskRepository";
import { HttpError } from "../../shared/errors/HttpError";
import { Task } from "../entities/Task";

export class GetTaskService {
    constructor(private taskRepository: TaskRepository) {}

    async execute(id: string): Promise<Task> {
        const task = await this.taskRepository.findById(id);

        if (!task) {
            throw new HttpError('Task not found', 404);
        }

        return task;
    }
}