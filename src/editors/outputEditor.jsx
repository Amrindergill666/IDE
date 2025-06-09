import React, { useState, useRef, useEffect } from "react";

import AceEditor from "react-ace";
import "./editor.css";

import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/ext-language_tools";
import axios from "axios";

function OutputEditor(props) {
  let theme = props.onFetchTheme;
  let onFetchOutput = props.onFetchOutput;
  let [outputValue, setOutputValue] = useState("");
  const [size, setSize] = useState("Maximize");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  
    useEffect(() => {
      const handleResize = () => setScreenWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

  const prevOutputRef = useRef(null);
  useEffect(() => {
    if (onFetchOutput !== prevOutputRef.current) {
      console.log(
        "OutputEditor: Output changed:",
        onFetchOutput,
        "ww",
        prevOutputRef.current
      );
      handleOutputChange();
    }
    prevOutputRef.current = onFetchOutput;
  }, [onFetchOutput]);

  const handleOutputChange = () => {
    setOutputValue(onFetchOutput);
  };

  const onSizeChange = () => {
      if (size == "Maximize") {
        setSize("Minimize");
        props.setResizer({
          output: 0,
          input: props.resizer.input,
        })
      } else {
        setSize("Maximize");
        props.setResizer({
          output: 1,
          input: props.resizer.input,
        })
      }
    };
  
    useEffect(() => {
      if (props.resizer) {
        if (props.resizer.output == 1) {
          setSize("Maximize");
        } else {
          setSize("Minimize");
        }
      } else {
        setSize("Maximize");
      }
    }, [props.resizer]);
  
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
            Output Editor
          </p>
        </div>
        <div className="rightSide">
          {
            screenWidth >= 768 &&
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
          </div>}
        </div>
      </div>

      <AceEditor
        mode="text"
        height="calc(100% - 35px)"
        value={outputValue}
        width="100%"
        theme={theme}
        name="outputEditor"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          fontSize: 19,
          showGutter: true,
          readOnly: true,
          showPrintMargin: false,
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
        }}
      />
    </div>
  );
}
export default OutputEditor;
