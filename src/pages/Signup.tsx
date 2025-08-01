import React, { useState } from 'react';
import AuthCard from '../components/AuthCard';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/use-toast';
import { API_ENDPOINTS } from '../config/api';

const Signup: React.FC = () => {
  const [accountType, setAccountType] = useState<'Student'>('Student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(API_ENDPOINTS.SIGNUP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      if (res.ok) {
        toast({
          title: 'Signup Successful!',
          description: 'You will be redirected to the login page.',
        });
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        const data = await res.json();
        toast({
          title: 'Signup Failed',
          description: data.error || 'Please try again.',
        });
      }
    } catch {
      toast({
        title: 'Network Error',
        description: 'Could not connect to server.',
      });
    }
  };

  return (
    <AuthCard
      title="Create Account"
      subtitle="Sign up to get started"
      buttonText="Sign Up as Student"
      onSubmit={handleSubmit}
      accountType={accountType}
      setAccountType={setAccountType}
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      footer={
        <span className="text-white/80">Already have an account?{' '}
          <button className="underline hover:text-white" onClick={() => navigate('/login')}>Sign in</button>
        </span>
      }
    />
  );
};

export default Signup; 