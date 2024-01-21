const path = require('path');
const { readdir, copyFile } = require('fs/promises');
const fs = require('fs');

const pathFiles = path.resolve(__dirname, 'files');
const pathCopyFiles = path.resolve(__dirname, 'files-copy');

fs.mkdir(pathCopyFiles, { recursive: true }, error => {
  if (error) {
    throw error;
  }
});

async function copyFilesHandler() {
  let filesInFilesFolder = await readdir(pathFiles);
  let filesInCopyFilesFolder = await readdir(pathCopyFiles);

  filesInCopyFilesFolder.forEach(file => {
    let pathToFilesCopyDir = path.resolve(pathCopyFiles, file);

    fs.unlink(pathToFilesCopyDir, error => {
      if (error) {
        throw error;
      }
    });
  })

  filesInFilesFolder.forEach(file => {
    let pathToFilesDir = path.resolve(pathFiles, file);
    let pathToFilesCopyDir = path.resolve(pathCopyFiles, file);

    copyFile(pathToFilesDir, pathToFilesCopyDir);
  });
}

copyFilesHandler();