import React, { useState } from 'react';
import { useToast } from '../hooks/use-toast';

const contactInfo = [
  { icon: '✉️', title: 'Email Support', value: 'support@scholarshipfinder.com', description: 'For general inquiries and support' },
  { icon: '📞', title: 'Phone Support', value: '1800-123-4567', description: 'Mon-Fri, 9:00 AM - 6:00 PM IST' },
  { icon: '🕒', title: 'Response Time', value: 'Within 24 hours', description: 'We guarantee quick responses' },
  { icon: '💬', title: 'Live Chat', value: 'Available 24/7', description: 'Instant help when you need it' },
];

const ContactSupport = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast({ title: 'Error', description: 'Please fill in all fields.' });
      return;
    }
    toast({ title: 'Message Sent!', description: 'We will get back to you soon.' });
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <section className="bg-gray-100 py-20 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-3xl shadow-lg">
        {/* Left Side: Form */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                id="message"
                placeholder="Describe how we can help you..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                rows={5}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right Side: Contact Info */}
        <div className="bg-gray-50 p-8 rounded-2xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Get in Touch</h2>
          <div className="flex items-center mb-8">
            <div className="h-16 w-16 rounded-full bg-purple-600 text-white flex items-center justify-center text-2xl font-bold mr-4">
              SG
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">sai ganesh</h3>
              <p className="text-gray-600">Support Team Lead</p>
            </div>
          </div>
          <div className="space-y-6">
            {contactInfo.map((info, i) => (
              <div key={i} className="flex items-start">
                <div className="text-2xl bg-purple-100 text-purple-600 p-3 rounded-lg mr-4">{info.icon}</div>
                <div>
                  <h4 className="font-bold text-gray-800">{info.title}</h4>
                  <p className="text-gray-600">{info.value}</p>
                  <p className="text-sm text-gray-500">{info.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSupport; 