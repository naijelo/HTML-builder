const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");
const pathToFile = path.join(__dirname, "/secret-folder");

fs.readdir(pathToFile, {withFileTypes: true}, (err, files) => {
  if (err)
    console.log(err);
  else { 
    files.forEach(file => {
      if(!file.isDirectory()) {
        const extName = path.extname(`${pathToFile}/${file.name}`).slice(1);
        const name = file.name.split(".")[0];
        (async () => {
            let stats = await fsPromises.stat( 
              (`${pathToFile}/${file.name}`));
            console.log(`${name} - ${extName} - ${stats.size}b`);
        })();
      }
    });
  };
});