import React from 'react';

const stories = [
  {
    avatar: '👩‍🎓',
    name: 'Aisha K.',
    text: 'ScholarshipFinder helped me discover scholarships I never knew existed. I secured funding for my entire degree!'
  },
  {
    avatar: '👨‍🎓',
    name: 'Carlos M.',
    text: 'The dashboard made it easy to track deadlines and applications. Highly recommended!'
  },
  {
    avatar: '🧑‍🎓',
    name: 'Priya S.',
    text: 'I loved the personalized recommendations. The process was so much less stressful.'
  },
];

const SuccessStories = () => (
  <section className="bg-[#4C1D95] py-20 px-4">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-center text-white">Success Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stories.map((story, i) => (
          <div key={i} className="p-8 bg-white rounded-2xl shadow-lg flex flex-col items-center text-center">
            <span className="text-5xl mb-4">{story.avatar}</span>
            <div className="font-semibold mb-2 text-gray-800">{story.name}</div>
            <p className="text-gray-600 text-base">{story.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SuccessStories; 