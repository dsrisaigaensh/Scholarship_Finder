import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockScholarships } from '../data/scholarships'; // Import from new location
import { useToast } from '../hooks/use-toast';
import { API_ENDPOINTS } from '../config/api';

const stats = [
  { icon: '📚', label: 'Total Scholarships', value: '1,250', description: 'MongoDB Database' },
  { icon: '👥', label: 'Active Users', value: '15,420', description: 'Students & Admins' },
  { icon: '📈', label: 'Success Rate', value: '87%', description: 'Application Success' },
  { icon: '⚙️', label: 'Applications', value: '45,680', description: 'Tracked & Managed' },
];

const Dashboard = () => {
  // State for the filter inputs
  const [query, setQuery] = useState('');
  const [incomeRange, setIncomeRange] = useState('');
  const [category, setCategory] = useState('');
  const [academicLevel, setAcademicLevel] = useState('');
  const [gender, setGender] = useState('');

  // State for the final, displayed list of scholarships
  const [filteredScholarships, setFilteredScholarships] = useState(mockScholarships);

  // State for the filters that have been *applied* by the user
  const [appliedFilters, setAppliedFilters] = useState({
    query: '',
    incomeRange: '',
    category: '',
    academicLevel: '',
    gender: '',
  });

  const { toast } = useToast();

  // Modal state
  const [showForm, setShowForm] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState<any>(null);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    contact: '',
    nationality: '',
    education: '',
    percentage: ''
  });
  const [submitting, setSubmitting] = useState(false);

  // This effect runs ONLY when the appliedFilters state changes
  useEffect(() => {
    let scholarships = mockScholarships;
    const filters = appliedFilters;

    // Filter by search query
    if (filters.query) {
      scholarships = scholarships.filter(s =>
        s.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        s.provider.toLowerCase().includes(filters.query.toLowerCase())
      );
    }

    // Filter by category
    if (filters.category) {
      scholarships = scholarships.filter(s => s.tags.includes(filters.category));
    }

    // Filter by academic level
    if (filters.academicLevel) {
      scholarships = scholarships.filter(s => s.academicLevel === filters.academicLevel || s.academicLevel === 'All');
    }

    // Filter by gender
    if (filters.gender && filters.gender !== 'All') {
      scholarships = scholarships.filter(s => s.gender === filters.gender || s.gender === 'All');
    }

    // Filter by income range
    if (filters.incomeRange) {
      const rangeMap = {
        'Below ₹2 Lakhs': (val: number) => val <= 2,
        '₹2-5 Lakhs': (val: number) => val > 2 && val <= 5,
        '₹5-8 Lakhs': (val: number) => val > 5 && val <= 8,
        'Above ₹8 Lakhs': (val: number) => val > 8,
      };
      // @ts-ignore
      scholarships = scholarships.filter(s => rangeMap[filters.incomeRange](s.incomeMaxLPA));
    }
    
    setFilteredScholarships(scholarships);
  }, [appliedFilters]); // The magic is here: this code only runs when filters are applied

  // This function is called when the user clicks the button
  const handleApplyFilters = () => {
    setAppliedFilters({ query, incomeRange, category, academicLevel, gender });
  };

  const handleTrack = (scholarship: typeof mockScholarships[0]) => {
    setSelectedScholarship(scholarship);
    setShowForm(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User not logged in. Please log in again.');
      setSubmitting(false);
      return;
    }
    
    const requestBody = { 
      userId, 
      scholarship: selectedScholarship.title,
      firstName: form.firstName,
      lastName: form.lastName,
      dob: form.dob,
      gender: form.gender,
      contact: form.contact,
      nationality: form.nationality,
      education: form.education,
      percentage: form.percentage
    };
    
    console.log('Frontend sending data:', requestBody);
    
    // Send to backend
    try {
      const res = await fetch(API_ENDPOINTS.APPLY, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });
      if (res.ok) {
        toast({ title: 'Application Submitted!', description: `Your application for ${selectedScholarship.title} has been submitted successfully.` });
      } else {
        const data = await res.json();
        toast({ title: 'Error', description: data.error || 'Could not save application details.' });
      }
    } catch {
      toast({ title: 'Error', description: 'Could not save application details.' });
    }
    setShowForm(false);
    setForm({ firstName: '', lastName: '', dob: '', gender: '', contact: '', nationality: '', education: '', percentage: '' });
    setSubmitting(false);
  };

  const incomeOptions = ['Below ₹2 Lakhs', '₹2-5 Lakhs', '₹5-8 Lakhs', 'Above ₹8 Lakhs'];
  const categoryOptions = ['Engineering', 'Medical', 'Arts', 'Commerce', 'Science', 'Law', 'Sports', 'Design', 'Journalism', 'Govt-Exams', 'Rural'];
  const genderOptions = ['All', 'Male', 'Female'];
  const academicLevelOptions = ['School', 'Undergraduate', 'Postgraduate', 'Research'];


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white p-8">
      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <form onSubmit={handleFormSubmit} className="bg-white text-gray-900 rounded-2xl shadow-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Apply for {selectedScholarship?.title}</h2>
            <div className="mb-3">
              <label className="block mb-1 font-semibold">First Name</label>
              <input name="firstName" value={form.firstName} onChange={handleFormChange} required className="w-full border rounded-lg p-2" />
            </div>
            <div className="mb-3">
              <label className="block mb-1 font-semibold">Last Name</label>
              <input name="lastName" value={form.lastName} onChange={handleFormChange} required className="w-full border rounded-lg p-2" />
            </div>
            <div className="mb-3">
              <label className="block mb-1 font-semibold">Date Of Birth</label>
              <input type="date" name="dob" value={form.dob} onChange={handleFormChange} required className="w-full border rounded-lg p-2" />
            </div>
            <div className="mb-3">
              <label className="block mb-1 font-semibold">Gender</label>
              <select name="gender" value={form.gender} onChange={handleFormChange} required className="w-full border rounded-lg p-2">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="block mb-1 font-semibold">Contact Details</label>
              <input name="contact" value={form.contact} onChange={handleFormChange} required className="w-full border rounded-lg p-2" />
            </div>
            <div className="mb-3">
              <label className="block mb-1 font-semibold">Nationality</label>
              <input name="nationality" value={form.nationality} onChange={handleFormChange} required className="w-full border rounded-lg p-2" />
            </div>
            <div className="mb-3">
              <label className="block mb-1 font-semibold">Education Qualification</label>
              <input name="education" value={form.education} onChange={handleFormChange} required className="w-full border rounded-lg p-2" />
            </div>
            <div className="mb-3">
              <label className="block mb-1 font-semibold">Percentage / CGPA</label>
              <input name="percentage" value={form.percentage} onChange={handleFormChange} required className="w-full border rounded-lg p-2" />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
              <button type="submit" disabled={submitting} className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition">{submitting ? 'Submitting...' : 'Submit'}</button>
            </div>
          </form>
        </div>
      )}
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition mb-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Scholarship Dashboard</h1>
          <p className="text-lg text-purple-200 max-w-3xl mx-auto">
            Find, filter, and apply for scholarships tailored to your profile using our advanced search engine
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-purple-200">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-xs text-purple-300">{stat.description}</p>
              </div>
              <div className="text-3xl bg-white/10 p-4 rounded-lg">{stat.icon}</div>
            </div>
          ))}
        </div>

        {/* Search and Filter Engine */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Advanced Search & Filter Engine</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <select value={incomeRange} onChange={(e) => setIncomeRange(e.target.value)} className="bg-white/10 rounded-lg p-3 w-full outline-none appearance-none">
                <option value="">Income Range</option>
                {incomeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <svg className="h-5 w-5 text-white absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </div>
            <div className="relative">
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-white/10 rounded-lg p-3 w-full outline-none appearance-none">
                <option value="">Category</option>
                {categoryOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <svg className="h-5 w-5 text-white absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </div>
            <div className="relative">
              <select value={academicLevel} onChange={(e) => setAcademicLevel(e.target.value)} className="bg-white/10 rounded-lg p-3 w-full outline-none appearance-none">
                <option value="">Academic Level</option>
                {academicLevelOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <svg className="h-5 w-5 text-white absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </div>
            <div className="relative">
              <select value={gender} onChange={(e) => setGender(e.target.value)} className="bg-white/10 rounded-lg p-3 w-full outline-none appearance-none">
                <option value="">Gender</option>
                {genderOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <svg className="h-5 w-5 text-white absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </div>
            <button onClick={handleApplyFilters} className="bg-white text-purple-900 rounded-lg p-3 w-full font-semibold transition flex items-center justify-center gap-2 hover:bg-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L13 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 019 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" /></svg>
              Apply Filters
            </button>
          </div>
          <input
            type="text"
            placeholder="Search scholarships by title, provider, or keywords..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white/10 rounded-lg p-3 mt-4 outline-none"
          />
        </div>

        {/* Scholarship List */}
        <div className="space-y-6">
          {filteredScholarships.length > 0 ? (
            filteredScholarships.map((s, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-bold">{s.title}</h3>
                  <p className="text-sm text-purple-200">Provider: {s.provider}</p>
                  <p className="text-sm text-purple-200">Eligibility: {s.eligibility}</p>
                  <div className="flex gap-2 mt-2">
                    {s.tags.map(tag => (
                      <span key={tag} className={`px-2 py-1 text-xs rounded-full ${tag === 'Open' ? 'bg-green-500/20 text-green-300' : 'bg-purple-500/20 text-purple-300'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-2xl font-bold text-yellow-400">{s.amount}</p>
                  <p className="text-xs text-purple-300 mb-3">Last Date: {s.lastDate}</p>
                  <button
                    onClick={() => handleTrack(s)}
                    className="bg-yellow-400 text-purple-900 font-bold px-6 py-2 rounded-lg hover:bg-yellow-500 transition"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 bg-white/5 rounded-2xl">
              <h3 className="text-xl font-bold">No Scholarships Found</h3>
              <p className="text-purple-200">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 