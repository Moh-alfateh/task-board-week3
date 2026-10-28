# Week 2 Lab Worksheet
Name: mohammedalfateh Ahmed
Program: Software Engineering / Computer Programming
Level I aimed for today: Core / Stretch / Challenge

## Before you run the lie
What do you expect `live done` to print, and why?
I expect `live done:` to print `undefined`. The `as Task` cast only tells TypeScript to treat the data as a Task. It does not change the data. jsonplaceholder returns `{ userId, id, title, completed }`, and there is no `done` field in that object. So at runtime `live.done` has nothing to read, and JavaScript gives `undefined`

## After you run the lie
lecture example, title: undefined
live title: delectus aut autem
live done: undefined
# Why did TypeScript allow this?
TypeScript allowed it because `as Task` is a type assertion. It tells the compiler "trust me, this value is a Task", and the compiler does what it is told without checking. `response.json()` returns data whose shape TypeScript cannot know, because the data only arrives at runtime. So the assertion turned unknown data into a `Task` on paper only. The real object has `completed`, not `done`, so `live.done` is `undefined` when the program runs. TypeScript checks code, not the data coming in from outside

## typecheck
Paste the error from `src/honest.ts` before you comment the line out.

> typecheck
> tsc --noEmit

src/honest.ts:11:7 - error TS2322: Type 'unknown' is not assignable to type '{ title: string; }'.

11 const task: CreateTask = payload;
         ~~~~


Found 1 error in src/honest.ts:11


## Activity 1
What printed for todo 99999?
starting fetch... and then "Request failed with status: 404". The function returned null. The server answered, so there was a response, just not a successful one.

What printed for the dead address (the network error)?
starting fetch... and then "Network error:" followed by the error object (a fetch failed error). No status code was printed, because no server ever answered. The function returned null.

Which of those two did `fetch` throw for?
Only the dead address. For 99999 fetch did not throw: it returned a response with ok set to false, and I had to check response.ok myself. For the dead address there was no response at all, so fetch threw and the catch block ran.

## Activity 3 — Outside feed
Paste the form boundary output (saved / refused lines).
saved: { title: 'Design database schema', status: 'doing', projectId: 1, dueDate: '2026-10-20' }
refused: String must contain at least 1 character(s)
refused: Invalid enum value. Expected 'open' | 'doing' | 'done', received 'finished'
refused: Expected number, received string
refused: Required

Paste the outside-feed output.
starting fetch...
got data
imported: { ok: true, task: { title: 'delectus aut autem', status: 'open', projectId: 1 } }
starting fetch...
Request failed with status: 404
missing todo: null

In one sentence: why was the raw to-do refused by `createTask` even though it has a title?
Because a title is not enough: createTask needs status and projectId too, and the raw to-do has completed, userId and id instead, so it is the wrong shape for a create-task.

## Exit question
Where is the boundary in this program, and what do you trust after the data has crossed it?

The boundary is the place where data enters from outside: the form payloads going into createTask, and the response from fetchTodo going into ExternalTodoSchema.safeParse. Everything before safeParse is unknown and cannot be trusted. After safeParse succeeds, parsed.data and result.data have been checked against the schema at runtime, so I can trust their shape and use them, for example to map completed to done or open.