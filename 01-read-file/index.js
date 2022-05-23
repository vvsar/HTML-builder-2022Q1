const fs = require('fs');
const path = require('path');

const readStream = fs.createReadStream(path.resolve('01-read-file', 'text.txt'), 'utf8');
readStream.on('data', (data) => console.log(data));
readStream.on('error', (error) => console.log(`Error: ${error}`));
