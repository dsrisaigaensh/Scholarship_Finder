import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Index from './pages/Index';
import Features from './pages/Features';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Applied from './pages/Applied';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import Admin from './pages/Admin';
import { ToastProvider } from './hooks/use-toast';

function App() {
  const [userName, setUserName] = useState<string | null>(null);

  // This effect will run when the component mounts and check localStorage
  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleLoginSuccess = (name: string) => {
    setUserName(name);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    setUserName(null);
    window.location.href = '/';
  };

  return (
    <ToastProvider>
      <Router>
        <MainApp
          userName={userName}
          onLogout={handleLogout}
          onLoginSuccess={handleLoginSuccess}
        />
      </Router>
    </ToastProvider>
  );
}

// We extract the main app into a new component to use router hooks
function MainApp({ userName, onLogout, onLoginSuccess }: any) {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName && !userName) {
      onLoginSuccess(storedName);
    }
    // Check for admin role
    const role = localStorage.getItem('role');
    setIsAdmin(role === 'admin' || role === 'Admin' || role === 'Superadmin');
    // Redirect admin to /admin if not already there
    if ((role === 'admin' || role === 'Admin' || role === 'Superadmin') && location.pathname !== '/admin') {
      window.location.href = '/admin';
    }
  }, [location, userName, onLoginSuccess]);

  if (isAdmin) {
    // Admin view: Only show Admin Panel and minimal navbar
    return (
      <div className="min-h-screen flex flex-col">
        <nav className="fixed w-full z-20 top-0 left-0 bg-[#4C1D95]">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎓</span>
              <span className="text-white text-xl font-bold">Admin Panel</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-white font-medium">Welcome, {userName}</span>
              <button onClick={onLogout} className="ml-2 px-6 py-2 bg-red-500 border border-red-500 rounded-lg text-white font-semibold hover:bg-red-600 transition">Logout</button>
            </div>
          </div>
        </nav>
        <main className="flex-1 pt-20">
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    );
  }
  // Student/regular user view
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="fixed w-full z-20 top-0 left-0 bg-[#4C1D95]">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎓</span>
            <Link to="/" className="text-white text-xl font-bold">ScholarshipFinder</Link>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-white hover:text-yellow-300 font-medium transition">Home</Link>
            <Link to="/features" className="text-white hover:text-yellow-300 font-medium transition">Features</Link>
            <Link to="/dashboard" className="text-white hover:text-yellow-300 font-medium transition">Dashboard</Link>
            {userName ? (
              <>
                <Link to="/applied" className="text-white hover:text-yellow-300 font-medium transition">Applied</Link>
                <span className="text-white font-medium">Welcome, {userName}</span>
                <button onClick={onLogout} className="ml-2 px-6 py-2 bg-red-500 border border-red-500 rounded-lg text-white font-semibold hover:bg-red-600 transition">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="ml-2 px-6 py-2 bg-purple-600 border border-purple-600 rounded-lg text-white font-semibold hover:bg-purple-700 transition">Login</Link>
                <Link to="/signup" className="ml-2 px-6 py-2 bg-yellow-400 border border-yellow-400 rounded-lg text-purple-900 font-semibold hover:bg-yellow-500 transition">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <main className="flex-1 pt-20">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/features" element={<Features />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login onLoginSuccess={onLoginSuccess} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/applied" element={<Applied />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App; 