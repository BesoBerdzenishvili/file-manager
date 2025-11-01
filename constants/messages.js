const messages = {
  info: {
    welcome: (username) => `Welcome to the File Manager, ${username}!`,
    goodbye: (username) =>
      `Thank you for using File Manager, ${username}, goodbye!`,
    current_dir: (path_to_working_directory) =>
      `You are currently in ${path_to_working_directory}`,
  },
  error: {
    invalid_input: "Invalid input",
    operation_failed: "Operation failed",
  },
};

export default messages;
