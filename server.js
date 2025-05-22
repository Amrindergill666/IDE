const express = require('express')
const fs = require('fs')
const async = require('async')
const pythonRunner = require("./pythonRunner");
const cRunner = require("./cRunner");
const cppRunner = require("./cppRunner");
const javaRunner = require("./javaRunner");
const path = require('path');
const app = express()
const randomstring = require("randomstring");
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 5000;
app.use(bodyParser.json());
app.use(cors()); 

app.listen(PORT, () => {
  console.log(`Server is runnings on http://localhost:${PORT}`);
});

let language;
let code;
let input;
let filepath;
 output = "...loading...";

app.post('/api/data', async(req, res) => {
  dataFromClient = req.body;
     console.log(output);
    language = dataFromClient.language;
    code = dataFromClient.code;
    input = dataFromClient.input;
    console.log('Data received from client:', dataFromClient);
    
    const randomString = randomstring.generate(7);
    const inputFilePath = `${randomString}.txt`;
    const codeFilePath = `${randomString}.${language}`;
    // const codeFilePath = `temp',${randomString}.${language}`;
    
    const codeFileWrite = fs.writeFileSync(`${randomString}.${language}`,code);
    const inputFileWrite = fs.writeFileSync(`${randomString}.txt`,input);
    output = await compile(language,codeFilePath,inputFilePath);
    todeletefiles(`${randomString}.${language}`);
    todeletefiles(`${randomString}.txt`);
    console.log(`output is a ${output}`);
    res.send({ output });
  });

   function compile(language,codeFilePath,inputFilePath){
      if(language=="py")
      {
        
        // filepath = codeFilePath +'<'+inputFilePath;
        output = pythonRunner(codeFilePath,inputFilePath);
        console.log(output);
        return output;
      }
      if(language=="c")
      {
        
        output = cRunner(codeFilePath,inputFilePath);
        console.log(output);
        return output;
      }
      if(language=="cpp")
      {
        
        output = cppRunner(codeFilePath,inputFilePath);
        console.log(output);
        return output;
      }  
      if(language=="java")
      {
        output = javaRunner(codeFilePath,inputFilePath);
        console.log(output);
        return output;
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