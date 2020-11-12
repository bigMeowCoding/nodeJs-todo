import {Command} from "commander";
import add from "./utils/add";
const program = new Command();
program.version('0.0.1');
program
    .option('-d, --debug', 'output extra debugging')
    .option('-s, --small', 'small pizza size')
    .option('-p, --pizza-type <type>', 'flavour of pizza');
program
    .command('add')
    .description('add task')
    .action((cmd, options) => {
        add(options)
    });
program.parse(process.argv);

