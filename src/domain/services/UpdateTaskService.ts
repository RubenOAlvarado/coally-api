import { UpdateTaskDTO } from "../../infrastructure/http/dtos/UpdateTaskDTO";
import { TaskRepository } from "../../infrastructure/repositories/TaskRepository";
import { HttpError } from "../../shared/errors/HttpError";
import { Task } from "../entities/Task";

export class UpdateTaskService {
    constructor(private taskRepository: TaskRepository) {}

    async execute(id: string, data: UpdateTaskDTO): Promise<Task> {
        const task = await this.taskRepository.findById(id);

        if (!task) {
            throw new HttpError('Task not found', 404);
        }

        const updatedTask = await this.taskRepository.update(id, data);

        return updatedTask;
    }
}