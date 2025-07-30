import React from 'react';

const newEnhancements = [
  {
    icon: '🔔',
    status: 'Coming Soon',
    title: 'Automated Scholarship Alerts',
    description: 'Real-time notifications for new opportunities matching your profile',
    statusColor: 'bg-purple-100 text-purple-700',
  },
  {
    icon: '📁',
    status: 'In Development',
    title: 'Document Vault',
    description: 'Secure cloud storage for all your application documents',
    statusColor: 'bg-orange-100 text-orange-700',
  },
  {
    icon: '⭐',
    status: 'Coming Soon',
    title: 'Feedback & Rating for Scholarships',
    description: 'Community-driven reviews and ratings system',
    statusColor: 'bg-purple-100 text-purple-700',
  },
  {
    icon: '🏆',
    status: 'Live',
    title: 'Success Stories Section',
    description: 'Inspiring stories from scholarship recipients',
    statusColor: 'bg-green-100 text-green-700',
  },
];

const Enhancements = () => (
  <section className="bg-white py-20 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">Advanced Features & Enhancements</h2>
      <div className="inline-block h-1.5 w-24 bg-purple-600 rounded-full mb-6"></div>
      <p className="text-lg text-gray-600 mb-16">
        Cutting-edge enhancements to revolutionize your scholarship discovery experience
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
        {newEnhancements.map((feature, i) => (
          <div key={i} className="p-8 bg-gray-50 rounded-2xl shadow-lg relative">
            <div className="flex justify-between items-start mb-4">
              <div className="text-3xl bg-purple-100 text-purple-600 p-4 rounded-lg">
                {feature.icon}
              </div>
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${feature.statusColor}`}>
                {feature.status}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Enhancements; 