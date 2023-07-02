import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router } from "react-router-dom";
import { red } from "@mui/material/colors";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const theme = createTheme({
  typography: {
    fontFamily: "'Inter','sans-serif'",
    h1: {
      fontFamily: "'Roboto Mono', monospace",
    },
  },
  palette: {
    primary: {
      main: "#1a90ff",
    },
    textPrimary: {
      main: "#000000",
    },
    success: {
      main: "#44b700",
    },
    error: {
      main: red[500],
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </Router>
);
