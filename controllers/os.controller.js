import os from "os";
import messages from "../constants/messages.js";

export default function systemInfo(command) {
  const cmd = command?.trim().toLowerCase();

  switch (cmd) {
    case "--eol": {
      console.log(JSON.stringify(os.EOL));
      break;
    }

    case "--cpus": {
      const cpus = os.cpus();
      const totalCpus = cpus.length;

      console.log(`Overall amount of CPUs: ${totalCpus}`);
      cpus.forEach((cpu, index) => {
        const speedGHz = (cpu.speed / 1000).toFixed(2);
        console.log(`CPU ${index + 1}: ${cpu.model} @ ${speedGHz} GHz`);
      });
      break;
    }

    case "--homedir": {
      console.log(os.homedir());
      break;
    }

    case "--username": {
      console.log(os.userInfo().username);
      break;
    }

    case "--architecture": {
      console.log(os.arch());
      break;
    }

    default: {
      console.log(messages.error.operation_failed);
      break;
    }
  }
}
