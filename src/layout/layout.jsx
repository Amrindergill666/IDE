import React , {useState}from "react";
import {Grid} from '@mui/material';
import CodeEditor from "../editors/codeEditor";
import InputEditor from "../editors/inputEditor";
import OutputEditor from "../editors/outputEditor";
import NavBar from "../navigation/navBar";
import './layout.css';
function Layout()
{
    const[editorTheme,setEditorTheme]=useState("chaos");
    const[editorLanguage,setEditorLanguage]=useState("c");
    const[editorCode,setEditorCode]=useState("");
    const[editorInput,setEditorInput]=useState("");
    const[editorOutput,setEditorOutput]=useState("");
    const[editorInsertTemplate,setEditorInsertTemplate]=useState("0");
    
    const fetchData = (theme,language,insertTemplate,output) =>{
        setEditorLanguage(language);
        setEditorTheme(theme);
        setEditorInsertTemplate(insertTemplate);
        setEditorOutput(output);
       }
    const fetchCode = (code) =>{
        setEditorCode(code);
       }
       
    const fetchInput = (input) =>{
        setEditorInput(input);
       }
       
    return( 
        <>
        <NavBar fetchData={fetchData} onFetchCode={editorCode} onFetchInput={editorInput}/>


        <Grid container spacing={0}>
            <Grid item xs={6}>
                 <div className="codeEditor">
                    <CodeEditor onFetchTheme={editorTheme} onFetchLanguage={editorLanguage} onInsertTemplate={editorInsertTemplate} onFetchCode={fetchCode}/>
                 </div>
             </Grid>
            <Grid item xs={6}>
                <div className="io">
                    <div className="inputEditor">
                        <InputEditor onFetchTheme={editorTheme} onFetchInput={fetchInput}/>
                    </div>
                    <div className="outputEditor">
                        <OutputEditor onFetchTheme={editorTheme} onFetchOutput={editorOutput}/>
                    </div>
                 </div>
            </Grid>
        </Grid>
           
            
        </>
    );
}
export default Layout;