import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

const Admin: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [applicationsLoading, setApplicationsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [activeTab, setActiveTab] = useState<'users' | 'applications'>('users');
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'Admin' && role !== 'Superadmin' && role !== 'admin') {
      alert('Access denied. Admins only.');
      navigate('/');
      return;
    }
    console.log('Fetching users from /api/users...');
    fetch(API_ENDPOINTS.USERS)
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, [navigate]);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'Admin' && role !== 'Superadmin' && role !== 'admin') {
      return;
    }
    console.log('Fetching applications from /api/admin/applications...');
    fetch(API_ENDPOINTS.ADMIN_APPLICATIONS)
      .then(res => res.json())
      .then(data => {
        setApplications(data);
        setApplicationsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching applications:', err);
        setApplicationsLoading(false);
      });
  }, []);

  // Statistics
  const totalUsers = users.filter(u => u.role === 'User').length;
  const totalAdmins = users.filter(u => u.role === 'Admin' || u.role === 'Superadmin').length;
  const activeUsers = users.filter(u => u.status === 'Active').length;
  const inactiveUsers = users.filter(u => u.status !== 'Active').length;

  // Filtering
  const filteredUsers = users.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Actions
  const updateStatus = async (id: string, status: string, role: string) => {
    await fetch(API_ENDPOINTS.USER_STATUS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status, role })
    });
    setUsers(users => users.map(u => u.id === id ? { ...u, status } : u));
  };
  const deleteUser = async (id: string, role: string) => {
    await fetch(API_ENDPOINTS.DELETE_USER(id, role), { method: 'DELETE' });
    setUsers(users => users.filter(u => u.id !== id));
  };
  const promoteUser = async (id: string, newRole: string) => {
    await fetch(API_ENDPOINTS.USER_ROLE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, newRole })
    });
    setUsers(users => users.map(u => u.id === id ? { ...u, role: newRole } : u));
  };

  const handleApplicationClick = (application: any) => {
    setSelectedApplication(application);
    setShowApplicationModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-purple-700 flex flex-col items-center pt-16 pb-12">
      {/* Application Details Modal */}
      {showApplicationModal && selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-purple-700">Application Details</h2>
              <button
                onClick={() => setShowApplicationModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">Student Name</label>
                  <p className="text-lg font-medium text-gray-800">{selectedApplication.studentName}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">Email</label>
                  <p className="text-lg font-medium text-gray-800">{selectedApplication.studentEmail}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">Contact</label>
                  <p className="text-lg font-medium text-gray-800">{selectedApplication.contact}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">Date of Birth</label>
                  <p className="text-lg font-medium text-gray-800">{selectedApplication.dob}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">Gender</label>
                  <p className="text-lg font-medium text-gray-800">{selectedApplication.gender}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">Nationality</label>
                  <p className="text-lg font-medium text-gray-800">{selectedApplication.nationality}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Education Qualification</label>
                <p className="text-lg font-medium text-gray-800">{selectedApplication.education}</p>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Percentage/CGPA</label>
                <p className="text-lg font-medium text-gray-800">{selectedApplication.percentage}</p>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Scholarship Applied For</label>
                <p className="text-lg font-medium text-gray-800">{selectedApplication.scholarship}</p>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Application Date</label>
                <p className="text-lg font-medium text-gray-800">{selectedApplication.appliedAt} at {selectedApplication.appliedTime}</p>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setShowApplicationModal(false)}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Info & Stats */}
      <div className="w-full max-w-4xl mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white/80 rounded-2xl shadow p-6">
          <div>
            <h1 className="text-4xl font-extrabold text-purple-700 mb-2">Admin Panel</h1>
            <div className="text-lg text-gray-700">Welcome, {localStorage.getItem('userName')}</div>
          </div>
          <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
            <div className="bg-purple-100 text-purple-700 rounded-xl px-4 py-2 font-bold">Total Users: {totalUsers}</div>
            <div className="bg-yellow-100 text-yellow-700 rounded-xl px-4 py-2 font-bold">Admins: {totalAdmins}</div>
            <div className="bg-green-100 text-green-700 rounded-xl px-4 py-2 font-bold">Active: {activeUsers}</div>
            <div className="bg-red-100 text-red-700 rounded-xl px-4 py-2 font-bold">Inactive: {inactiveUsers}</div>
          </div>
        </div>
      </div>
      {/* Search & Filters */}
      <div className="w-full max-w-4xl flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 p-2 rounded-lg border border-purple-200"
        />
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="p-2 rounded-lg border border-purple-200">
          <option value="All">All Roles</option>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
          <option value="Superadmin">Superadmin</option>
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="p-2 rounded-lg border border-purple-200">
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      {/* Tab Navigation */}
      <div className="w-full max-w-6xl mb-6">
        <div className="flex gap-2 bg-white/80 rounded-2xl p-2">
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition ${
              activeTab === 'users' 
                ? 'bg-purple-600 text-white' 
                : 'bg-transparent text-purple-700 hover:bg-purple-100'
            }`}
          >
            Users Management
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition ${
              activeTab === 'applications' 
                ? 'bg-purple-600 text-white' 
                : 'bg-transparent text-purple-700 hover:bg-purple-100'
            }`}
          >
            Scholarship Applications
          </button>
        </div>
      </div>

      {/* User Table */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full p-6 mx-auto">
          <h2 className="text-2xl font-bold text-purple-700 mb-6">All Users</h2>
          {loading ? (
            <div className="text-center text-lg">Loading...</div>
          ) : (
            <table className="w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr className="bg-purple-100">
                  <th className="py-2 px-4 font-bold text-purple-700">Name</th>
                  <th className="py-2 px-4 font-bold text-purple-700">Email</th>
                  <th className="py-2 px-4 font-bold text-purple-700">Role</th>
                  <th className="py-2 px-4 font-bold text-purple-700">Logins</th>
                  <th className="py-2 px-4 font-bold text-purple-700">Status</th>
                  <th className="py-2 px-4 font-bold text-purple-700">Registered</th>
                  <th className="py-2 px-4 font-bold text-purple-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, i) => (
                  <tr key={i} className="bg-white rounded-xl shadow">
                    <td className="py-2 px-4 font-bold text-gray-800">{user.name}</td>
                    <td className="py-2 px-4 text-gray-700">{user.email}</td>
                    <td className="py-2 px-4">
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${user.role === 'Admin' ? 'bg-yellow-300 text-yellow-900' : user.role === 'Superadmin' ? 'bg-blue-300 text-blue-900' : 'bg-purple-200 text-purple-800'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-2 px-4 text-gray-800">{user.logins}</td>
                    <td className="py-2 px-4">
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${user.status === 'Active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>{user.status}</span>
                    </td>
                    <td className="py-2 px-4 text-gray-700">{user.registered}</td>
                    <td className="py-2 px-4 flex gap-2">
                      {user.status === 'Active' ? (
                        <button onClick={() => updateStatus(user.id, 'Inactive', user.role)} className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-semibold hover:bg-red-600">Deactivate</button>
                      ) : (
                        <button onClick={() => updateStatus(user.id, 'Active', user.role)} className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs font-semibold hover:bg-green-600">Activate</button>
                      )}
                      <button onClick={() => deleteUser(user.id, user.role)} className="bg-gray-300 text-gray-800 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-gray-400">Delete</button>
                      {user.role === 'User' && (
                        <button onClick={() => promoteUser(user.id, 'Admin')} className="bg-yellow-300 text-yellow-900 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-yellow-400">Promote</button>
                      )}
                      {user.role === 'Admin' && (
                        <button onClick={() => promoteUser(user.id, 'User')} className="bg-purple-200 text-purple-800 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-purple-300">Demote</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Applications Table */}
      {activeTab === 'applications' && (
        <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full p-6 mx-auto">
          <h2 className="text-2xl font-bold text-purple-700 mb-6">Scholarship Applications</h2>
          {applicationsLoading ? (
            <div className="text-center text-lg">Loading applications...</div>
          ) : applications.length === 0 ? (
            <div className="text-center text-lg text-gray-500">No applications found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-y-2">
                <thead>
                  <tr className="bg-purple-100">
                    <th className="py-2 px-4 font-bold text-purple-700">Student Name</th>
                    <th className="py-2 px-4 font-bold text-purple-700">Email</th>
                    <th className="py-2 px-4 font-bold text-purple-700">Scholarship</th>
                    <th className="py-2 px-4 font-bold text-purple-700">Contact</th>
                    <th className="py-2 px-4 font-bold text-purple-700">Education</th>
                    <th className="py-2 px-4 font-bold text-purple-700">Percentage</th>
                    <th className="py-2 px-4 font-bold text-purple-700">Applied Date</th>
                  </tr>
                </thead>
                                 <tbody>
                   {applications.map((app, i) => (
                     <tr key={i} className="bg-white rounded-xl shadow">
                       <td className="py-2 px-4">
                         <button
                           onClick={() => handleApplicationClick(app)}
                           className="font-bold text-purple-600 hover:text-purple-800 underline cursor-pointer text-left"
                         >
                           {app.studentName}
                         </button>
                       </td>
                       <td className="py-2 px-4">
                         <button
                           onClick={() => handleApplicationClick(app)}
                           className="text-purple-600 hover:text-purple-800 underline cursor-pointer text-left"
                         >
                           {app.studentEmail}
                         </button>
                       </td>
                       <td className="py-2 px-4 text-gray-700">
                         <span className="text-sm">{app.scholarship}</span>
                       </td>
                       <td className="py-2 px-4 text-gray-700">{app.contact}</td>
                       <td className="py-2 px-4 text-gray-700">{app.education}</td>
                       <td className="py-2 px-4 text-gray-700">{app.percentage}</td>
                       <td className="py-2 px-4 text-gray-700">
                         <div className="text-sm">
                           <div>{app.appliedAt}</div>
                           <div className="text-xs text-gray-500">{app.appliedTime}</div>
                         </div>
                       </td>
                     </tr>
                   ))}
                 </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin; 