import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  Avatar,
  CircularProgress,
  Box
} from "@mui/material";

function App() {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0();

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {/* Top Navbar */}
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Portfolio Tracker
          </Typography>

          {isAuthenticated && (
            <Button
              color="inherit"
              variant="outlined"
              onClick={() =>
                logout({
                  logoutParams: { returnTo: window.location.origin }
                })
              }
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Card elevation={6} sx={{ p: 4, textAlign: "center" }}>
          <CardContent>
            {!isAuthenticated ? (
              <>
                <Typography variant="h4" gutterBottom>
                  Welcome 👋
                </Typography>

                <Typography variant="body1" sx={{ mb: 3 }}>
                  Please login securely using Auth0 to access your portfolio dashboard.
                </Typography>

                <Button
                  variant="contained"
                  size="large"
                  onClick={() => loginWithRedirect()}
                >
                  Login with Auth0
                </Button>
              </>
            ) : (
              <>
                <Avatar
                  src={user.picture}
                  alt={user.name}
                  sx={{ width: 100, height: 100, margin: "0 auto 20px" }}
                />

                <Typography variant="h5" gutterBottom>
                  Welcome, {user.name}
                </Typography>

                <Typography variant="body2" sx={{ mb: 3 }}>
                  You are successfully authenticated.
                </Typography>

                <Button
                  variant="contained"
                  color="error"
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin }
                    })
                  }
                >
                  Logout
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default App;