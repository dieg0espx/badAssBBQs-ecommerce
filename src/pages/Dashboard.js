import React from 'react';
import supabase from '../supabase';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100  -mt-[120px]">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>
      <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
