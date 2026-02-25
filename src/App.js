import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useState } from "react";

function App() {
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently
  } = useAuth0();

  const [response, setResponse] = useState("");

  const callBackend = async () => {
    try {
      const token = await getAccessTokenSilently();

      const res = await axios.get("http://localhost:5000/protected", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setResponse(JSON.stringify(res.data));
    } catch (error) {
      setResponse("Error: " + error.message);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {!isAuthenticated ? (
        <button onClick={() => loginWithRedirect()}>Login</button>
      ) : (
        <>
          <h2>Welcome {user.name}</h2>
          <button onClick={callBackend}>Call Protected API</button>
          <br /><br />
          <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Logout
          </button>
          <pre>{response}</pre>
        </>
      )}
    </div>
  );
}

export default App;