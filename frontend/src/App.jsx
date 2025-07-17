// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Landing from './components/UWayLanding';
import Register from './components/UWayRegister';
import Login from './components/UWayLogin';
import Dashboard from './components/UWayDashboard';
import RequireAuth from './components/RequireAuth';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />

      </Routes>
    </Router>
  );
}