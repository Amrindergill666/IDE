import React, { useState } from "react";
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

  const handleResize = (type, e) => {
    e.preventDefault();
    let startPos = type === "col" ? e.clientX : e.clientY;

    const onMouseMove = (event) => {
      const currentPos = type === "col" ? event.clientX : event.clientY;
      const diff = currentPos - startPos;
      startPos = currentPos;

      if (type === "col") {
        setColWidth((prev) =>
          Math.min(90, Math.max(10, prev + (diff / window.innerWidth) * 100))
        );
      } else {
        setRowHeight((prev) =>
          Math.min(
            90,
            Math.max(
              10,
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
      />

      <div
        style={{ display: "flex", width: "100%", backgroundColor: "#f0f0f0" }}
      >
        <Grid
          container
          spacing={0}
          style={{ flexWrap: "nowrap", width: "100%" }}
        >
          <Grid item style={{ width: `${colWidth}%` }}>
            <div className="codeEditor">
              <CodeEditor
                onFetchTheme={editorTheme}
                onFetchLanguage={editorLanguage}
                onInsertTemplate={editorInsertTemplate}
                onFetchCode={fetchCode}
              />
            </div>
          </Grid>

          {/* Vertical Line */}
          <div
            className="verticalLine"
            onMouseDown={(e) => handleResize("col", e)}
          ></div>

          <Grid item style={{ width: `${100 - colWidth}%` }}>
            <div
              className="io"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "99%",
                marginTop:7
              }}
            >
              <div className="inputEditor" style={{ height: `${rowHeight}%` }}>
                <InputEditor
                  onFetchTheme={editorTheme}
                  onFetchInput={fetchInput}
                />
              </div>

              {/* Centered Horizontal Line */}
              <div
                className="horizontalLine"
                onMouseDown={(e) => handleResize("row", e)}
              ></div>

              <div
                className="outputEditor"
                style={{ height: `${100 - rowHeight}%` }}
              >
                <OutputEditor
                  onFetchTheme={editorTheme}
                  onFetchOutput={editorOutput}
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
