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
  Avatar,
  Menu,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  ArrowDropDownCircleRounded,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";

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

  const languageOptions = [
    { value: "c", label: "C", image: "/assets/images/cIco.png" },
    { value: "cpp", label: "C++", image: "/assets/images/cppIco.png" },
    { value: "java", label: "Java", image: "/assets/images/javaIco.png" },
    { value: "py", label: "Python", image: "/assets/images/pythonIco.png" },
  ];

  const [language, setLanguage] = React.useState("c");
  const [output, setOutput] = React.useState("");
  const [theme, setTheme] = React.useState("chaos");
  const [insertTemplate, setInsertTemplate] = React.useState(0);
  const [downloadCount, setDownloadCount] = React.useState(0);
  const [showFirstGif, setShowFirstGif] = React.useState(
    theme == "chaos" ? true : false
  );
  let editorCode = props.onFetchCode;
  let editorInput = props.onFetchInput;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selected, setSelected] = React.useState(languageOptions[0]);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelect = (option) => {
    setLanguage(option.value);
    setSelected(option);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
    saveAs(file, `downloadedCode${downloadCount}.${language}`);
    setDownloadCount((prevCount) => prevCount + 1);
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

  React.useEffect(() => {
    if (props.downloadPress) {
      onDownload();
      props.setDownloadPress(false);
    }
  }, [props.downloadPress]);

  props.fetchData(theme, language, insertTemplate, output);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <img
                src={"../../assets/images/logo.png"}
                alt="Logo"
                style={{ width: "30px", height: "30px", marginRight: "8px" }}
              />
            </Typography>

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
                src={"../../assets/gif/moon.gif"}
                alt="Moon"
                onClick={() => onThemeChange("chrome")}
                style={{
                  position: "absolute",
                  left: 0,
                  top: showFirstGif ? 0 : "80px",
                  width: "100%",
                  height: "100%",
                  transition: "top 0.3s",
                  zIndex: showFirstGif ? 2 : 1,
                  objectFit: "cover",
                  transform: "scale(1.5)",
                }}
              />
              <img
                src={"../../assets/gif/sun.gif"}
                alt="Sun"
                onClick={() => onThemeChange("chaos")}
                style={{
                  position: "absolute",
                  left: 0,
                  top: showFirstGif ? "-80px" : 0,
                  width: "100%",
                  height: "100%",
                  transition: "top 0.3s",
                  zIndex: showFirstGif ? 1 : 2,
                  objectFit: "cover",
                  transform: "scale(1.5)",
                }}
              />
            </div>

            <>
              <div
                onClick={handleClick}
                style={{
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "right",
                  gap: "8px",
                  padding: "6px 12px",
                  cursor: "pointer",
                  background: "rgba(255,255,255,0.04)",
                  marginRight: "12px",
                  // minWidth: "90px",
                  userSelect: "none",
                }}
              >
                <Avatar
                  src={selected.image}
                  alt={selected.label}
                  sx={{ width: 24, height: 24 }}
                />
                <span style={{ fontWeight: 500 }}>{selected.label}</span>
                {open ? (
                  <KeyboardArrowUp sx={{ fontSize: 20 }} />
                ) : (
                  <KeyboardArrowDown sx={{ fontSize: 20 }} />
                )}
              </div>

              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {languageOptions.map((option) => (
                  <MenuItem
                    key={option.value}
                    selected={option.value === selected.value}
                    onClick={() => handleSelect(option)}
                  >
                    <ListItemIcon>
                      <Avatar
                        src={option.image}
                        alt={option.label}
                        sx={{ width: 24, height: 24 }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={option.label} />
                  </MenuItem>
                ))}
              </Menu>
            </>
            <Button variant="contained" color="success" onClick={onRun}>
              Run
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
