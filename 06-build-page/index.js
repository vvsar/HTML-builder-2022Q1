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

// const HTMLWriteStream = fs.createWriteStream(targetDirPath + '/index.html');
const templatePath = path.join(__dirname, '/template.html');
const targetHTMLPath = path.join(targetDirPath, '/index.html');

fs.readFile(templatePath, (error, data) => {
  if (error) {
    console.log(error);
    return;
  }
  const HTMLArray = data.toString().split(/{{|}}/);

  for (let i = 0; i < HTMLArray.length; i++) {
    if (i % 2 === 0) {
      // console.log(HTMLArray[i]);
      fs.appendFile(targetHTMLPath, HTMLArray[i], (error) => {
        if (error) {
          return console.log(error);
        }
      });
    } else {
      const componentPath = path.join(__dirname, `/components/${HTMLArray[i]}.html`);
    
      fs.readFile(componentPath, (error, data) => {
        if (error) {
          console.log(error);
          return;
        }
        // console.log(data.toString());
        fs.appendFile(targetHTMLPath, data.toString(), (error) => {
          if (error) {
            return console.log(error);
          }
        });
      });
    }
  }
});


// fs.readFile(templatePath, (error, data) => {
//   if (error) {
//     console.log(error);
//     return;
//   }
//   const HTMLArray = data.toString().split(/{{|}}/);

//   for (let i = 0; i < HTMLArray.length; i++) {
//     if (i % 2 === 0) {
//       HTMLWriteStream.write(HTMLArray[i]);
//     } else {
//       const componentPath = path.join(__dirname, `/components/${HTMLArray[i]}.html`);
    
//       fs.readFile(componentPath, (error, data) => {
//         if (error) {
//           console.log(error);
//           return;
//         }
     
//         HTMLWriteStream.write(data);
//       });
//     }
//   }
// });







  
  
   
    



