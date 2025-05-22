const path = require('path');
const fs = require('fs')
function cppRunner(filepath, inputPath) {
  const { execSync } = require('child_process');
  const path = require('path');

  try {
    const cExecutable = path.join(__dirname, 'mingw64', 'bin', 'g++.exe');
    const codeFilePath = path.join(__dirname,filepath);
    const inputFilePath = path.join(__dirname,inputPath);
    const compileOutput = execSync(`${cExecutable} ${codeFilePath} -o ${codeFilePath}.out`, { encoding: 'utf-8' });
    console.log(`Compilation output:\n${compileOutput}`);

    const runOutput = execSync(`${codeFilePath}.out < ${inputFilePath}`, { encoding: 'utf-8' });
    console.log(`C code output:\n${runOutput}`);
    todeletefiles(codeFilePath);
    return runOutput;
  } catch (error) {
  // console.error(`Error running C code: ${error.message}`);
    return error.message;
  }
}

function todeletefiles(filePath){
    fs.unlink(`${filePath}.out`, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return;
      }
      console.log('File deleted successfully');
    });
  }
//   const inputFilePath = path.join(__dirname, 'input.txt'); 

//   const output = cppRunner("example.cpp", inputFilePath);
//   console.log(`output is : ${output}`);

// const path = require('path');

// function cppRunner(filepath, inputFilePath) {
//     const { execSync } = require('child_process');
//     const path = require('path');
  
//     try {
//       // Compile the C++ code using g++ synchronously
//       const cppExecutable = path.join(__dirname, 'mingw64', 'bin', 'g++.exe');
//       const compileOutput = execSync(`${cppExecutable} ${filepath} 2>&1`);
//       console.log(`Compilation output:\n${compileOutput}`);
  
//       // Run the compiled executable synchronously using 'cat' for input redirection on Unix-like systems
//       // On Windows, you might need to use 'type' instead of 'cat'
      
//       const runOutput = execSync('a.exe', { encoding: 'utf-8' });
//       console.log(`C++ code output:\n${runOutput}`);
  
//       return runOutput;
//     } catch (error) {
//       console.error(`Error running C++ code: ${error.message}`);
//       return error;
//     }
//   }
  
//   // Usage example
//   const inputFilePath = path.join(__dirname, 'input.txt'); // Adjust the input file path as needed
//   cppRunner('example.cpp', inputFilePath);
  
  





  





module.exports = cppRunner;