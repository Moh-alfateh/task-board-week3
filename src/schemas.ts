import { z } from "zod";

export const CreateTaskSchema = z.object({
  title: z.string().min(1),
  status: z.enum(["open", "doing", "done"]),
  projectId: z.number(),
  dueDate: z.string().optional(),
});

export type CreateTask = z.infer<typeof CreateTaskSchema>;

export const ExternalTodoSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
});