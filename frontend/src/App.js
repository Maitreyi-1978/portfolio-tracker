import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Portfolio Tracker</h1>

      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      )}

      {isAuthenticated && (
        <>
          <p>Welcome, {user.email}</p>

          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Log Out
          </button>
        </>
      )}
    </div>
  );
}

export default App;
