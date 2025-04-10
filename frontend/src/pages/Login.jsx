import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/Login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { email, password } = formData;
  
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      // Make an actual API request to login
      const response = await fetch('http://localhost:1317/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      
      const userData = await response.json();
      
      // Store token and user info in localStorage
      localStorage.setItem('token', userData.token);
      localStorage.setItem('userRole', userData.role);
      localStorage.setItem('userName', userData.name);
      localStorage.setItem('userId', userData._id);
      
      // Redirect based on user role
      if (userData.role === 'sponsor') {
        navigate('/sponsor/dashboard');
      } else if (userData.role === 'panel') {
        navigate('/panel/dashboard');
      } else if (userData.role === 'registrar') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="user-register-bg">
      <div className="glass-card-wrapper">
        <div className="glass-card">
          <div className="user-register-form">
            <h2>Event Flow</h2>
            <h4>Enter Your Information to Sign In</h4>
            {error && <p style={{ color: 'red', margin: '10px 0' }}>{error}</p>}
            <form onSubmit={onSubmit}>
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
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                value={password}
                onChange={onChange}
                required
              />
              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
          </div>
          <h3>Don't have an account?</h3>
          <a href="/user/register">
            <button type="button">Sign Up</button>
          </a>
          <h3>Become a Sponsor?</h3>
          <a href="/sponsor/register">
            <button type="button">Apply Now</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
