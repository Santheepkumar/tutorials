import { NotFoundError } from "../../shared/errors.js";
import type {
  CreateTask,
  UpdateTask,
} from "./task.schema.js";
import type { TaskRepository } from "./task.repository.js";

export class TaskService {
  constructor(private readonly repo: TaskRepository) {}

  create(ownerId: string, input: CreateTask) {
    return this.repo.create(ownerId, input);
  }

  list(ownerId: string) {
    return this.repo.list(ownerId);
  }

  async update(
    ownerId: string,
    id: string,
    input: UpdateTask,
  ) {
    const task = await this.repo.update(ownerId, id, input);
    if (!task) throw new NotFoundError("Task");
    return task;
  }

  async delete(ownerId: string, id: string) {
    if (!(await this.repo.delete(ownerId, id))) {
      throw new NotFoundError("Task");
    }
  }
}
