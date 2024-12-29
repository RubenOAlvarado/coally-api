import { TaskRepository } from "../../infrastructure/repositories/TaskRepository";
import { Task } from "../entities/Task";

export class GetTaskService {
    constructor(private taskRepository: TaskRepository) {}

    async execute(id: string): Promise<Task> {
        const task = await this.taskRepository.findById(id);
        return task;
    }
}