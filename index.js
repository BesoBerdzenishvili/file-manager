import readline from "node:readline";
import messages from "./constants/messages.js";
import parseArgs from "./utils/parseArgs.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function expense_tracker() {
  rl.question(`File-manager: `, (command) => {
    switch (command.split(" ")[0]) {
      case ".exit":
        rl.close();
        break;
      default:
        console.log(messages.error.operation_failed);
        break;
    }
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
