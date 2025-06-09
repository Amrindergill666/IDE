import React, { useState, useEffect, useRef } from "react";

import AceEditor from "react-ace";
import "./editor.css";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/ext-language_tools";

function CodeEditor(props) {
  const template = {
    c: '#include<stdio.h>\nint main()\n{\n\tprintf("Welcome to ide");\n\treturn 0;\n}',
    cpp: '#include<iostream>\nusing namespace std;\nint main()\n{\n\tcout<<"Welcome to ide";\n\treturn 0;\n}',
    java: 'class main { \n\t    public static void main(String[] args){\n\t\tSystem.out.println("Welcome to ide");\n\t}\n}',
    python: 'val = input("Enter your value: ")\nprint(val)\nprint("hello")',
  };

  let onFetchLanguage = props.onFetchLanguage;
  let onFetchTheme = props.onFetchTheme;
  let onInsertTemplate = props.onInsertTemplate;

  let [theme, setTheme] = useState("chaos");
  let [language, setLanguage] = useState("c_cpp");
  let [copyCode, setCopyCode] = useState("");

  let [value, setValue] = useState(template.c);
  let [cValue, setCValue] = useState(template.c);
  let [cppValue, setCppValue] = useState(template.cpp);
  let [pythonValue, setPythonValue] = useState(template.python);
  let [javaValue, setJavaValue] = useState(template.java);
  const [textWrap, setTextWrap] = useState(false);

  const prevLangRef = useRef(null);
  const prevThemeRef = useRef(null);
  const prevInsertTemplateRef = useRef(null);

  //!to handle language change
  useEffect(() => {
    // Check if the prop value has changed
    if (onFetchLanguage !== prevLangRef.current) {
      // Execute your function here
      handleLangChange1();
    }
    // Update the ref with the current prop value for the next comparison
    prevLangRef.current = onFetchLanguage;
  }, [onFetchLanguage]);

  //! to handle theme change
  useEffect(() => {
    if (onFetchTheme !== prevThemeRef.current) handleThemeChange();
    prevThemeRef.current = onFetchTheme;
  }, [onFetchTheme]);

  //! to handle insert template
  useEffect(() => {
    if (onInsertTemplate !== prevInsertTemplateRef.current) {
      handleTempChange();
    }

    prevThemeRef.current = onInsertTemplate;
  }, [onInsertTemplate]);

  function onType(newValue) {
    setValue(newValue);

    // console.log("change", newValue);
  }

  const handleLangChange1 = () => {
    if (onFetchLanguage == "c" || onFetchLanguage == "cpp")
      setLanguage("c_cpp");
    else setLanguage(onFetchLanguage);

    if (prevLangRef.current == "c") {
      setCValue(value);
      handleLangChange2();
    } else if (prevLangRef.current == "cpp") {
      setCppValue(value);
      handleLangChange2();
    } else if (prevLangRef.current == "java") {
      setJavaValue(value);
      handleLangChange2();
    } else if (prevLangRef.current == "py") {
      setPythonValue(value);
      handleLangChange2();
    }

    // console.log('Prop value changed:', onFetchLanguage);
  };

  const handleLangChange2 = () => {
    console.log("inside handle temp");
    console.log(onFetchLanguage);
    if (onFetchLanguage == "c") setValue(cValue);
    else if (onFetchLanguage == "cpp") setValue(cppValue);
    else if (onFetchLanguage == "java") setValue(javaValue);
    else if (onFetchLanguage == "py") setValue(pythonValue);
  };
  const handleTempChange = () => {
    console.log("inside handle temp");
    console.log(onFetchLanguage);
    if (onFetchLanguage == "c") setValue(template.c);
    else if (onFetchLanguage == "cpp") setValue(template.cpp);
    else if (onFetchLanguage == "java") setValue(template.java);
    else if (onFetchLanguage == "py") setValue(template.python);
  };

  const handleThemeChange = () => {
    setTheme(onFetchTheme);
    // console.log('Prop value changed:', onFetchTheme);
  };

  const copyPress = () => {
    setCopyCode(value);
    navigator.clipboard.writeText(value);
  };
  const onRevert = () => {
    handleTempChange();
  };

  props.onFetchCode(value);

  const onPressDownload = () => {
    props.setDownloadPress(true);
  };

  const onPressWrap = () => {
    setTextWrap(!textWrap);
  };

  return (
    <div className="editorBox" id="printable-editor">
      <div
        className={`editorHeader ${
          theme == "chaos" ? "darkColor" : "lightColor"
        }`}
      >
        <div className="leftSide">
          <img
            src="../../assets/images/Code icon.png"
            style={{ width: 30, height: 30 }}
          />
          <p className={theme == "chaos" ? "lightText" : "darkText"}>
            Input Editor
          </p>
        </div>
        <div className="rightSide">
          <div className="tooltipWrapper">
            <img
              src={
                textWrap
                  ? "../../assets/images/TextWrap.png"
                  : "../../assets/images/TextNoWrap.png"
              }
              className="rightIcon"
              onClick={onPressWrap}
              alt="Wrap code"
            />
            <span className="tooltipText">{textWrap ? "Unwrap" : "Wrap"}</span>
          </div>
          <div className="tooltipWrapper">
            <img
              src="../../assets/images/Download.png"
              className="rightIcon"
              onClick={onPressDownload}
              alt="Download code"
            />
            <span className="tooltipText">Download</span>
          </div>
          <div className="tooltipWrapper">
            <img
              src="../../assets/images/Share.png"
              className="rightIcon"
              onClick={() => window.print()}
              alt="Share code"
            />
            <span className="tooltipText">Share</span>
          </div>
          <div className="tooltipWrapper">
            <img
              src="../../assets/images/Revert.png"
              className="rightIcon"
              onClick={onRevert}
              alt="Revert code"
            />
            <span className="tooltipText">Revert Original</span>
          </div>
          <div className="tooltipWrapper">
            <img
              src="../../assets/images/Copy.png"
              className="rightIcon"
              onClick={copyPress}
              alt="Copy Code"
            />
            <span className="tooltipText">
              {copyCode == value ? "Text copied" : "Copy"}
            </span>
          </div>
        </div>
      </div>

      <AceEditor
        mode={language}
        height="calc(100% - 35px)"
        width="100%"
        value={value}
        theme={theme}
        onChange={onType}
        name="codeEditor"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          fontSize: 19,
          showPrintMargin: false,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          wrap: textWrap,
          showLineNumbers: true,
        }}
      />
    </div>
  );
}
export default CodeEditor;
