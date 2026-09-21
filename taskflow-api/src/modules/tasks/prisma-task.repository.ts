import type { PrismaClient } from "@prisma/client";
import type {
  CreateTask,
  Task,
  UpdateTask,
} from "./task.schema.js";
import type { TaskRepository } from "./task.repository.js";

const toTask = (task: {
  id: string;
  title: string;
  done: boolean;
  ownerId: string;
  createdAt: Date;
}): Task => ({
  ...task,
  createdAt: task.createdAt.toISOString(),
});

export class PrismaTaskRepository
implements TaskRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(
    ownerId: string,
    input: CreateTask,
  ): Promise<Task> {
    return toTask(await this.prisma.task.create({
      data: { ownerId, title: input.title.trim() },
    }));
  }

  async list(ownerId: string): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      where: { ownerId },
      orderBy: { createdAt: "desc" },
    });
    return tasks.map(toTask);
  }

  async find(
    ownerId: string,
    id: string,
  ): Promise<Task | null> {
    const task = await this.prisma.task.findFirst({
      where: { id, ownerId },
    });
    return task ? toTask(task) : null;
  }

  async update(
    ownerId: string,
    id: string,
    input: UpdateTask,
  ): Promise<Task | null> {
    if (!(await this.find(ownerId, id))) return null;
    const task = await this.prisma.task.update({
      where: { id },
      data: input,
    });
    return toTask(task);
  }

  async delete(
    ownerId: string,
    id: string,
  ): Promise<boolean> {
    if (!(await this.find(ownerId, id))) return false;
    await this.prisma.task.delete({ where: { id } });
    return true;
  }
}
