import React, { useState } from "react";
import NavBar from "../navigation/navBar";
import CodeEditor from "../editors/codeEditor";
import InputEditor from "../editors/inputEditor";
import OutputEditor from "../editors/outputEditor";
import "@annotationhub/react-golden-layout/dist/css/goldenlayout-base.css";
import "@annotationhub/react-golden-layout/dist/css/themes/goldenlayout-dark-theme.css";
import { GoldenLayoutComponent } from "@annotationhub/react-golden-layout";
import "./GlLayout.css";

function GlLayout() {
  const [layoutManager, setLayoutManager] = useState(null);
  const [editorTheme, setEditorTheme] = useState("chaos");
  const [editorLanguage, setEditorLanguage] = useState("c");
  const [editorCode, setEditorCode] = useState("");
  const [editorInput, setEditorInput] = useState("");
  const [editorOutput, setEditorOutput] = useState("");
  const [editorInsertTemplate, setEditorInsertTemplate] = useState("0");

  const fetchLanguage = ( language) => {
    setEditorLanguage(language);
  };
  const fetchTheme = (theme) => {
    setEditorTheme(theme); 
  };
  const fetchInsertTemplate = ( insertTemplate) => {
    setEditorInsertTemplate(insertTemplate);
  };
  const fetchOutput = (output) => {
    console.log(output);
    setEditorOutput(output);
  };
  const fetchCode = (code) => {
    setEditorCode(code);
  };

  const fetchInput = (input) => {
    setEditorInput(input);
  };

  return (
    <>
      <NavBar
        fetchLanguage={fetchLanguage}
        fetchTheme={fetchTheme}
        fetchInsertTemplate={fetchInsertTemplate}
        fetchOutput={fetchOutput}
        onFetchCode={editorCode}
        onFetchInput={editorInput}
      />
      <div className="box">
        <GoldenLayoutComponent
          // (Required) Golden Layout Config. (See http://golden-layout.com/docs/Config.html)
          config={{
            settings: {
              showPopoutIcon: false,
              reorderEnabled: true,
              showCloseIcon: false,
            },
            dimensions: {
              borderWidth: 2,
              headerHeight: 22,
            },
            content: [
              {
                type: "row",
                content: [
                  {
                    component: CodeEditor,
                    props: {
                      onFetchTheme: editorTheme,
                      onFetchLanguage: editorLanguage,
                      onInsertTemplate: editorInsertTemplate,
                      onFetchCode: fetchCode,
                    },
                    title: "Code Editor",
                    isClosable: false,
                  },
                  {
                    type: "column",
                    content: [
                      {
                        component: InputEditor,
                        props: {
                          onFetchTheme: editorTheme,
                          onFetchInput: fetchInput,
                        },
                        title: "Input Editor",
                        isClosable: false,
                      },
                      {
                        component: OutputEditor,
                        props: {
                          onFetchTheme: editorTheme,
                          onFetchOutput: editorOutput,
                        },
                        title: "Output Editor",
                        isClosable: false,
                      },
                    ],
                  },
                ],
              },
            ],
          }}
          // (Optional) Set up auto-resizing. Layout will resize when the window resizes.
          autoresize={true}
          // (Optional) (Milliseconds) Debounce resize to prevent excessive re-renders.
          debounceResize={100}
          // (Optional) Grab the instance of the GoldenLayout Manager. Gives you full access to GL API.
          onLayoutReady={setLayoutManager}
        />
      </div>
    </>
  );
}

export default GlLayout;
