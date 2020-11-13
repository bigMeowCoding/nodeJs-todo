import inquirer from "inquirer";
import db from "./db";
import { Todo } from "../interface/enity";
import { TodoOperator } from "../interface/todo-operator";

function askForAddTask(todoList: Todo[]) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "请输入任务标题",
      },
    ])
    .then(({ name }) => {
      todoList.push({
        title: name,
        done: false,
      });
      db.write(todoList).then(() => {
        console.log("write success");
      });
    });
}

function updateTaskTitle(todoList: Todo[], index: number) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "请输入新标题",
        default: todoList[index].title,
      },
    ])
    .then(({ name }) => {
      todoList[index].title = name;
      db.write(todoList).then(() => {
        console.log("write success");
      });
    });
}

function markAsUnDone(todoList: Todo[], index: number) {
  todoList[index].done = false;
  db.write(todoList).then(() => {
    console.log("write success");
  });
}

function markAsDone(todoList: Todo[], index: number) {
  todoList[index].done = true;
  db.write(todoList).then(() => {
    console.log("write success");
  });
}

function remove(todoList: Todo[], index: number) {
  todoList.splice(index, 1);
  db.write(todoList).then(() => {
    console.log("write success");
  });
}

function askForOperator(todoList: Todo[], index: number) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "请选择你需要执行的操作",
        choices: [
          { name: "退出", value: TodoOperator.quit },
          {
            name: "标记已完成",
            value: TodoOperator.markAsDone,
          },
          {
            name: "标记未完成",
            value: TodoOperator.markAsUnDone,
          },
          {
            name: "改标题",
            value: TodoOperator.updateTaskTitle,
          },
          { name: "删除", value: TodoOperator.remove },
        ],
      },
    ])
    .then(({ action }) => {
      const actions: any = {
        [TodoOperator.remove]: remove,
        [TodoOperator.markAsDone]: markAsDone,
        [TodoOperator.markAsUnDone]: markAsUnDone,
        [TodoOperator.updateTaskTitle]: updateTaskTitle,
      };
      if (actions[action]) {
        actions[action](todoList, index);
      }
    });
}

function printTasks(todoList: Todo[]) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "index",
        message: "请选择你需要执行的任务",
        choices: [
          { name: "退出", value: "-1" },
          ...todoList.map((item, index) => {
            return {
              name: (item.done ? "[*]" : "[]") + item.title,
              value: index + "",
            };
          }),
          {
            name: "添加任务",
            value: "-2",
          },
        ],
      },
    ])
    .then(({ index }) => {
      index = parseInt(index);
      if (index >= 0) {
        askForOperator(todoList, index);
      } else if (index === -2) {
        askForAddTask(todoList);
      }
    });
}

export default async function showAllTodo() {
  const todoList: Todo[] = await db.read();
  printTasks(todoList);
}
