const path = require("path");
const os = require("os");
const process = require("process");
const fs = require("fs");

// Task 1 create directory named "students"
const folderName = "Students";
if (!fs.existsSync(path.join(__dirname, folderName))) {
  fs.mkdirSync(folderName);
  console.log(`"${folderName} directory" created successfully`);
} else {
  console.log(`"${folderName}" folder already exists`);
}

// Task 2 create file "user" in students directory
let fileName = "user.js";
// check if fileName doesn't exists
if (!fs.existsSync(path.join(__dirname, folderName, fileName))) {
  fs.writeFileSync(path.join(__dirname, folderName, fileName), "");
  console.log(`File "${fileName}" created succesfully`);
} else console.log(`"${fileName}" file already exists`);

// Task 3: Update "Students" directory to "Names"
const oldName = "Students";
const newName = "Names";
if (!fs.existsSync(path.join(__dirname, newName))) {
  fs.renameSync(oldName, newName, (err) => {
    if (err) {
      console.error("Error renaming the directory:", err);
      return;
    }
    console.log(`Directory renamed to "Names" successfully.`);
  });
} else console.log(`"${newName} Path already exists"`);

// Task 4: Add your name as content to the file "user.js"
const nameContent = "Edoka Chisom";
const filePath = path.join(__dirname, newName, fileName);

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}
ensureDirectoryExistence(filePath);
fs.writeFileSync(filePath, nameContent);

// Task 5: Update the file and add your personal information
const personalInfo = {
  age: 10,
  sex: "Male",
  nationality: "Nigerian",
  phoneNumber: "+2349092480",
};

fs.appendFileSync(
  path.join(newName, fileName),
  "\n\n\nPersonal Information: " + JSON.stringify(personalInfo)
);

console.log("Personal information added to the file successfully.");

// task 6 Update the file user.js to {your_name}.js
const oldFileName = "./Names/user.js";
const newFileName = "./Names/edoka_chisom.js";
if (!fs.existsSync(newFileName)) {
  fs.renameSync(oldFileName, newFileName, (err) => {
    if (err) {
      console.error("Error renaming the directory:", err);
      return;
    }
    console.log(`File renamed to "${newFileName}" successfully.`);
  });
} else console.log(`"${newFileName} Path already exists"`);

// task 7 Read the contents from {your_name}.js
const data = fs.readFileSync(newFileName, { encoding: "utf8", flag: "r" });
console.log(data);

// task 8 Delete the file {your_name}.js
fs.rmSync(newFileName);
console.log('Successfully deleted "edoka-chisom.js" file');

// task 9 Delete the directory “Names”
fs.rmdirSync("./Names");
console.log('Successfully deleted "Names" folder');
