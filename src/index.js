import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from "@auth0/auth0-react";
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain="dev-ss2qtfzv7kx40kuw.us.auth0.com"
    clientId="B6YSTxX5HsGW0WL2T3wKCBogPB9twTdf"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "https://portfolio-api"
    }}
  >
    <App />
  </Auth0Provider>
);