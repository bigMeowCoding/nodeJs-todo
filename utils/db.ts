import path from "path";
import fs from "fs";
import { Todo } from "../interface/enity";
const home = process.env.HOME || "";
const todoPath = path.join(home, "todos");

export default {
  read(path = todoPath): Promise<Todo[]> {
    return new Promise((resolve, reject) => {
      fs.readFile(path, { flag: "a+" }, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        let todos;
        try {
          todos = JSON.parse(data.toString());
        } catch (e) {
          todos = [];
        }
        resolve(todos);
      });
    });
  },
  write(todos: Todo[], path = todoPath) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, JSON.stringify(todos) + "\n", (writeError) => {
        if (writeError) {
          reject(writeError);
        }
        resolve();
      });
    });
  },
};
