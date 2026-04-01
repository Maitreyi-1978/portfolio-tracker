import React, { useState } from "react";
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
  Box,
  Grid
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

  // 💰 Wallet State
  const [balance, setBalance] = useState(0);

  // 📋 Tasks
  const tasks = [
    { id: 1, name: "Watch Video 🎥", reward: 10 },
    { id: 2, name: "Download App 📲", reward: 20 },
    { id: 3, name: "Refer Friend 👥", reward: 50 }
  ];

  // ✅ Complete Task
  const completeTask = (reward) => {
    setBalance((prev) => prev + reward);
  };

  // 🔐 Secure API Call
  const callSecureApi = async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: "https://portfolio-tracker-api"
        }
      });

      const response = await fetch("http://127.0.0.1:8000/api/data", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      alert("✅ " + JSON.stringify(data));

    } catch (error) {
      console.error(error);
      alert("❌ Error fetching secure data");
    }
  };

  const handleLogout = () => {
    logout({
      logoutParams: { returnTo: window.location.origin }
    });
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {/* 🔵 NAVBAR */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            💸 Earnify
          </Typography>

          {isAuthenticated && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 5 }}>

        {!isAuthenticated ? (

          <Card sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h4">Welcome to Earnify 🚀</Typography>
            <Typography sx={{ mt: 2 }}>
              Complete tasks & earn rewards 💰
            </Typography>

            <Button
              variant="contained"
              sx={{ mt: 3 }}
              onClick={() => loginWithRedirect()}
            >
              Login
            </Button>
          </Card>

        ) : (

          <Grid container spacing={3}>

            {/* 👤 PROFILE */}
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 3, textAlign: "center" }}>
                <Avatar
                  src={user.picture}
                  sx={{ width: 80, height: 80, margin: "0 auto" }}
                />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {user.name}
                </Typography>
                <Typography variant="body2">
                  {user.email}
                </Typography>

                <Typography sx={{ mt: 2 }}>
                  Referral: {user.sub.slice(0, 6)}
                </Typography>
              </Card>
            </Grid>

            {/* 💰 WALLET */}
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Typography variant="h5">
                  💰 Wallet Balance
                </Typography>

                <Typography variant="h4" sx={{ mt: 2 }}>
                  ₹{balance}
                </Typography>

                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={callSecureApi}
                >
                  🔐 Verify & Fetch Rewards
                </Button>
              </Card>
            </Grid>

            {/* 📋 TASKS */}
            <Grid item xs={12}>
              <Card sx={{ p: 3 }}>
                <Typography variant="h5">📋 Available Tasks</Typography>

                {tasks.map((task) => (
                  <Box
                    key={task.id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 2,
                      p: 2,
                      border: "1px solid #ccc",
                      borderRadius: "10px"
                    }}
                  >
                    <Box>
                      <Typography>{task.name}</Typography>
                      <Typography variant="body2">
                        Reward: ₹{task.reward}
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      onClick={() => completeTask(task.reward)}
                    >
                      Complete
                    </Button>
                  </Box>
                ))}
              </Card>
            </Grid>

          </Grid>

        )}
      </Container>
    </>
  );
}

export default App;