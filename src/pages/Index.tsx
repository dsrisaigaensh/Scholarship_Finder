import React from 'react';
import Hero from '../components/Hero';
import ProblemStatement from '../components/ProblemStatement';
import ModulesOverview from '../components/ModulesOverview';
import Enhancements from '../components/Enhancements';
import SuccessStories from '../components/SuccessStories';
import ContactSupport from '../components/ContactSupport';
import AdminResponseGuarantee from '../components/AdminResponseGuarantee';
import Footer from '../components/Footer';

const Index = () => (
  <div className="bg-gray-100">
    <Hero />
    <ProblemStatement />
    <ModulesOverview />
    <Enhancements />
    <SuccessStories />
    <ContactSupport />
    <AdminResponseGuarantee />
  </div>
);

export default Index; 