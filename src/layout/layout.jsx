import React, { useEffect, useRef, useState } from "react";
import { Grid } from "@mui/material";
import CodeEditor from "../editors/codeEditor";
import InputEditor from "../editors/inputEditor";
import OutputEditor from "../editors/outputEditor";
import NavBar from "../navigation/navBar";
import "./layout.css";
function Layout() {
  const [editorTheme, setEditorTheme] = useState("chaos");
  const [editorLanguage, setEditorLanguage] = useState("c");
  const [editorCode, setEditorCode] = useState("");
  const [editorInput, setEditorInput] = useState("");
  const [editorOutput, setEditorOutput] = useState("");
  const [editorInsertTemplate, setEditorInsertTemplate] = useState("0");
  const [colWidth, setColWidth] = useState(50); // percentage
  const [rowHeight, setRowHeight] = useState(50); // percentage
  const [bothMin, setBothMin] = useState(false);
  const [downloadPress, setDownloadPress] = useState(false);
  const [resizer, setResizer] = useState({
    input: 1,
    output: 1,
  });
  const divRef = useRef(null);

  
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchData = (theme, language, insertTemplate, output) => {
    setEditorLanguage(language);
    setEditorTheme(theme);
    setEditorInsertTemplate(insertTemplate);
    setEditorOutput(output);
  };
  const fetchCode = (code) => {
    setEditorCode(code);
  };

  const fetchInput = (input) => {
    setEditorInput(input);
  };
  useEffect(() => {
    if (resizer.input == 1 && resizer.output == 1) {
      setRowHeight(50);
      setBothMin(false);
    } else if (resizer.input == 1 && resizer.output == 0) {
      setRowHeight(96);
      setBothMin(false);
    } else if (resizer.input == 0 && resizer.output == 1) {
      setRowHeight(4);
      setBothMin(false);
    } else {
      setBothMin(true);
    }
  }, [resizer]);

  const handleResize = (type, e) => {
    e.preventDefault();
    let startPos = type === "col" ? e.clientX : e.clientY;

    const onMouseMove = (event) => {
      const currentPos = type === "col" ? event.clientX : event.clientY;
      const diff = currentPos - startPos;
      startPos = currentPos;

      if (type === "col") {
        setColWidth((prev) =>
          Math.min(75, Math.max(25, prev + (diff / window.innerWidth) * 100))
        );
      } else {
        setRowHeight((prev) =>
          Math.min(
            80,
            Math.max(
              20,
              prev + (diff / document.querySelector(".io").clientHeight) * 100
            )
          )
        );
      }
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };


  
 
  return (
    <>
      <NavBar
        fetchData={fetchData}
        onFetchCode={editorCode}
        onFetchInput={editorInput}
        downloadPress={downloadPress}
        setDownloadPress={setDownloadPress}
      />

      <div style={{ display: "flex", width: "100%" }}>
        <Grid
          container
          spacing={0}
          style={{ flexWrap: screenWidth < 768 ? "wrap" : "nowrap", width: "100%", margin: "8px 8px" }}
        >
          <Grid item style={{ width: `${screenWidth < 768 ? 100 :  colWidth}%` }}>
            <div className="codeEditor">
              <CodeEditor
                onFetchTheme={editorTheme}
                onFetchLanguage={editorLanguage}
                onInsertTemplate={editorInsertTemplate}
                onFetchCode={fetchCode}
                downloadPress={downloadPress}
                setDownloadPress={setDownloadPress}
              />
            </div>
          </Grid>

          { screenWidth >= 768 && 
            <div
            className="verticalLine"
            onMouseDown={(e) => handleResize("col", e)}
          ></div>}

          <Grid item style={{ width: `${ screenWidth < 768  ? 100 : 100 - colWidth}%` }}>
            <div
            ref={divRef}
              className="io"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                overflow: "hidden",
              }}
            >
              <div
                className="inputEditor"
                style={{ height:   screenWidth < 768 ? "50vh" : `${bothMin ? 4 : rowHeight}%` }}
              >
                <InputEditor
                  onFetchTheme={editorTheme}
                  onFetchInput={fetchInput}
                  resizer={resizer}
                  setResizer={setResizer}
                />
              </div>

             {screenWidth >= 768 && 
              <div
                className={`horizontalLine${
                  resizer.input !== 1 || resizer.output !== 1
                    ? " disabledResizer"
                    : ""
                }`}
                onMouseDown={
                  resizer.input === 1 && resizer.output === 1
                    ? (e) => handleResize("row", e)
                    : undefined
                }
              ></div>}

              <div
                className="outputEditor"
                style={{ height: screenWidth < 768 ? "50vh" : `${ bothMin ? 4 : 100 - rowHeight}%` }}
              >
                <OutputEditor
                  onFetchTheme={editorTheme}
                  onFetchOutput={editorOutput}
                  resizer={resizer}
                  setResizer={setResizer}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
export default Layout;
