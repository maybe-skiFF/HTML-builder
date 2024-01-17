const { stdin, exit } = process;
const fs = require('fs');
const path = require('path');

const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));

console.log('Enter the text to write to the file:');

stdin.on('data', data => {
  data.toString().trim() === 'exit' ? exit(console.log('Data to file text.txt successfully written.')) : writeStream.write(data);
});

process.on('SIGINT', () => exit(console.log('Data to file text.txt successfully written.')));