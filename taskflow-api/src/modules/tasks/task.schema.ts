import { Type, type Static } from "@sinclair/typebox";

export const TaskSchema = Type.Object({
  id: Type.String(),
  title: Type.String(),
  done: Type.Boolean(),
  ownerId: Type.String(),
  createdAt: Type.String({ format: "date-time" }),
});

export const CreateTaskSchema = Type.Object({
  title: Type.String({ minLength: 1, maxLength: 120 }),
});

export const UpdateTaskSchema = Type.Partial(
  Type.Object({
    title: Type.String({ minLength: 1, maxLength: 120 }),
    done: Type.Boolean(),
  }),
);

export type Task = Static<typeof TaskSchema>;
export type CreateTask = Static<typeof CreateTaskSchema>;
export type UpdateTask = Static<typeof UpdateTaskSchema>;
