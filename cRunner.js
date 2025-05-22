
const path = require('path');
const fs = require('fs')
function cRunner(filepath, inputPath) {
  const { execSync } = require('child_process');
  const path = require('path');

  try {
    const cExecutable = path.join(__dirname, 'mingw64', 'bin', 'gcc.exe');
    const codeFilePath = path.join(__dirname,filepath);
    const inputFilePath = path.join(__dirname,inputPath);
    const compileOutput = execSync(`${cExecutable} ${codeFilePath} -o ${codeFilePath}.out`, { encoding: 'utf-8' });
     console.log(`Compilation output:\n${compileOutput}`);

    const runOutput = execSync(`${codeFilePath}.out < ${inputFilePath}`, { encoding: 'utf-8' });
    // console.log(`C code output:\n${runOutput}`);
     todeletefiles(filepath);
    return runOutput;
  } catch (error) {
  // console.error(`Error running C code: ${error.message}`);
    return error.message;
  }
}

// Usage example
 
//  const output = cRunner("example.c", "input.txt");
//  console.log(`output is : ${output}`);

 function todeletefiles(filePath){
  fs.unlink(`${filePath}.out`, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
      return;
    }
    console.log('File deleted successfully');
  });
}


module.exports = cRunner;
