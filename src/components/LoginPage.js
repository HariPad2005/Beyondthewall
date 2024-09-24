import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAvatar } from './AvatarContext';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { selectedAvatar } = useAvatar();

  const handleLogin = async () => {
    const loginData = { username, password };

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (data.success) {
        // Handle successful login (e.g., navigate to a different page)
        navigate('/timer');
      } else {
        // Handle login failure (e.g., display error message)
        alert(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login-page">
      <video autoPlay loop muted className="background-video">
        <source src={`${process.env.PUBLIC_URL}/Login_Vid.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="container">
        {/* Display the selected avatar at the top center */}
        {selectedAvatar && (
          <div className="selected-avatar-top">
            <img src={selectedAvatar.smallImg} alt={selectedAvatar.name} className="avatar-small-top" />
          </div>
        )}
        <h1>Enter the Realm</h1>
        <input
          type="text"
          placeholder="Username"
          className="username-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="password-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="buttons">
          <button onClick={() => navigate('/select-avatar')} className="avatar-button">Select Avatar</button>
          <button onClick={handleLogin} className="login-button">Begin Your Quest</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
