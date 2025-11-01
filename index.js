import readline from "node:readline";
import parseArgs from "./utils/parseArgs.js";
import messages from "./constants/messages.js";
import File from "./controllers/file.controller.js";
import Hash from "./controllers/hash.controller.js";
import systemInfo from "./controllers/os.controller.js";
import Compression from "./controllers/compression.controller.js";
import { Navigation } from "./controllers/navigation.controller.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const nav = new Navigation();
const file = new File();
const hash = new Hash();
const compression = new Compression();

const currentDir = () => messages.info.current_dir(process.cwd());

function expense_tracker() {
  rl.question(`File-manager: `, async (command) => {
    const argOne = command.split(" ")[1];
    const argTwo = command.split(" ")[2];
    switch (command.split(" ")[0]) {
      case ".exit":
        rl.close();
        break;
      case "up":
        nav.up();
        break;
      case "cd":
        nav.cd(argOne);
        break;
      case "ls":
        nav.ls();
        break;
      case "read":
        await file.read(argOne);
        break;
      case "add":
        await file.add(argOne);
        break;
      case "mkdir":
        await file.mkdir(argOne);
        break;
      case "rename":
        await file.rename(argOne, argTwo);
        break;
      case "copy":
        await file.copy(argOne, argTwo);
        break;
      case "move":
        await file.move(argOne, argTwo);
        break;
      case "remove":
        await file.remove(argOne);
        break;
      case "os":
        systemInfo(argOne);
        break;
      case "hash":
        await hash.file(argOne);
        break;
      case "compress":
        await compression.compress(argOne, argTwo);
        break;
      case "decompress":
        await compression.decompress(argOne, argTwo);
        break;
      default:
        console.log(messages.error.operation_failed);
        break;
    }
    console.log(currentDir());
    expense_tracker();
  });
}
const username = parseArgs().username || "Anonymous";

console.log(messages.info.welcome(username));
console.log(currentDir());
expense_tracker();

rl.on("close", () => {
  console.log(messages.info.goodbye(username));
  process.exit(0);
});
