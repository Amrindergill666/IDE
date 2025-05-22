
// function pythonRunner(filepath){
//   const { exec } = require('child_process');
//   let output;
//   const pythonProcess = exec(`python ${filepath}`, (error, stdout, stderr) => {
//     if (error) {
       //  console.error(`Error executing Python script: ${error.message}`);
//        output = error;
//        console.log(`error is : ${output}`);
//       return;
//     }
//     else{
//       output = stdout;
    // console.log(`Python script stdout:\n${stdout}`);
//     console.log(`Output is : ${output}`);
//     }
    
//   });
  
  // Handle process exit
//   pythonProcess.on('exit', (code) => {
//     console.log(`Python script exited with code ${code}`);
//   });
  
// }

function pythonRunner(filepath,inputPath) {
  const { execSync } = require('child_process');
  const path = require('path');

  try {
    // Execute Python script synchronously
    const pythonExecutable = path.join(__dirname, 'Python310', 'python.exe');
    const codeFilePath = path.join(__dirname,filepath);
    const inputFilePath = path.join(__dirname,inputPath);
    const output = execSync(` ${pythonExecutable} ${codeFilePath}<${inputFilePath}`, { encoding: 'utf-8' });
    console.log(`Output is : ${output}`);
    // Return the output
    return output;
  } catch (error) {
    // Handle errors
    console.error(`Error executing Python script: ${error.message}`);
    return error.stderr;
  }
}
// pythonRunner("example.py");

module.exports = pythonRunner;