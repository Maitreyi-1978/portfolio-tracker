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

  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently
  } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: { returnTo: window.location.origin }
    });
  };

  const callSecureApi = async () => {
    try {
      console.log("🔹 Step 1: Getting token from Auth0...");

      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: "https://portfolio-tracker-api"
        }
      });

      console.log("✅ Token received:", token);

      console.log("🔹 Step 2: Calling FastAPI backend...");

      const response = await fetch("http://127.0.0.1:8000/api/data", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("🔹 Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Backend error:", errorText);
        alert("Backend Error: " + errorText);
        return;
      }

      const data = await response.json();

      console.log("✅ API Response:", data);
      alert("Success: " + JSON.stringify(data));

    } catch (error) {
      console.error("❌ ERROR:", error);
      alert("Error: " + error.message);
    }
  };

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
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Portfolio Tracker
          </Typography>

          {isAuthenticated && (
            <Button
              color="secondary"
              variant="outlined"
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Card elevation={6} sx={{ p: 4, textAlign: "center" }}>
          <CardContent>

            {!isAuthenticated ? (

              <>
                <Typography variant="h4" gutterBottom>
                  Welcome 👋
                </Typography>

                <Typography variant="body1" sx={{ mb: 3 }}>
                  Please click to login here 😊.
                </Typography>

                <Button
                  variant="contained"
                  size="large"
                  onClick={() => loginWithRedirect()}
                >
                  Login 😉
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
                  You are successfully authenticated 🎉🥳🎊🎈.
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>

                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>

                  <Button
                    variant="contained"
                    onClick={callSecureApi}
                  >
                    Get Secure Data
                  </Button>

                </Box>

              </>

            )}

          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default App;
