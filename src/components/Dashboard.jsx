import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('user-info');
    if (data) {
      const userData = JSON.parse(data);
      setUserInfo(userData);
    } else {
      // If no user data, navigate to login
      navigate('/login');
    }
    setLoading(false); // Set loading to false after fetching data
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user-info');
    navigate('/login');
  };

  if (loading) {
    return <div className="text-center">Loading...</div>; // Simple loading indicator
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome {userInfo?.name}</h1>
      <h3 className="text-lg text-gray-600 mb-2">{userInfo?.email}</h3>
      {userInfo?.image ? (
        <img 
          src={userInfo.image} 
          alt={userInfo.name} 
          className="w-full h-auto rounded-lg mb-4" 
        />
      ) : (
        <div className="bg-gray-200 w-full h-48 rounded-lg flex items-center justify-center text-gray-500">
          No Image Available
        </div>
      )}
      <button 
        onClick={handleLogout} 
        className="bg-blue-500 text-white rounded-lg px-4 py-2 transition duration-300 hover:bg-blue-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
