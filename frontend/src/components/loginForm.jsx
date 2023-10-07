import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ handleLogin }) => {
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
        const response = await axios.post('/api/login', {
          username,
          password,
        });
  
        // Store the token in local storage or cookies
        const token = response.data.token;
        localStorage.setItem('token', token);
  
        // Call the parent handleLogin function to handle successful login
        handleLogin();
      } catch (error) {
        setError(error.response.data.error);
      }
    };
  
    const handleForgotPassword = () => {
      // Redirect the user to the forgot password page
      // Replace '/forgot-password' with the desired forgot password route
      window.location.href = '/forgot-password';
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Email Address"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
          />
          <p>
            <button onClick={handleForgotPassword}>Forgot password?</button>
          </p>
        </div>
        {error && <div>{error}</div>}
        <button type="submit">Login</button>
      </form>
    );
  };
  

export default LoginForm;