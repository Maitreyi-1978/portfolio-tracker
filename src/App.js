import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Portfolio Tracker</h1>

      {!isAuthenticated ? (
        <button onClick={() => loginWithRedirect()}>
          Login / Register
        </button>
      ) : (
        <>
          <h3>Welcome {user.name}</h3>
          <p>{user.email}</p>

          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default App;