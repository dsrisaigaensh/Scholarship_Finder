import React from 'react';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Students Helped', value: '10K+' },
  { label: 'Scholarships', value: '500+' },
  { label: 'Awards Given', value: '₹50Cr+' },
];

const Hero = () => (
  <section className="relative min-h-[80vh] flex flex-col justify-center items-center text-center px-4 py-16 bg-[#4C1D95]">
    {/* Badge */}
    <div className="mb-4 flex justify-center">
      <span className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-1 rounded-full text-sm font-medium shadow">
        <span className="text-lg">🎓</span> Empowering Education for All
      </span>
    </div>
    {/* Headline */}
    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white leading-tight">
      Unlock Your Future with the <span className="text-yellow-300">Right Scholarship</span>
    </h1>
    {/* Subheadline */}
    <p className="text-lg md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
      Find, Filter, and Apply – All in One Place. Discover scholarships tailored for students from economically disadvantaged backgrounds.
    </p>
    {/* CTA Buttons */}
    <div className="flex flex-col md:flex-row gap-4 justify-center mb-10">
      <Link to="/dashboard" className="bg-white text-[#6a11cb] font-bold px-8 py-3 rounded-lg shadow hover:bg-yellow-300 hover:text-[#6a11cb] transition text-lg">Get Started →</Link>
      <Link to="/features" className="bg-white/20 text-white font-bold px-8 py-3 rounded-lg border border-white/30 hover:bg-white/30 transition text-lg">Learn More</Link>
    </div>
    {/* Stats */}
    <div className="flex flex-col md:flex-row gap-6 justify-center mt-8">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white/10 text-white rounded-xl px-8 py-6 shadow flex flex-col items-center min-w-[140px]">
          <div className="text-2xl font-bold mb-1">{stat.value}</div>
          <div className="text-sm opacity-80">{stat.label}</div>
        </div>
      ))}
    </div>
  </section>
);

export default Hero; 