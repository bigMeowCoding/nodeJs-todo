#!/usr/bin/env node
import { Command } from "commander";
import add from "./utils/add";
import db from "./utils/db";
import showAllList from "./utils/showAllList";
const program = new Command();
program.version("0.0.1");
program
  .option("-d, --debug", "output extra debugging")
  .option("-s, --small", "small pizza size")
  .option("-p, --pizza-type <type>", "flavour of pizza");
program
  .command("add")
  .description("add task")
  .action((cmd, options) => {
    add(options).then(
      () => {
        console.log("add success");
      },
      () => {
        console.log("add fail");
      }
    );
  });
program
  .command("clear")
  .description("clear task")
  .action(() => {
    db.write([]).then(
      () => {
        console.log("add success");
      },
      () => {
        console.log("add fail");
      }
    );
  });
program
  .command("show")
  .description("show task list")
  .action(() => {
    showAllList().then(
      () => {
      },
      () => {
        console.log("show fail");
      }
    );
  });

program.parse(process.argv);
