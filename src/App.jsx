import React, { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import TicketManagement from './pages/TicketManagement';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('ticketapp_session');
    if (token) {
      setIsAuthenticated(true);
      setCurrentPage('dashboard');
    }
  }, []);

  const handleAuth = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('ticketapp_session');
    localStorage.removeItem('ticketapp_user');
    setIsAuthenticated(false);
    setCurrentPage('landing');
  };

  const navigate = (page) => {
    if ((page === 'dashboard' || page === 'tickets') && !isAuthenticated) {
      setCurrentPage('login');
      return;
    }
    setCurrentPage(page);
  };

  if (currentPage === 'landing') return <LandingPage onNavigate={navigate} />;
  if (currentPage === 'login') return <AuthPage mode="login" onNavigate={navigate} onAuth={handleAuth} />;
  if (currentPage === 'signup') return <AuthPage mode="signup" onNavigate={navigate} onAuth={handleAuth} />;
  if (currentPage === 'dashboard') return <Dashboard onNavigate={navigate} onLogout={handleLogout} />;
  if (currentPage === 'tickets') return <TicketManagement onNavigate={navigate} onLogout={handleLogout} />;
}
