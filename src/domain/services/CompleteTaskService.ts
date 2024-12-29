import { TaskRepository } from "../../infrastructure/repositories/TaskRepository";

export class CompleteTaskService {
    constructor(private taskRepository: TaskRepository) {}

    async execute(id: string): Promise<void> {
        await this.taskRepository.complete(id);
    }
}