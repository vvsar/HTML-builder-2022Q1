const fs = require('fs');
const path = require('path');

const targetDirPath = path.join(__dirname, '/project-dist');
fs.mkdir(targetDirPath, { recursive: true }, (error) => {
  if (error) {
    return console.log(error);
  }
});

const oldAssetsDirPath = path.join(__dirname, '/assets');
const newAssetsDirPath = path.join(targetDirPath, '/assets');
fs.mkdir(newAssetsDirPath, { recursive: true }, (error) => {
  if (error) {
    return console.log(error);
  }
});
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
copyDir(oldAssetsDirPath, newAssetsDirPath);

const CSSWriteStream = fs.createWriteStream(targetDirPath + '/style.css');
const stylesDirPath = path.join(__dirname, '/styles');
fs.readdir(stylesDirPath, { withFileTypes: true }, (error, files) => {
  if (error) {
    return console.log(error);
  }
  files.forEach((file) => {
    const filePath = path.join(stylesDirPath, file.name);
    if (path.extname(filePath) === '.css') {
      const readStream = fs.createReadStream(filePath);
      readStream.on('data', (text) => {
        CSSWriteStream.write(text);
      });
    }
  });
});

const templatePath = path.join(__dirname, '/template.html');
const targetHTMLPath = path.join(targetDirPath, '/index.html');

fs.readFile(templatePath, 'utf-8', (error, data) => {
  if (error) {
    console.log(error);
    return;
  }
  let templateData = data;
  const tagsToReplace = data.match(/{{\w+}}/gm);

  for (let tag of tagsToReplace) {
    const tagPath = path.join(__dirname, '/components', `${tag.slice(2, -2)}.html`,);

    fs.readFile(tagPath, 'utf-8', (error, tagData) => {
      if (error) console.log(error);

      templateData = templateData.replace(tag, tagData);
      const indexHTMLWriteStream = fs.createWriteStream(targetHTMLPath);
      indexHTMLWriteStream.write(templateData);
    });
  }
});