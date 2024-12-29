import { TaskRepository } from "../../infrastructure/repositories/TaskRepository";

export class DeleteTaskService {
    constructor(private taskRepository: TaskRepository) {}

    async execute(id: string): Promise<void> {
        await this.taskRepository.delete(id);
    }
}