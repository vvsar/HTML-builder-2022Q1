const fs = require('fs');
const path = require('path');

const initialDirPath = path.join(__dirname, '/styles');
const targetDirPath = path.join(__dirname, '/project-dist');

const writeStream = fs.createWriteStream(targetDirPath + '/bundle.css');

fs.readdir(initialDirPath, { withFileTypes: true }, (error, files) => {
  if (error) {
    return console.log(error);
  }
  files.forEach((file) => {
    const filePath = path.join(initialDirPath, file.name);
    if (path.extname(filePath) === '.css') {
      const readStream = fs.createReadStream(filePath);
      readStream.on('data', (text) => {
        writeStream.write(text);
      });
    }
  });
});