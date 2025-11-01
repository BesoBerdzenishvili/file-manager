# File Manager CLI

A **Node.js Command-Line Interface (CLI)** application that simulates a file manager, allowing users to navigate the file system, perform file operations, view operating system info, calculate file hashes, and compress/decompress files using Brotli.

---

## Getting Started

### 1. Prerequisites

- Node.js version **24.11.0 or higher**
- NPM (comes with Node.js)

### 2. Installation

Clone this repository and install dependencies (if any):

```bash
git clone https://github.com/your-repo/file-manager-cli.git
cd file-manager-cli
```

### 3. Running the Application

Run the app using:

```bash
npm run start -- --username=your_username
```

When started, the program will greet you:

```
Welcome to the File Manager, your_username!
```

The program then enters interactive mode, waiting for your commands.

At all times, the current working directory is displayed:

```
You are currently in path_to_working_directory
```

To exit, press **Ctrl + C** or type `.exit`.
On exit, you'll see:

```
Thank you for using File Manager, your_username, goodbye!
```

---

## Behavior & Error Handling

- The starting directory is your **home directory** (e.g. `C:\Users\YourName` on Windows).

- Invalid commands or arguments display:

  ```
  Invalid input
  ```

- Errors during execution display:

  ```
  Operation failed
  ```

- You **cannot navigate above the root directory** (e.g. `C:\` on Windows).
  If attempted, the current directory remains unchanged.

---

## Commands Overview

### **Navigation & Working Directory (NWD)**

| Command                | Description                                            |
| ---------------------- | ------------------------------------------------------ |
| `up`                   | Go upper from current directory. Does nothing at root. |
| `cd path_to_directory` | Change to a specific directory (relative or absolute). |
| `ls`                   | List all files and folders in the current directory.   |

---

### **File Operations**

| Command                                 | Description                                          |
| --------------------------------------- | ---------------------------------------------------- |
| `cat path_to_file`                      | Read and print file content (using Readable stream). |
| `add new_file_name`                     | Create an empty file in the current directory.       |
| `mkdir new_directory_name`              | Create a new directory.                              |
| `rn path_to_file new_filename`          | Rename file (content unchanged).                     |
| `cp path_to_file path_to_new_directory` | Copy file (using streams).                           |
| `mv path_to_file path_to_new_directory` | Move file (copy + delete original).                  |
| `rm path_to_file`                       | Delete file.                                         |

---

### **Operating System Info**

| Command             | Description                                       |
| ------------------- | ------------------------------------------------- |
| `os --EOL`          | Print system End-Of-Line symbol.                  |
| `os --cpus`         | Print CPU information (model, clock rate, count). |
| `os --homedir`      | Print home directory path.                        |
| `os --username`     | Print current system username.                    |
| `os --architecture` | Print CPU architecture.                           |

---

### **Hash Calculation**

| Command             | Description                                  |
| ------------------- | -------------------------------------------- |
| `hash path_to_file` | Calculate and print SHA256 hash of the file. |

---

### **Compression / Decompression (Brotli)**

| Command                                       | Description                                         |
| --------------------------------------------- | --------------------------------------------------- |
| `compress path_to_file path_to_destination`   | Compress file using Brotli algorithm (Streams API). |
| `decompress path_to_file path_to_destination` | Decompress Brotli-compressed file.                  |

---

## Tech Stack

- **Node.js 24+**
- **Streams API**
- **Brotli Compression**
- **Crypto (for hashing)**
- **OS module**

---
