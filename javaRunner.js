const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs')

function javaRunner(filepath, inputPath) {
  try {
    
    const javaExecutable1 = path.join(__dirname, 'jdk', 'bin', 'javac.exe');
    const codeFilePath = path.join(__dirname,filepath);
    //  const inputFilePath = path.join(__dirname,inputPath);
    const compileOutput = execSync(`${javaExecutable1} ${codeFilePath}`, { encoding: 'utf-8' });
    // console.log(`Compilation output:\n${compileOutput}`);

    // Run the compiled Java class synchronously
    // const className = path.join(__dirname,'temp','main.class');
    const javaExecutable2 = path.join(__dirname, 'jdk', 'bin', 'java.exe');

    const runOutput = execSync(`${javaExecutable2} main `,{ encoding: 'utf-8' } );
    const out = `${runOutput}`;
    todeletefiles("main.class");
    return runOutput;
    
    
    // return runOutput;
  } catch (error) {
    console.error(`Error running Java code: ${error.message}`);
    return error;
  }
}
function todeletefiles(filePath){
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
      return;
    }
    console.log('File deleted successfully');
  });
}



// const out = javaRunner('example.java',"input.txt"); 
// console.log(out);
module.exports = javaRunner;


// const { execSync } = require('child_process');
// const path = require('path');
// const fs = require('fs');

// function javaRunner(filepath, inputFilePath) {
//   try {
//     // Compile the Java code using javac synchronously
//     const javaExecutable1 = path.join(__dirname, 'jdk', 'bin', 'javac.exe'); // Adjust the path as needed
//     const compileOutput = execSync(`${javaExecutable1} ${filepath}`, { encoding: 'utf-8' });
//     console.log(`Compilation output:\n${compileOutput}`);

//     // Run the compiled Java class synchronously
//     const javaExecutable2 = path.join(__dirname, 'jdk', 'bin', 'java.exe');
//     const classFilePath = path.join(__dirname, 'temp', 'main'); // Adjust the path as needed
//     const className = path.basename(filepath, '.java'); // Extract class name from file path
//     const runOutput = execSync(`${javaExecutable2} -cp ${path.join(__dirname, 'temp')} ${className} < ${inputFilePath}`, { encoding: 'utf-8' });
//     console.log(`Java code output:\n${runOutput}`);

//     // Optionally, delete the main.class file after execution
//     todeletefiles(classFilePath);

//     return runOutput;
//   } catch (error) {
//     console.error(`Error running Java code: ${error.message}`);
//     return error;
//   }
// }

// function todeletefiles(filePath) {
//   fs.unlink(filePath, (err) => {
//     if (err) {
//       console.error('Error deleting file:', err);
//       return;
//     }
//     console.log('File deleted successfully');
//   });
// }

// const inputFilePath = path.join(__dirname, 'input.txt'); 
// javaRunner('example.java', inputFilePath); 
// module.exports = javaRunner;

