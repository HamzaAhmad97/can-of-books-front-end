import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

// TODO: wrap everything in Auth0
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-pzlntnyz.us.auth0.com"
      clientId="5GYPtotn2NvWiH8Sw43QZ9lXoQX3A1Bd"
      redirectUri= {window.location.origin}
    >
      <App />
    </Auth0Provider>

  </React.StrictMode>,
  document.getElementById( 'root' )
);
