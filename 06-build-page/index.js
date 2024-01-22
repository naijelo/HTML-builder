const fs = require("fs");
const { rm, mkdir, copyFile, readFile, writeFile } = require("node:fs/promises");
const fsPromises = fs.promises;
const path = require("path");

const pathToDirectory = path.join(__dirname, "project-dist")
const pathToCss = path.join(__dirname, "styles");
const pathToDirectoryCss = path.join(__dirname, "project-dist/style.css");
const writeStream = fs.createWriteStream(pathToDirectoryCss);
const pathToComponents = path.join(__dirname, "components");
const pathToTemplate = path.join(__dirname, "template.html");

(async function createDirectory() {
  await mkdir(pathToDirectory, { recursive: true });
})();

(async function createIndex() {
  const pathToIndex = path.join(pathToDirectory, "index.html");
  await copyFile(pathToTemplate, pathToIndex);

  let indexFile = await readFile(pathToIndex, 'utf-8');
  const components = await fsPromises.readdir(pathToComponents, { recursive: true });

  for (let i = 0; i < components.length; i += 1) {
    const pathToFile = path.join(pathToComponents, components[i]);
    if (path.extname(pathToFile) === ".html") {
      const name = components[i].replace(".html", "");
      const component = await readFile(pathToFile);
      indexFile = indexFile.replace(`{{${name}}}`, component);
    }
  }
  await writeFile(pathToIndex, indexFile);
})();

(async function createCss() {
  fsPromises.readdir(pathToCss).then((files) => {
    files.forEach((file) => {
      const pathToFile = path.join(pathToCss, file);
      const extName = path.extname(pathToFile).slice(1);
      if (extName === "css") {
        const readStream = fs.createReadStream(pathToFile);
        readStream.on("data", (data) => {
          writeStream.write(data.toString() + "\n");
        });
      };
    });
  });
})();

const pathToAssets = path.join(__dirname, "assets");
const pathToDirectoryAssets = path.join(pathToDirectory, "assets");

(async function copyDir(pathToAssets, pathToDirectoryAssets) {
    await rm(pathToDirectoryAssets, {force: true, recursive: true});
    await mkdir(pathToDirectoryAssets, { recursive: true });
    const files = await fsPromises.readdir(pathToAssets, { withFileTypes: true });

    files.forEach((file) => {
      const pathFrom = path.join(pathToAssets, file.name);
      const pathTo = path.join(pathToDirectoryAssets, file.name);
      if (!file.isDirectory()) {
        copyFile(pathFrom, pathTo);
      } else {
        copyDir(pathFrom, pathTo);
      }
    });
})(pathToAssets, pathToDirectoryAssets);