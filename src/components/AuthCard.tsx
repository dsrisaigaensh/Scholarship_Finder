import React from 'react';

interface AuthCardProps {
  title: string;
  subtitle: string;
  buttonText: string;
  onSubmit: (e: React.FormEvent) => void;
  accountType: 'Student';
  setAccountType: (type: 'Student') => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  name?: string;
  setName?: (name: string) => void;
  footer?: React.ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({
  title,
  subtitle,
  buttonText,
  onSubmit,
  accountType,
  setAccountType,
  email,
  setEmail,
  password,
  setPassword,
  name,
  setName,
  footer,
}) => {
  return (
    <div className="flex flex-col items-center min-h-screen justify-center" style={{ backgroundColor: '#5f23b6' }}>
      <div className="w-full max-w-md mb-4 flex justify-start">
        <a href="/" className="flex items-center px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium shadow">
          <span className="mr-2 text-lg">←</span> Back to Home
        </a>
      </div>
      <div className="w-full max-w-md p-8 bg-purple-900/80 rounded-2xl shadow-lg backdrop-blur border border-white/20">
        <h2 className="text-3xl font-bold text-white text-center mb-2">{title}</h2>
        <p className="text-white/80 text-center mb-6">{subtitle}</p>
        <form onSubmit={onSubmit} className="space-y-5">
          {/* Name field if provided */}
          {typeof name !== 'undefined' && setName && (
            <div>
              <label className="block text-white font-semibold mb-2">Name</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
                  {/* User icon */}
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/><rect x="6" y="14" width="12" height="6" rx="3" stroke="currentColor" strokeWidth="2"/></svg>
                </span>
                <input
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Enter your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
            </div>
          )}
          <div>
            <label className="block text-white font-semibold mb-2">Account Type</label>
            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition font-medium focus:outline-none bg-purple-600 text-white border-transparent"
              >
                {/* Student icon: always selected */}
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="white"/><rect x="6" y="14" width="12" height="6" rx="3" fill="white"/></svg>
                Student
              </button>
            </div>
          </div>
          <div>
            <label className="block text-white font-semibold mb-2">Email</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
                {/* Envelope icon */}
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="2"/><path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="2"/></svg>
              </span>
              <input
                type="email"
                required
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-white font-semibold mb-2">Password</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
                {/* Lock icon */}
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="8" rx="3" stroke="currentColor" strokeWidth="2"/><path d="M8 11V8a4 4 0 118 0v3" stroke="currentColor" strokeWidth="2"/></svg>
              </span>
              <input
                type="password"
                required
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold text-lg shadow hover:from-purple-700 hover:to-purple-600 transition"
          >
            {buttonText}
          </button>
        </form>
        {footer && <div className="mt-6 text-center">{footer}</div>}
      </div>
    </div>
  );
};

export default AuthCard; 