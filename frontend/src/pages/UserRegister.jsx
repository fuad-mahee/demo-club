import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/UserRegister.css';

function UserRegister() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    club: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { username, email, password, phone, club } = formData;
  
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Updated fetch URL to use the full backend URL instead of relying on proxy
      const response = await fetch('http://localhost:1317/api/users/reguser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: username,
          email,
          password,
          phone,
          club
        }),
      });
      
      // Parse the JSON response
      const data = await response.json();
      
      // Check if the request was successful
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      // Store user info in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', data.role);
      localStorage.setItem('userName', data.name);
      
      // Inform user of success
      alert('Registration successful!');
      
      // Redirect to login or dashboard
      navigate('/login');
      
    } catch (error) {
      setError(error.message || 'Registration failed. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="user-register-bg">
      <div className="glass-card-wrapper">
        <div className="glass-card">
          <div className="user-register-form">
            <h2>User Registration</h2>
            <h4>Enter Your Details</h4>
            {error && <p style={{ color: 'red', margin: '10px 0' }}>{error}</p>}
            <form onSubmit={onSubmit}>
              <input
                type="text"
                placeholder="Name"
                id="username"
                name="username"
                value={username}
                onChange={onChange}
                required
              />
              <input
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
              <input
                type="tel"
                placeholder="Phone"
                id="phone"
                name="phone"
                value={phone}
                onChange={onChange}
                required
              />
              <input
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                value={password}
                onChange={onChange}
                required
              />
              <select 
                id="club" 
                name="club" 
                value={club}
                onChange={onChange}
              >
                <option value="">Select a club</option>
                <option value="club1">Club 1</option>
                <option value="club2">Club 2</option>
                <option value="club3">Club 3</option>
              </select>
              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
          <h3>Already have an account?</h3>
          <a href="/login">
            <button type="button">Sign In</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default UserRegister;
