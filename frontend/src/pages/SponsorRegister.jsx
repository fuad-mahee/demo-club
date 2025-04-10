import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/UserRegister.css';

function SponsorRegister() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    company: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { username, email, password, confirmPassword, phone, company, description } = formData;
  
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate form
    if(password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    
    try {
      // Make an actual API request to register the sponsor
      const response = await fetch('http://localhost:1317/api/users/regsponsor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: username,
          email,
          password,
          phone,
          company,
          description,
          role: 'sponsor'
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
      
      const userData = await response.json();
      
      // Success message and redirect to login
      alert('Sponsorship application submitted! Please wait for approval or check your email.');
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
            <h2>Sponsorship</h2>
            <h4>Enter Your Details to Apply</h4>
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
                type="text"
                placeholder="Company"
                id="company"
                name="company"
                value={company}
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
              <input
                type="password"
                placeholder="Confirm Password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
                required
              />
              <textarea
                placeholder="Describe your company and sponsorship interests"
                id="description"
                name="description"
                value={description}
                onChange={onChange}
                rows="4"
              />
              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Apply'}
              </button>
            </form>
          </div>
          <h3>Already a Sponsor?</h3>
          <a href="/login">
            <button type="button">Sign In</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default SponsorRegister;
