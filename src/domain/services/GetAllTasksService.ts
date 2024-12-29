import { TaskRepository } from "../../infrastructure/repositories/TaskRepository";
import BadRequestError from "../../shared/httperrors/BadRequestError";
import { Task } from "../entities/Task";

export class GetAllTasksService {
  constructor(private taskRepository: TaskRepository) {}

  async execute(status?: 'completed' | 'pending'): Promise<Task[]> {
    if( status && status !== 'completed' && status !== 'pending') {
        throw new BadRequestError({ message: "Invalid status", logging: true });
    }
    const completed = this.setCompleted(status);
    const tasks = await this.taskRepository.findAll(completed);
    return tasks;
  }

  private setCompleted(status?: string): boolean | undefined {
    if (status && status === 'completed') {
      return true;
    } else if (status && status === 'pending') {
      return false;
    }
    return undefined;
  }
}