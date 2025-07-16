// src/index.jsx  (o main.jsx)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext'; // <- que apunte al archivo que mostraste

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>        {/* <<< aquí */}
      <App />
    </AuthProvider>       {/* <<< y aquí */}
  </React.StrictMode>
);
