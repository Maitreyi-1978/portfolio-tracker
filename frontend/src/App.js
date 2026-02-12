import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function App() {

  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    getAccessTokenSilently,
    user
  } = useAuth0();

  // ✅ UPDATED getToken
  const getToken = async () => {
    try {
      const token = await getAccessTokenSilently({
        audience: "https://portfolio-tracker-api",
      });

      console.log("My Token:", token);

    } catch (err) {
      console.log("Error getting token:", err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <h1>Portfolio Tracker</h1>

        {!isAuthenticated && (
          <button style={styles.button} onClick={() => loginWithRedirect()}>
            Login
          </button>
        )}

        {isAuthenticated && (
          <>
            <p>Welcome: {user?.email}</p>

            <button style={styles.button} onClick={getToken}>
              Get Token
            </button>

            <br /><br />

            <button
              style={styles.button}
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Logout
            </button>
          </>
        )}

      </div>
    </div>
  );
}

/* ---------- Styles ---------- */

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5"
  },

  card: {
    textAlign: "center",
    padding: "30px",
    borderRadius: "12px",
    backgroundColor: "white",
    boxShadow: "0 0 15px rgba(0,0,0,0.2)",
    minWidth: "300px"
  },

  button: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer"
  }
};

export default App;
