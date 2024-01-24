let fs = require("node:fs");
const readline = require("readline");
const path = require("path");

const pathToFile = path.join(__dirname, "text.txt");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function sendFarewell() {
  console.log("Good bye, my friend!");
  process.exit(0);
}

fs.appendFile(pathToFile, "", err => {
  if (err) {
    console.error(err);
  }
});
console.log("What do you want to write in this file?");

rl.on("line", line => {
  if (line.toLowerCase() === "exit") {
    sendFarewell();
  }
  fs.appendFile(pathToFile, line, err => {
    if (err) {
      console.error(err);
    }
  });
}).on("close", () => {
  sendFarewell();
});
