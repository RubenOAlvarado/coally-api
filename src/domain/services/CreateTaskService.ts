import { CreateTaskDTO } from "../../infrastructure/http/dtos/CreateTaskDTO";
import { ITaskRepository } from "../interfaces/ITaskRepository";

export class CreateTaskService {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(createTaskDTO: CreateTaskDTO): Promise<void> {
    await this.taskRepository.create(createTaskDTO);
  }
}