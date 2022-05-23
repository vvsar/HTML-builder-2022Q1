const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, '/secret-folder'), { withFileTypes: true }, (error, files) => {
  if (error) {
    console.log(error);
  }
  files.forEach(file => {
    if (file.isFile()) {
      const filePath = path.resolve(`${__dirname}/secret-folder`, file.name);
      fs.stat(filePath, (error, file) => {
        if (error) {
          console.log(error);
        }
        console.log(`${path.basename(filePath, path.extname(filePath))} - ${path.extname(filePath).slice(1)} - ${file.size / 1024}kb`);
      });
    }
  });
});