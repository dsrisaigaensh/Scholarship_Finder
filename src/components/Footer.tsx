import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-[#111827] text-gray-300 py-16 px-4">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Column 1: Brand and Socials */}
      <div className="md:col-span-1">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl bg-purple-600 p-2 rounded-lg">🎓</span>
          <span className="text-white text-xl font-bold">Scholarship Finder</span>
        </div>
        <p className="text-sm mb-6">
          Empowering underprivileged students to access quality education through comprehensive scholarship discovery and application support.
        </p>
        <div className="flex gap-4">
          <a href="#" className="text-gray-400 hover:text-white"><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg></a>
          <a href="#" className="text-gray-400 hover:text-white"><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.206v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-3.096 0 1.548 1.548 0 013.096 0zM6.554 7.765v8.59H3.446v-8.59h3.108zM17.93 2.5H6.07C4.148 2.5 2.5 4.148 2.5 6.07v11.861C2.5 19.852 4.148 21.5 6.07 21.5h11.861C19.852 21.5 21.5 19.852 21.5 17.93V6.07C21.5 4.148 19.852 2.5 17.93 2.5z" clipRule="evenodd" /></svg></a>
          <a href="#" className="text-gray-400 hover:text-white"><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5C6.73 2.5 2.5 6.73 2.5 12c0 2.52.97 4.82 2.58 6.58L2.5 21.5l2.92-2.58A9.44 9.44 0 0012 21.5c5.27 0 9.5-4.23 9.5-9.5S17.27 2.5 12 2.5zm1.53 12.42H10.5v-1.5h3.03v1.5zm0-3h-3.03v-1.5h3.03v1.5z" /></svg></a>
          <a href="#" className="text-gray-400 hover:text-white"><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 6.13l9.5 5.25 9.5-5.25V4.5h-19v1.63zM21.5 8.13L12 13.75 2.5 8.13v9.8c0 .82.68 1.5 1.5 1.5h16c.82 0 1.5-.68 1.5-1.5v-9.8z" /></svg></a>
        </div>
      </div>

      {/* Column 2: Platform Links */}
      <div>
        <h3 className="text-white font-semibold mb-4">Platform</h3>
        <ul className="space-y-3">
          <li><Link to="/features" className="hover:text-white">Home</Link></li>
          <li><Link to="/features" className="hover:text-white">Features</Link></li>
          <li><Link to="/dashboard" className="hover:text-white">Scholarships</Link></li>
          <li><Link to="/" className="hover:text-white">Success Stories</Link></li>
        </ul>
      </div>

      {/* Column 3: Support Links */}
      <div>
        <h3 className="text-white font-semibold mb-4">Support</h3>
        <ul className="space-y-3">
          <li><Link to="/" className="hover:text-white">Contact Us</Link></li>
          <li><Link to="/" className="hover:text-white">Help Center</Link></li>
          <li><Link to="/" className="hover:text-white">Documentation</Link></li>
          <li><Link to="/" className="hover:text-white">FAQs</Link></li>
        </ul>
      </div>

      {/* Column 4: Legal Links */}
      <div>
        <h3 className="text-white font-semibold mb-4">Legal</h3>
        <ul className="space-y-3">
          <li><Link to="/" className="hover:text-white">Terms of Use</Link></li>
          <li><Link to="/" className="hover:text-white">Privacy Policy</Link></li>
          <li><Link to="/" className="hover:text-white">Cookie Policy</Link></li>
          <li><Link to="/" className="hover:text-white">Accessibility</Link></li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer; 