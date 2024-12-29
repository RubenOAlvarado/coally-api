import { TaskRepository } from "../../infrastructure/repositories/TaskRepository";
import { HttpError } from "../../shared/errors/HttpError";
import { Task } from "../entities/Task";

export class GetAllTasksService {
  constructor(private taskRepository: TaskRepository) {}

  async execute(status?: 'completed' | 'pending'): Promise<Task[]> {
    if( status && status !== 'completed' && status !== 'pending') {
        throw new HttpError('Invalid status', 400);
    }
    const tasks = await this.taskRepository.findAll(status);
    if(tasks.length === 0) {
      throw new HttpError('Tasks not found', 404);
    }
    return tasks;
  }
}