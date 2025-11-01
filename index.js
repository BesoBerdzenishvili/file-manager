import readline from "node:readline";
import messages from "./constants/messages.js";
import parseArgs from "./utils/parseArgs.js";
import { Navigation } from "./controllers/navigation.controller.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const nav = new Navigation();

function expense_tracker() {
  rl.question(`File-manager: `, (command) => {
    switch (command.split(" ")[0]) {
      case ".exit":
        rl.close();
        break;
      case "up":
        nav.up();
        break;
      case "cd":
        nav.cd(command.split(" ")[1]);
        break;
      case "ls":
        nav.ls();
        break;
      default:
        console.log(messages.error.operation_failed);
        break;
    }
    console.log(messages.info.current_dir(process.cwd()));
    expense_tracker();
  });
}
const username = parseArgs().username || "Anonymous";

console.log(messages.info.welcome(username));
expense_tracker();

rl.on("close", () => {
  console.log(messages.info.goodbye(username));
  process.exit(0);
});
