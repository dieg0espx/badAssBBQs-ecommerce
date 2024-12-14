import React, { useState } from 'react';
import  supabase  from '../supabase';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/logo-negative.png'; // Update with the correct path to your logo

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center -mt-[120px]">
      <div className="bg-white p-8 rounded-lg border border-white sm:border-gray-200  w-[400px] sm:w-[40%] ">
        <img src={Logo} className="m-auto invert mb-[20px]" alt="Logo" />

        {error && <p className="text-red text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-center w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-center w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-red border border-red text-white font-medium rounded hover:bg-white hover:text-red-500 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
