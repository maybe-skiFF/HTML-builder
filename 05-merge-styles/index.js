const path = require('path');
const { readdir } = require('fs/promises');
const fs = require('fs');

const pathStylesDir = path.resolve(__dirname, 'styles');
const pathDistDir = path.resolve(__dirname, 'project-dist/bundle.css');


async function mergeStylesHandler() {
  let styleFiles = await readdir(pathStylesDir, {withFileTypes: true});
  let writeStream = fs.createWriteStream(pathDistDir)

  styleFiles.forEach(async file => {
    let fileExt = path.extname(file.name);
    let readStream = fs.createReadStream(path.join(pathStylesDir, file.name), 'utf-8');
    
    if (fileExt === '.css') {
      readStream.on('data', data => {
        writeStream.write(data)
      });
    }
  })
}

mergeStylesHandler();