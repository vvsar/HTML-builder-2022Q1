const fs = require('fs');
const path = require('path');

const oldDirPath = path.join(__dirname, '/files');
const newDirPath = path.join(__dirname, '/files-copy');

function copyDir(oldPath, newPath) {
  fs.mkdir(newPath, { recursive: true }, (error) => {
    if (error) {
      return console.log(error);
    }
  });
  fs.readdir(oldPath, { withFileTypes: true }, (error, files) => {
    if (error) {
      return console.log(error);
    }
    files.forEach((file) => {
      const oldFilePath = path.join(oldPath, file.name);
      const newFilePath = path.join(newPath, file.name);
      if (file.isFile()) {
        fs.copyFile(oldFilePath, newFilePath, (error) => {
          if (error) {
            return console.log(error);
          }
        });
      }
      if (file.isDirectory()) {
        copyDir(oldFilePath, newFilePath);
      }
    });
  });
}
copyDir(oldDirPath, newDirPath);