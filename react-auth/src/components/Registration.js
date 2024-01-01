// src/components/Registration.js
import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    try {
      const response = await axios.post('http://localhost:5432/register', {
        username,
        password,
      });

      console.log(response.data);
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegistration}>Register</button>
    </div>
  );
};

export default Registration;
