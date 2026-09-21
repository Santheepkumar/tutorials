import type {
  CreateTask,
  Task,
  UpdateTask,
} from "./task.schema.js";

export interface TaskRepository {
  create(ownerId: string, input: CreateTask): Promise<Task>;
  list(ownerId: string): Promise<Task[]>;
  find(ownerId: string, id: string): Promise<Task | null>;
  update(
    ownerId: string,
    id: string,
    input: UpdateTask,
  ): Promise<Task | null>;
  delete(ownerId: string, id: string): Promise<boolean>;
}
