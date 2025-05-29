import * as React from "react";
import copy from "copy-to-clipboard";
import { saveAs } from "file-saver";
import axios from "axios";
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Typography,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  ThemeProvider,
  createTheme,
} from "@mui/material";

export default function NavBar(props) {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  const [language, setLanguage] = React.useState("c");
  const [output, setOutput] = React.useState("output");
  const [theme, setTheme] = React.useState("chaos");
  const [insertTemplate, setInsertTemplate] = React.useState(0);
  const [showFirstGif, setShowFirstGif] = React.useState(theme == "chaos" ?  true : false);
  let editorCode = props.onFetchCode;
  let editorInput = props.onFetchInput;

  const onLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const onThemeChange = (value) => {
    setTheme(value);
  };

  const onInsertTemplate = (event) => {
    console.log(event, "clicked");
    if (insertTemplate == 1) setInsertTemplate(0);
    else setInsertTemplate(1);
  };

  const onCopyCode = () => {
    copy(editorCode);
    alert(`You have copied code.Thanks `);
  };

  const onDownload = () => {
    const file = new Blob([editorCode], { type: "text/plain;charset=utf-8" });
    saveAs(file, `downloadedCode.${language}`);
  };

  const handleGifToggle = () => {
    setShowFirstGif((prev) => !prev);
  };

  const onRun = async () => {
    try {
      setOutput("...Compiling....");
      const response = await axios.post("http://localhost:5000/api/data", {
        // Your data object to send to the server
        code: editorCode,
        language: language,
        input: editorInput,
      });
      const data = response.data.output;
      console.log(data);
      setOutput(data);
      
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };
 

  props.fetchData(theme, language, insertTemplate,output);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Button sx={{ marginRight: "10px" }} variant="outlined">
                New file
              </Button>
              <Button
                sx={{ marginRight: "10px" }}
                onClick={onInsertTemplate}
                variant="outlined"
              >
                Insert New Template
              </Button>
              <Button
                sx={{ marginRight: "10px" }}
                onClick={onCopyCode}
                variant="outlined"
              >
                Copy Code
              </Button>
              <Button
                sx={{ marginRight: "10px" }}
                onClick={onDownload}
                variant="outlined"
              >
                Download
              </Button>
              <Button sx={{ marginRight: "10px" }} variant="outlined">
                About
              </Button>
            </Typography>

            {/* <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Theme</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={theme}
                label="Theme"
                onChange={onThemeChange}
              >
                <MenuItem value={"chrome"}>Light</MenuItem>
                <MenuItem value={"chaos"}>Dark</MenuItem>
              </Select>
            </FormControl> */}
         

            {/* GIF Toggle */}
            <div
              style={{
                position: "relative",
                width: "60px",
                height: "60px",
                marginRight: "16px",
                cursor: "pointer",
                display: "inline-block",
                verticalAlign: "middle",
                overflow: "hidden",
              }}
              onClick={handleGifToggle}
              title="Toggle Theme GIF"
            >
              <img
                src={'../../assets/gif/moon.gif'}
                alt="Moon"
                onClick={()=>onThemeChange("chrome")}
                style={{
                  position: "absolute",
                  left: 0,
                  top: showFirstGif ? 0 : "80px",
                  width: "100%",
                  height: "100%",
                  transition: "top 0.3s",
                  zIndex: showFirstGif ? 2 : 1,
                  objectFit:'cover',
                  transform:'scale(1.5)'
                }}
              />
              <img
                src={'../../assets/gif/sun.gif'}
                alt="Sun"
                onClick={()=>onThemeChange("chaos")}
                style={{
                  position: "absolute",
                  left: 0,
                  top: showFirstGif ? "-80px" : 0,
                  width: "100%",
                  height: "100%",
                  transition: "top 0.3s",
                  zIndex: showFirstGif ? 1 : 2,
                  objectFit:'cover',
                  transform:'scale(1.5)'
                }}
              />
            </div>

            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Language</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-label"
                value={language}
                label="Language"
                onChange={onLanguageChange}
              >
                <MenuItem value={"c"}>C</MenuItem>
                <MenuItem value={"cpp"}>C++</MenuItem>
                <MenuItem value={"java"}>Java</MenuItem>
                <MenuItem value={"py"}>Python</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" color="success" onClick={onRun}>
              Run
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
