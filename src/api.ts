export async function fetchTodo(id: number): Promise<unknown> {
  console.log("starting fetch...");
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    if (!response.ok) {
      console.log("Request failed with status:", response.status);
      return null;
    }
    const data: unknown = await response.json();
    console.log("got data");
    return data;
  } catch (error) {
    console.log("Network error:", error);
    return null;
  }
}
await fetchTodo(99999);
await fetchTodo(1);