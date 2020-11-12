import db from "./db";

export default async function add(missions: string[]) {
  const todos = await db.read();
  todos.push({
    title: missions.join(""),
    done: false,
  });
  await db.write(todos);
    console.log(todos)
}
