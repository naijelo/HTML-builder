const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");

const pathToFiles = path.join(__dirname, "styles");
const pathToBundle = path.join(__dirname, "project-dist/bundle.css");

const writeStream = fs.createWriteStream(pathToBundle);

fsPromises.readdir(pathToFiles).then((files) => {
  files.forEach((file) => {
    const pathToFile = path.join(pathToFiles, file);
    const extName = path.extname(pathToFile).slice(1);
    if (extName === "css") {
      const readStream = fs.createReadStream(pathToFile);
      readStream.on("data", (data) => {
        writeStream.write(data.toString() + "\n");
      });
    };
  });
});