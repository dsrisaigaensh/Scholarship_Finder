import React from 'react';
import { Link } from 'react-router-dom';

const modules = [
  {
    icon: '🛡️',
    title: 'User Authentication Module',
    description: 'Secure authentication system for students and administrators using Node.js & Express.js',
    points: [
      'Sign Up / Login for Students & Admins',
      'Secure password management with bcrypt',
    ],
  },
  {
    icon: '📖',
    title: 'Scholarship Management Module',
    description: 'Complete scholarship database management system (Admin only access)',
    points: [
      'Add/Edit/Delete scholarships with full control',
      'Manage scholarship categories and criteria',
    ],
  },
  {
    icon: '🔍',
    title: 'Advanced Search & Filter Engine',
    description: 'Comprehensive filtering and sorting system with multiple criteria',
    points: [
      'Filter by income range (Below ₹2L, ₹2-5L, etc.)',
      'Sort by deadline, amount, and relevance',
    ],
  },
  {
    icon: '🧠',
    title: 'Scholarship Recommendation System',
    description: 'Intelligent matching system using rule-based logic and student profiles',
    points: [
      'Student profile collection (academic, financial, demographic)',
      'Preference-based matching algorithm',
      'Rule-based logic with tag matching system',
      'Personalized scholarship suggestions dashboard',
    ],
  },
  {
    icon: '📝',
    title: 'Application Tracker',
    description: 'Comprehensive application management and tracking system',
    points: [
      'Bookmark and track applied scholarships',
      'Status updates: Pending/Applied/Under Review/Selected',
      'Application deadline reminders and notifications',
      'Progress tracking with visual indicators',
    ],
  },
  {
    icon: '💬',
    title: 'Feedback & Support System',
    description: 'Direct communication channel for comprehensive student support',
    points: [
      'Student query submission system with categorization',
      'Admin response dashboard with ticket management',
      '24/7 support ticketing system with priority levels',
      'Query resolution tracking and feedback loop',
    ],
  },
];

const Features = () => (
  <div className="min-h-screen bg-gradient-to-b from-[#4C1D95] to-[#2B0B5A] text-white p-8">
    <div className="max-w-7xl mx-auto">
      {/* Back Button */}
      <Link to="/" className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition mb-12">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Home
      </Link>

      {/* Header */}
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4">Complete Feature Overview</h1>
        <p className="text-xl md:text-2xl text-purple-200">
          Discover all the powerful features that make scholarship discovery simple and effective
        </p>
      </div>

      {/* Core Modules Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-3">Core System Modules</h2>
        <div className="inline-block h-1.5 w-24 bg-yellow-400 rounded-full mb-4"></div>
        <p className="text-lg text-purple-200 max-w-3xl mx-auto">
          Seven powerful modules working together to create a comprehensive scholarship management ecosystem
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {modules.map((module, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 flex flex-col items-start h-full">
            <div className="text-3xl bg-white/10 p-4 rounded-lg mb-6">{module.icon}</div>
            <h3 className="text-2xl font-bold mb-3">{module.title}</h3>
            <p className="text-purple-200 mb-6 flex-grow">{module.description}</p>
            <ul className="space-y-3">
              {module.points.map((point, j) => (
                <li key={j} className="flex items-start">
                  <span className="text-yellow-400 mr-3 mt-1">●</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Features; 