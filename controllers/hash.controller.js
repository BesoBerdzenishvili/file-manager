import { join } from "path";
import { createHash } from "crypto";
import { readFile } from "fs/promises";
import messages from "../constants/messages.js";

export default class Hash {
  async file(filename) {
    try {
      const filePath = join(process.cwd(), filename);
      const fileBuffer = await readFile(filePath);

      const hash = createHash(sha256);
      hash.update(fileBuffer);
      const hexHash = hash.digest("hex");

      console.log(hexHash);
    } catch (error) {
      console.log(messages.error.operation_failed, error.message);
    }
  }
}
