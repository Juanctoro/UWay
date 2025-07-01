//import React from 'react';
import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import './App.css'

function App() {
  const [user, setUser] = useState(null);

  const fakeLogin = () => {
    const userData = {
      dni: "12345678",
      names: 'Juan',
      lastnames: 'Pérez',
      phone: '123456789',
      address: 'Calle 123',
      email: 'juan@example.com',
      institutional_email: 'jperez@universidad.edu',
    };
    setUser(userData);
  }

  /*
  return (
    <div>
        <h1>UWay - Inicio</h1>
        {user ? (
            <Profile user={user} />
        ) : (
            <div>
                <p>No has iniciado sesión.</p>
                <button onClick={fakeLogin}>Iniciar sesión (falsa)</button>
            </div>
        )}
    </div>
  );
  */

  return (
    <Router>
      <div>
        <h1>UWay</h1>
        <nav>
          <Link to="/login">Login</Link> |{' '}
          <Link to="/register">Register</Link>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} /> 
        </Routes>
      </div>
    </Router>
  ); 
}

export default App
