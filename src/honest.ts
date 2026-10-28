import type { CreateTask } from "./schemas.ts";

const payload: unknown = {
  title: "Design database schema",
  status: "open",
  projectId: 1,
};

// Run `npm run typecheck` and read the error.
// Then comment out the next two lines so the project typechecks.
const task: CreateTask = payload;
console.log(task.title);
