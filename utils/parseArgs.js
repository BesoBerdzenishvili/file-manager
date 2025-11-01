export default function parseArgs() {
  const args = process.argv.slice(2);
  const parsedArgs = {};

  args.forEach((arg) => {
    if (arg.startsWith("--")) {
      const [key, value] = arg.slice(2).split("=");
      parsedArgs[key] = value || false;
    }
  });

  return parsedArgs;
}
