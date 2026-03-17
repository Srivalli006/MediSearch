import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Auth from './pages/Auth';
import SearchPage from './pages/Search';
import PharmacyDashboard from './pages/PharmacyDashboard';
import AdminDashboard from './pages/AdminDashboard';
import MedicineDetail from './pages/MedicineDetail';
import './styles/index.css';

function App() {
  return (
    <Router>
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main className="animate-fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column', marginTop: '70px' }}>
          <Routes>
            <Route path="/"                   element={<Home />} />
            <Route path="/auth"               element={<Auth />} />
            <Route path="/search"             element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
            <Route path="/medicine/:id"       element={<ProtectedRoute><MedicineDetail /></ProtectedRoute>} />
            <Route path="/pharmacy-dashboard" element={<PharmacyDashboard />} />
            <Route path="/admin-dashboard"    element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
