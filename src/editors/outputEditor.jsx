import React,{useState,useRef,useEffect} from "react";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/ext-language_tools";
import axios from 'axios'


function OutputEditor(props) {
  let  theme = props.onFetchTheme;
  let onFetchOutput = props.onFetchOutput;
  let [outputValue,setOutputValue]= useState("Output");
  

  const prevOutputRef = useRef(null);
  useEffect(() => {

    if (onFetchOutput !== prevOutputRef.current)
      handleOutputChange();
    prevOutputRef.current = onFetchOutput;
  }, [onFetchOutput]);

  const handleOutputChange = () => {
    setOutputValue(onFetchOutput);
    
  };
  return (
    <>
    
    <AceEditor
    mode="text"
    height="100%"
    value={outputValue}
    width="100%"
    theme={theme}
    
    
    name="outputEditor"
    editorProps={{ $blockScrolling: true }}
    setOptions={{
      fontSize:19,
      showGutter:true,
      readOnly:true,
      showPrintMargin:false,
      enableBasicAutocompletion: false,
      enableLiveAutocompletion: false,
      enableSnippets: false,
    }}
    />
   
    </>
  );
}
export default OutputEditor;
