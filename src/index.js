import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { Auth0Provider } from "@auth0/auth0-react";

// MUI imports
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Create MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#ec407a",
    },
    secondary: {
      main: "#9c27b0",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial",
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-ss2qtfzv7kx40kuw.us.auth0.com"
      clientId="B6YSTxX5HsGW0WL2T3wKCBogPB9twTdf"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>
);