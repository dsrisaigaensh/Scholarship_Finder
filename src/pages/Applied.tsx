import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockScholarships } from '../data/scholarships';
import { useToast } from '../hooks/use-toast';
import { API_ENDPOINTS } from '../config/api';

const Applied = () => {
  const [applied, setApplied] = useState<typeof mockScholarships>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User not logged in. Please log in again.');
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`${API_ENDPOINTS.APPLIED}?userId=${userId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch applied scholarships');
        return res.json();
      })
      .then(data => {
        setApplied(
          data
            .map(app => mockScholarships.find(s => s.title === app.scholarship))
            .filter(Boolean)
        );
        setLoading(false);
      })
      .catch(err => {
        setError('Could not load applied scholarships.');
        setLoading(false);
      });
  }, []);

  // Optionally, implement cancel logic with backend if needed
  const handleCancel = (scholarshipTitle: string) => {
    const userId = localStorage.getItem('userId');
    fetch(API_ENDPOINTS.APPLIED, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, scholarship: scholarshipTitle }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to cancel application');
        setApplied(applied.filter(s => s.title !== scholarshipTitle));
        toast({
          title: 'Application Canceled',
          description: `${scholarshipTitle} has been removed from your applied list.`,
        });
      })
      .catch(() => {
        toast({
          title: 'Error',
          description: 'Could not cancel application. Please try again.',
        });
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Applied Scholarships</h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : applied.length > 0 ? (
          <div className="space-y-6">
            {applied.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-6 flex justify-between items-center">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-purple-700">{s.title}</h3>
                  <p className="text-gray-600">Provider: {s.provider}</p>
                </div>
                <div className="flex items-center gap-6">
                  <p className="text-lg font-semibold text-gray-800">{s.amount}</p>
                  <button
                    onClick={() => handleCancel(s.title)}
                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-800">No Applied Scholarships Found</h3>
            <p className="text-gray-600">Click "Apply Now" on a scholarship to track it here.</p>
            <Link to="/dashboard" className="mt-4 inline-block bg-purple-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-purple-700 transition">
              Find Scholarships
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Applied; 