const path = require('path');
const { readdir } = require('fs/promises');
const { stat } = require('fs');

const pathOfDir = path.resolve(__dirname, 'secret-folder');

async function logFilesOnDir() {
  let filesOnDir = await readdir(pathOfDir, {withFileTypes: true});

  filesOnDir.forEach(file => {
    let fileName = path.basename(file.name.split('.')[0]);
    let fileExt = path.extname(file.name);
    let filePath = path.join(pathOfDir, file.name);
    
    if(!file.isDirectory()) {
      stat(filePath, (_, stats) => {
        let fileSize = stats.size;
        let fileLogRes = `${fileName} - ${fileExt.slice(1)} - ${fileSize}b`;
        fileSize = stats.size;
        console.log(fileLogRes)
      })
    }
  })
}

logFilesOnDir();