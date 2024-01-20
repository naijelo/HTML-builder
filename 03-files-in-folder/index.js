const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");
const pathToFile = "./03-files-in-folder/secret-folder";

fs.readdir(pathToFile, {withFileTypes: true}, (err, files) => {
  if (err)
    console.log(err);
  else { 
    files.forEach(file => {
      const extName = path.extname(`${pathToFile}/${file.name}`).slice(1);
      const name = file.name.split(".")[0];
      (async () => {
        try {
          let stats = await fsPromises.stat( 
            (`${pathToFile}/${file.name}`));
          console.log(`${name} - ${extName} - ${stats.size}b`);
        }
        catch (error) {
          console.log(error);
        }
      })();
    });
  };
});