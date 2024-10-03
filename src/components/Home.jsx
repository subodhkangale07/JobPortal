import React, { useEffect } from 'react'
import Navbar from './shared/navbar'
import Herosection from './Herosection'
import CategoryCaraousel from './CategoryCaraousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  useGetAllJobs();
  const navigate = useNavigate();
  const { user } = useSelector(store => store.auth);
  useEffect(() => {
    if (user?.role == 'recruiter') {
      navigate('/admin/companies');
    }
  }, [])

  return (
    <div>
      <Navbar />
      <Herosection />
      <CategoryCaraousel />
      <LatestJobs />
      <Footer />

    </div>
  )
}

export default Home