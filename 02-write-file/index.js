let fs = require("node:fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

fs.appendFile("file.txt", "", err => {
  if (err) {
    console.error(err);
  }
});
console.log("What do you want to write in this file?");

rl.on("line", line => {
  fs.appendFile('file.txt', line, err => {
    if (err) {
      console.error(err);
    }
  });
}).on("close", () => {
  process.exit(0);
});
