import React, {  useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });
      const {token, user} = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      // console.log(token)
      console.log("User Data Below\n")
      console.log(user);
      window.location.href = '/'

    } catch (error) {
      console.error(error.response.data);
      setError(error.response.data.error);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-800 " style={{backgroundImage: 'url("https://images.unsplash.com/photo-1519705129143-43afdfe43ac7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1937&q=80")', backgroundSize: 'cover', overflow: 'hidden'}}>
      <div class="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
      <form onSubmit={handleSubmit} className="rounded-lg  mb-4">
        <h2 className="text-3xl text-white font-bold mb-4">Log in</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-white">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder='Username'
            className="w-full pr-16 pl-4 py-2 text-left border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-white">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder='Password'
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-400 "
          />
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-rose-800 to-pink-800 hover:from-rose-600 hover:to-pink-700 text-white py-2 px-4 rounded-md mb-4"
        >
          Login
        </button>
      </form>
      </div>
    </div>
  );  
};

export default LoginPage;
