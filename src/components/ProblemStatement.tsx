import React from 'react';

const problems = [
  {
    icon: '⚠️',
    title: 'Lack of Awareness',
    description: 'Many students are unaware of available scholarships',
  },
  {
    icon: '🔍',
    title: 'Poor Accessibility',
    description: 'Complex search processes and scattered information',
  },
  {
    icon: '📄',
    title: 'Eligibility Confusion',
    description: 'Unclear requirements and application processes',
  },
  {
    icon: '👥',
    title: 'Limited Guidance',
    description: 'Insufficient support and mentorship for applications',
  },
];

const ProblemStatement = () => (
  <section className="bg-white py-20 px-4">
    <div className="max-w-5xl mx-auto text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">The Problem We Solve</h2>
      <div className="inline-block h-1.5 w-24 bg-purple-600 rounded-full mb-6"></div>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-16">
        Despite numerous scholarships being available, many underprivileged students remain unaware or unable to access them due to poor accessibility, eligibility complexity, or lack of guidance. <span className="text-purple-600 font-semibold">We simplify the entire process.</span>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {problems.map((problem, i) => (
          <div key={i} className="p-6 bg-gray-50 rounded-2xl shadow-lg text-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 mb-5 text-white mx-auto">
              <span className="text-3xl">{problem.icon}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{problem.title}</h3>
            <p className="text-gray-600 text-sm">{problem.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProblemStatement; 