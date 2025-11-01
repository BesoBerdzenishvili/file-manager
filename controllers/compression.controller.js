import fs from "fs";
import path from "path";
import { pipeline } from "stream/promises";
import messages from "../constants/messages.js";
import detectPlatform from "../utils/platform.js";
import { createBrotliCompress, createBrotliDecompress } from "zlib";

export default class Compression {
  constructor() {
    this.platform = detectPlatform();
  }

  normalizePath(p) {
    return this.platform === "windows"
      ? path.win32.normalize(p)
      : path.posix.normalize(p);
  }

  async compress(target, destination) {
    try {
      const src = this.normalizePath(target);
      let dest = this.normalizePath(destination);

      const destDir = fs.existsSync(dest) ? fs.statSync(dest) : null;
      if (destDir && destDir.isDirectory()) {
        const name = path.basename(src);
        dest = path.join(dest, `${name}.br`);
      }

      await pipeline(
        fs.createReadStream(src),
        createBrotliCompress(),
        fs.createWriteStream(dest)
      );
    } catch (err) {
      console.log(messages.error.operation_failed, err.message);
    }
  }

  async decompress(target, destination) {
    try {
      const src = this.normalizePath(target);
      let dest = this.normalizePath(destination);

      const destDir = fs.existsSync(dest) ? fs.statSync(dest) : null;
      if (destDir && destDir.isDirectory()) {
        const name = path.basename(src, ".br");
        dest = path.join(dest, name);
      }

      await pipeline(
        fs.createReadStream(src),
        createBrotliDecompress(),
        fs.createWriteStream(dest)
      );
    } catch (err) {
      console.log(messages.error.operation_failed, err.message);
    }
  }
}
