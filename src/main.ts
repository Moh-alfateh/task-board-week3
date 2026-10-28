import { fetchTodo } from "./api.ts";
import { createTask } from "./createTask.ts";
import { ExternalTodoSchema } from "./schemas.ts";

const formPayloads: unknown[] = [
  {
    title: "Design database schema",
    status: "doing",
    projectId: 1,
    dueDate: "2026-10-20",
  },
  { title: "", status: "open", projectId: 1 },
  { title: "Prepare demo", status: "finished", projectId: 1 },
  { title: "Write tests", status: "open", projectId: "1" },
  { status: "open", projectId: 1 },
];

console.log("— form boundary —");
for (const payload of formPayloads) {
  const result = createTask(payload);
  if (result.ok) {
    console.log("saved:", result.task);
  } else {
    console.log("refused:", result.error);
  }
}

console.log("— outside feed —");
const raw: unknown = await fetchTodo(1);
const parsed = ExternalTodoSchema.safeParse(raw);
if (!parsed.success) {
  console.log("feed refused");
} else {
  const imported = createTask({
    title: parsed.data.title,
    status: parsed.data.completed ? "done" : "open",
    projectId: 1,
  });
  console.log("imported:", imported);
}
console.log("missing todo:", await fetchTodo(99999));