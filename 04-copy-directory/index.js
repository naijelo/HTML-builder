const fs = require("fs");
const { mkdir, rm, copyFile } = require("node:fs/promises");
const path = require("path");
const pathToFile = path.join(__dirname, "/files");
const pathToNewFolder = path.join(__dirname, "/files-copy");

(async function copyDir() {
  await rm(pathToNewFolder, {force: true, recursive: true});
  await mkdir(pathToNewFolder, { recursive: true });
  fs.readdir(pathToFile, {withFileTypes: true}, (err, files) => {
    if (err)
      console.log(err);
    else { 
      files.forEach(file => {
        if(!file.isDirectory()) {
          copyFile(`${pathToFile}/${file.name}`, `${pathToNewFolder}/${file.name}`);
        }
      });
    };
  });
})();