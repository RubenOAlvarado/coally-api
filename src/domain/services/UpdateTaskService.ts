import { UpdateTaskDTO } from "../../infrastructure/http/dtos/UpdateTaskDTO";
import { TaskRepository } from "../../infrastructure/repositories/TaskRepository";

export class UpdateTaskService {
    constructor(private taskRepository: TaskRepository) {}

    async execute(id: string, data: UpdateTaskDTO): Promise<void> {
        await this.taskRepository.update(id, data);
    }
}