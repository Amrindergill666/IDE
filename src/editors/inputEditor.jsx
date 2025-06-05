import React, { useEffect, useState } from "react";

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

  const [size, setSize] = useState("Maximize");
  const [copyCode, setCopyCode] = useState("");
  const copyPress = () => {
    navigator.clipboard.writeText(inputValue).then(() => {
      setCopyCode(inputValue);
    });
  };
  const onSizeChange = () => {
    if (size == "Maximize") {
      setSize("Minimize");
      props.setResizer({
        input: 0,
        output: props.resizer.output
      })
    } else {
      setSize("Maximize");
      props.setResizer({
        input: 1,
        output: props.resizer.output

      })
    }
  };

  useEffect(() => {
    if (props.resizer) {
      if (props.resizer.input == 1) {
        setSize("Maximize");
      } else {
        setSize("Minimize");
      }
    } else {
      setSize("Maximize");
    }
  }, [props.resizer]);

  props.onFetchInput(inputValue);
  return (
    <div className="editorBox">
      <div
        className={`editorHeader ${
          theme == "chaos" ? "darkColor" : "lightColor"
        }`}
      >
        <div className="leftSide">
          <img
            src="../../assets/images/Input icon.png"
            style={{ width: 30, height: 30 }}
          />
          <p className={theme == "chaos" ? "lightText" : "darkText"}>
            Input Editor
          </p>
        </div>
        <div className="rightSide">
          <div className="tooltipWrapper">
            <img
              src="../../assets/images/Copy.png"
              className="rightIcon"
              onClick={copyPress}
              alt="Copy Code"
            />
            <span className="tooltipText">
              {copyCode == inputValue ? "Text copied" : "Copy"}
            </span>
          </div>
          <div className="tooltipWrapper">
            <img
              src="../../assets/images/DownArrow.png"
              className="rightIcon"
              onClick={onSizeChange}
              style={{
                transform: size == "Minimize" ? "rotate(180deg)" : "none",
              }}
              alt="Sizer"
            />
            <span className="tooltipText">
              {size == "Minimize" ? "Maximize" : "Minimize"}
            </span>
          </div>
        </div>
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
