import os from "os";
import fs from "fs";
import path from "path";
import messages from "../constants/messages.js";

export class Navigation {
  constructor() {
    this.currentDir = os.homedir();
  }

  up() {
    const parentUrl = path.dirname(this.currentDir);

    if (parentUrl !== this.currentDir) {
      this.currentDir = parentUrl;
      process.chdir(this.currentDir);
    }
  }

  cd(targetUrl) {
    const newPath = path.isAbsolute(targetUrl)
      ? targetUrl
      : path.resolve(this.currentDir, targetUrl);

    if (fs.existsSync(newPath) && fs.lstatSync(newPath).isDirectory()) {
      this.currentDir = newPath;
      process.chdir(this.currentDir);
    } else {
      console.error(
        `${messages.error.invalid_input} - No such directory: ${newPath}`
      );
    }
  }

  ls() {
    try {
      const contents = fs.readdirSync(this.currentDir, { withFileTypes: true });

      const folders = [];
      const files = [];

      for (const content of contents) {
        if (content.isDirectory()) {
          folders.push(content.name);
        } else {
          files.push(content.name);
        }
      }

      folders.sort((a, b) =>
        a.localeCompare(b, undefined, { sensitivity: "base" })
      );
      files.sort((a, b) =>
        a.localeCompare(b, undefined, { sensitivity: "base" })
      );

      console.log(`\nContents of ${this.currentDir}`);
      console.table([
        ...folders.map((name) => ({ Name: name, Type: "Directory" })),
        ...files.map((name) => ({ Name: name, Type: "File" })),
      ]);
    } catch (err) {
      console.error(`${messages.error.operation_failed}: ${err.message}`);
    }
  }
}
