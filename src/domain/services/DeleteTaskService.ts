import { TaskRepository } from "../../infrastructure/repositories/TaskRepository";
import { HttpError } from "../../shared/errors/HttpError";

export class DeleteTaskService {
    constructor(private taskRepository: TaskRepository) {}

    async execute(id: string): Promise<void> {
        const task = await this.taskRepository.findById(id);

        if (!task) {
            throw new HttpError('Task not found', 404);
        }

        await this.taskRepository.delete(id);
    }
}