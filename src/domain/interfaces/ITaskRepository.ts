import { CreateTaskDTO } from '../../infrastructure/http/dtos/CreateTaskDTO';
import { Task } from '../entities/Task';

export interface ITaskRepository {
  create(task: CreateTaskDTO): Promise<void>;
  findById(id: string): Promise<Task | null>;
  update(id: string, task: Task): Promise<Task>;
  delete(id: string): Promise<void>;
  complete(id: string): Promise<void>;
  findAll(status?: string): Promise<Task[]>;
}