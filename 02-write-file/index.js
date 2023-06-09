const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const welcome = 'Hello! Please type your text below (to quit, type "exit" or press Ctrl^C)\n';
const farewell = 'Thank you! Have a nice day!\n';

const rl = readline.createInterface({ input, output });
const writer = fs.createWriteStream(path.join(__dirname, 'text.txt'));

process.on('exit', () => {
  output.write(farewell);
});

process.on('SIGINT', () => {
  process.exit();
});

output.write(welcome);

rl.on('line', (text) => {
  if (text.toString().trim() === 'exit') {
    process.exit();
  }
  writer.write(`${text}\n`);
});