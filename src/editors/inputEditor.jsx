import React, { useState } from "react";

import AceEditor from "react-ace";
import "./editor.css";

import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/ext-language_tools";

function InputEditor(props) {
  let theme = props.onFetchTheme;
  let [inputValue, setInputValue] = useState("");
  function onChange(newInputValue) {
    setInputValue(newInputValue);
    console.log("change", newInputValue);
  }
  props.onFetchInput(inputValue);
  return (
    <div className="editorBox">
      <div className={`editorHeader ${theme == "chaos" ? "darkColor" : "lightColor"}`} >
        <img src="../../assets/images/Input icon.png"  style={{width:30,height:30}}/>
        <p className={theme == "chaos" ? "lightText" : "darkText"}>Input Editor</p>
      </div>
      <AceEditor
        mode="text"
        height="100%"
        width="100%"
        value={inputValue}
        theme={theme}
        onChange={onChange}
        name="inputEditor"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          fontSize: 19,
          showPrintMargin: false,
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
        }}
      />
    </div>
  );
}
export default InputEditor;
