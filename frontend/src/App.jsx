// src/App.jsx
import { Routes, Route } from 'react-router-dom';  // ya no importas BrowserRouter

import Landing    from './components/UWayLanding';
import Register   from './components/UWayRegister';
import DriverForm from './components/UWayDriverForm';
import Login      from './components/UWayLogin';
import Dashboard  from './components/UWayDashboard';
import RequireAuth from './components/RequireAuth';
import Profile    from './components/UWayProfile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>

        <Route path="/"          element={<Landing />} />
        <Route path="/register"  element={<Register />} />
        <Route path="/login"     element={<Login />} />
        <Route path="/profile"   element={<Profile />} />
        <Route path="/driver_form" element={<DriverForm />} />

        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
}
