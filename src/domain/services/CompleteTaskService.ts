import { TaskRepository } from "../../infrastructure/repositories/TaskRepository";
import { HttpError } from "../../shared/errors/HttpError";

export class CompleteTaskService {
    constructor(private taskRepository: TaskRepository) {}

    async execute(id: string): Promise<void> {
        const validTask = await this.taskRepository.findById(id);
        if(!validTask) {
            throw new HttpError('Task not found', 404);
        }
        await this.taskRepository.complete(id);
    }
}