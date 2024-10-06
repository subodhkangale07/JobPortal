import React, { useEffect } from 'react';
import Navbar from './shared/navbar';
import Herosection from './Herosection';
import CategoryCarousel from './CategoryCaraousel'; // Fixed typo
import LatestJobs from './LatestJobs';
import Footer from './shared/Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  // Fetch all jobs on component mount
  useGetAllJobs();

  const navigate = useNavigate();
  const { user } = useSelector(store => store.auth);

  // Redirect recruiters to companies page
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate('/admin/companies');
    }
  }, [user, navigate]); // Added dependencies for better practice

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Herosection />
        <CategoryCarousel />
        <LatestJobs />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
