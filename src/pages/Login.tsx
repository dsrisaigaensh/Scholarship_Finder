import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/use-toast';

const Login = ({ onLoginSuccess }: { onLoginSuccess: (name: string) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [accountType, setAccountType] = useState<'student' | 'admin'>('student');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting login form', email, password, accountType); // Debug log
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    try {
      const endpoint = accountType === 'admin'
        ? 'http://localhost:4000/api/admin/login'
        : 'http://localhost:4000/api/login';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      console.log('Login response status:', res.status, 'data:', data); // Debugging line
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.name);
        if (data.userId && data.userId !== 'undefined') {
          localStorage.setItem('userId', data.userId);
        }
        if (data.role) {
          localStorage.setItem('role', data.role);
        }
        onLoginSuccess(data.name); // Notify parent component
        toast({
          title: 'Login Successful!',
          description: `Welcome back, ${data.name}!`,
        });
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch {
      setError('Network error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: '#521891' }}>
      {/* Back to Home Button */}
      <div className="w-full max-w-md mb-4 flex justify-start">
        <a href="/" className="flex items-center px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium shadow">
          <span className="mr-2 text-lg">←</span> Back to Home
        </a>
      </div>
      
      {/* Login Box */}
      <div className="w-full max-w-md p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">Welcome Back</h1>
        <p className="text-gray-600 text-center mb-6">Sign in to your account</p>
        
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Account Type Selection */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Account Type</label>
            <div className="flex gap-3">
              <button
                type="button"
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition font-medium focus:outline-none ${
                  accountType === 'student' 
                    ? 'bg-purple-600 text-white border-transparent' 
                    : 'bg-transparent text-purple-600 border-purple-600 hover:bg-purple-50'
                }`}
                onClick={() => setAccountType('student')}
              >
                <span className="text-lg">👨‍🎓</span>
                Student
              </button>
              <button
                type="button"
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition font-medium focus:outline-none ${
                  accountType === 'admin' 
                    ? 'bg-purple-600 text-white border-transparent' 
                    : 'bg-transparent text-purple-600 border-purple-600 hover:bg-purple-50'
                }`}
                onClick={() => setAccountType('admin')}
              >
                <span className="text-lg">👨‍💼</span>
                Admin
              </button>
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="2"/>
                  <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </span>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <rect x="5" y="11" width="14" height="8" rx="3" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 11V8a4 4 0 118 0v3" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(v => !v)}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" stroke="currentColor" strokeWidth="2"/>
                    <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold text-lg shadow hover:from-purple-700 hover:to-purple-600 transition"
          >
            {accountType === 'admin' ? 'Sign In as Admin' : 'Sign In'}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <span className="text-gray-600">Don't have an account?{' '}
            <button 
              className="text-purple-600 hover:text-purple-700 font-semibold underline"
              onClick={() => navigate('/signup')}
            >
              Sign up
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login; 