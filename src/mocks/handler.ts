// src/mocks/handlers.ts
import { http, HttpResponse } from "msw";

export type Todo = {
  id: number;
  name?: string;
};

const todos: Todo[] = [
  { id: 1, name: "할일1" },
  { id: 2, name: "할일2" },
  { id: 3, name: "할일3" },
];

export const handlers = [
  // GET요청
  http.get("/todos", () => {
    return HttpResponse.json(todos, {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
  // POST 요청
  http.post("/todos", async ({ request }) => {
    const { content } = (await request.json()) as { content: string };
    const newTodo = { id: todos.length + 1, content };
    todos.push(newTodo);
    return HttpResponse.json(todos, { status: 201 });
  }),
];
