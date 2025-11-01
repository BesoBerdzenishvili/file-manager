import fs from "fs";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";
import messages from "../constants/messages.js";

const pipelineAsync = promisify(pipeline);

export default class File {
  async read(filePath) {
    try {
      const readStream = fs.createReadStream(filePath, { encoding: "utf8" });

      readStream.on("data", (chunk) => {
        process.stdout.write(chunk);
      });

      return new Promise((resolve, reject) => {
        readStream.on("end", () => {
          console.log();
          resolve();
        });
        readStream.on("error", reject);
      });
    } catch (error) {
      console.log(`${messages.error.operation_failed}: ${error.message}`);
    }
  }

  async add(fileName) {
    try {
      const fileUrl = path.join(process.cwd(), fileName);
      await fs.promises.writeFile(fileUrl, "", { flag: "wx" });
    } catch (error) {
      console.log(`${messages.error.operation_failed}: ${error.message}`);
    }
  }

  async mkdir(dirName) {
    try {
      const dirUrl = path.join(process.cwd(), dirName);
      await fs.promises.mkdir(dirUrl);
    } catch (error) {
      console.log(`${messages.error.operation_failed}: ${error.message}`);
    }
  }

  async rename(oldUrl, newFileName) {
    try {
      const dirName = path.dirname(oldUrl);
      const newUrl = path.join(dirName, newFileName);

      await fs.promises.rename(oldUrl, newUrl);
    } catch (error) {
      console.log(`${messages.error.operation_failed}: ${error.message}`);
    }
  }

  async copy(sourcePath, destPath) {
    try {
      await fs.promises.access(sourcePath);
      let destUrl = destPath;

      try {
        const stats = await fs.promises.stat(destPath);
        if (stats.isDirectory()) {
          const fileName = path.basename(sourcePath);
          destUrl = path.join(destPath, fileName);
        }
      } catch (error) {
        console.log(`${messages.error.operation_failed}: ${error.message}`);
      }

      const readStream = fs.createReadStream(sourcePath);
      const writeStream = fs.createWriteStream(destUrl);

      await pipelineAsync(readStream, writeStream);
    } catch (error) {
      console.log(`${messages.error.operation_failed}: ${error.message}`);
    }
  }

  async move(sourcePath, destPath) {
    try {
      await this.copy(sourcePath, destPath);
      await fs.promises.unlink(sourcePath);
    } catch (error) {
      console.log(`${messages.error.operation_failed}: ${error.message}`);
    }
  }

  async remove(filePath) {
    try {
      await fs.promises.unlink(filePath);
    } catch (error) {
      console.log(`${messages.error.operation_failed}: ${error.message}`);
    }
  }
}
