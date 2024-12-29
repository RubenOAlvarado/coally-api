import { CreateTaskDTO } from '../../infrastructure/http/dtos/CreateTaskDTO';
import { Task } from '../entities/Task';

export interface ITaskRepository {
  create(task: CreateTaskDTO): Promise<void>;
  findById(id: string): Promise<Task>;
  update(id: string, task: Task): Promise<void>;
  delete(id: string): Promise<void>;
  complete(id: string): Promise<void>;
  findAll(completed?: boolean): Promise<Task[]>;
}