import { randomUUID } from "node:crypto";
import type {
  CreateTask,
  Task,
  UpdateTask,
} from "./task.schema.js";
import type { TaskRepository } from "./task.repository.js";

export class MemoryTaskRepository
implements TaskRepository {
  private readonly tasks = new Map<string, Task>();

  async create(
    ownerId: string,
    input: CreateTask,
  ): Promise<Task> {
    const task: Task = {
      id: randomUUID(),
      title: input.title.trim(),
      done: false,
      ownerId,
      createdAt: new Date().toISOString(),
    };
    this.tasks.set(task.id, task);
    return task;
  }

  async list(ownerId: string): Promise<Task[]> {
    return [...this.tasks.values()].filter(
      (task) => task.ownerId === ownerId,
    );
  }

  async find(
    ownerId: string,
    id: string,
  ): Promise<Task | null> {
    const task = this.tasks.get(id);
    return task?.ownerId === ownerId ? task : null;
  }

  async update(
    ownerId: string,
    id: string,
    input: UpdateTask,
  ): Promise<Task | null> {
    const task = await this.find(ownerId, id);
    if (!task) return null;
    const updated = {
      ...task,
      ...input,
      title: input.title?.trim() ?? task.title,
    };
    this.tasks.set(id, updated);
    return updated;
  }

  async delete(
    ownerId: string,
    id: string,
  ): Promise<boolean> {
    if (!(await this.find(ownerId, id))) return false;
    return this.tasks.delete(id);
  }
}
