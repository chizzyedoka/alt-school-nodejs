const path = require("path");
const os = require("os");
const process = require("process");
const fs = require("fs");

console.log("Current Working Directory:", process.cwd());
console.log("Separator of the given file path:", path.sep);
console.log("File extension:", path.extname(__filename));
console.log("Process ID of the current running process:", process.pid);
console.log("User information:", os.userInfo());
console.log("Platform of the operating system:", os.platform());
