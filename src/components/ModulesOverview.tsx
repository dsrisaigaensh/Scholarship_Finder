import React from 'react';

const modules = [
  { icon: '🔍', name: 'Scholarship Search' },
  { icon: '📊', name: 'Dashboard' },
  { icon: '⚙️', name: 'Advanced Filtering' },
  { icon: '🌟', name: 'Success Stories' },
  { icon: '💬', name: 'Support' },
];

const ModulesOverview = () => (
  <section className="bg-[#4C1D95] py-20 px-4">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-center text-white">System Modules</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {modules.map((mod, i) => (
          <div key={i} className="p-8 bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center text-center h-48">
            <span className="text-5xl mb-4">{mod.icon}</span>
            <span className="font-semibold text-lg text-gray-800">{mod.name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ModulesOverview; 