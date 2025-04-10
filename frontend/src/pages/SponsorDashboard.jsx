import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SponsorDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    packageType: '',
    amount: '',
    message: '',
    requirements: '',
  });
  const navigate = useNavigate();

  // Sample events data (can be replaced with API call later)
  const sampleEvents = [
    {
      id: 1,
      name: "Tech Expo 2025",
      club: "Computer Science Society",
      date: "July 15, 2025",
      description: "Annual technology showcase featuring the latest innovations and student projects.",
      attendees: "500+",
      location: "Main Campus Auditorium",
      packages: [
        { name: "Gold", price: 5000, benefits: ["Logo on main banner", "VIP booth", "Keynote speech opportunity", "5 free tickets"] },
        { name: "Silver", price: 3000, benefits: ["Logo on program", "Standard booth", "3 free tickets"] },
        { name: "Bronze", price: 1000, benefits: ["Logo on website", "Shared booth space", "1 free ticket"] }
      ]
    },
    {
      id: 2,
      name: "Business Summit 2025",
      club: "Entrepreneurship Club",
      date: "August 23, 2025",
      description: "Connect with future business leaders and showcase your company's opportunities.",
      attendees: "350+",
      location: "Business School Conference Hall",
      packages: [
        { name: "Platinum", price: 4000, benefits: ["Speaking slot", "Premium booth", "Logo on all materials", "4 free passes"] },
        { name: "Gold", price: 2500, benefits: ["Booth space", "Company presentation", "Logo on digital materials", "2 free passes"] },
        { name: "Silver", price: 1200, benefits: ["Logo placement", "Shared booth space", "1 free pass"] }
      ]
    },
    {
      id: 3,
      name: "Cultural Festival 2025",
      club: "Arts & Culture Society",
      date: "September 10-12, 2025",
      description: "Three-day celebration of diverse cultures featuring performances, exhibitions, and food stalls.",
      attendees: "1000+",
      location: "University Grounds",
      packages: [
        { name: "Festival Partner", price: 7000, benefits: ["Main stage branding", "VIP area access", "Logo on all promotional materials", "10 VIP passes"] },
        { name: "Event Sponsor", price: 3500, benefits: ["Secondary stage branding", "Standard booth", "Logo on select materials", "5 passes"] },
        { name: "Community Sponsor", price: 1500, benefits: ["Logo on website and program", "Small booth space", "2 passes"] }
      ]
    },
    {
      id: 4,
      name: "Hackathon 2025",
      club: "Coding Club",
      date: "October 5-6, 2025",
      description: "48-hour coding competition where teams build innovative solutions to real-world problems.",
      attendees: "200+",
      location: "Engineering Building",
      packages: [
        { name: "Challenge Setter", price: 6000, benefits: ["Set a challenge track", "Judge panel seat", "Product showcase", "Recruitment opportunity", "5 mentors allowed"] },
        { name: "Gold Sponsor", price: 3000, benefits: ["Logo on all materials", "Booth space", "3 mentors allowed", "Recruitment opportunity"] },
        { name: "Silver Sponsor", price: 1500, benefits: ["Logo on website", "1 mentor allowed", "Promotional materials distribution"] }
      ]
    }
  ];

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        // For now, we'll use localStorage data instead of an API call
        setUser({
          name: localStorage.getItem('userName') || 'Sponsor',
          company: localStorage.getItem('company') || 'Your Company',
          role: localStorage.getItem('userRole') || 'sponsor'
        });
        
        // In a real app, we'd fetch events from the backend
        // For now, use our sample events
        setEvents(sampleEvents);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Sample stats for dashboard
  const stats = [
    { id: 1, name: 'Active Sponsorships', value: '1' },
    { id: 2, name: 'Pending Requests', value: '2' },
    { id: 3, name: 'Available Events', value: events.length },
  ];

  // Recent activities
  const activities = [
    { id: 1, date: 'Today', description: 'New event "Tech Expo 2025" is now available for sponsorship' },
    { id: 2, date: '2 days ago', description: 'Your sponsorship for Hackathon 2024 was approved' },
    { id: 3, date: '1 week ago', description: 'Updated company profile' },
  ];

  const sponsorships = [
    {
      id: 1,
      name: 'Annual Robotics Competition',
      date: 'May 20, 2025',
      club: 'Robotics Club',
      status: 'approved',
      amount: '$1,500',
      package: 'Silver'
    },
    {
      id: 2,
      name: 'Science Fair 2025',
      date: 'June 15, 2025',
      club: 'Science Society',
      status: 'pending',
      amount: '$2,000',
      package: 'Gold'
    },
    {
      id: 3,
      name: 'Graduate Job Fair',
      date: 'August 30, 2025',
      club: 'Career Development Club',
      status: 'pending',
      amount: '$1,200',
      package: 'Bronze'
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setActiveTab('sponsorForm');
    // Reset form data when selecting a new event
    setFormData({
      packageType: '',
      amount: '',
      message: '',
      requirements: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // If selecting a package, also update the amount
    if (name === 'packageType' && selectedEvent) {
      const selectedPackage = selectedEvent.packages.find(pkg => pkg.name === value);
      if (selectedPackage) {
        setFormData({
          ...formData,
          packageType: value,
          amount: selectedPackage.price
        });
        return;
      }
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSponsorSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      
      // In a real app, this would be an API call
      // Simulate API call with setTimeout
      setTimeout(() => {
        // Add the new sponsorship to the list
        const newSponsorship = {
          id: sponsorships.length + 1,
          name: selectedEvent.name,
          date: selectedEvent.date,
          club: selectedEvent.club,
          status: 'pending',
          amount: `$${formData.amount}`,
          package: formData.packageType
        };
        
        // Show success message
        alert('Sponsorship request submitted successfully! It is now pending approval.');
        
        // Return to dashboard
        setActiveTab('dashboard');
        setIsLoading(false);
        setSelectedEvent(null);
      }, 1000);
      
    } catch (error) {
      console.error('Error submitting sponsorship:', error);
      alert('Failed to submit sponsorship request. Please try again.');
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-primary">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-primary text-white">
      {/* Sidebar */}
      <div className="w-64 bg-black/30 backdrop-blur-md h-full p-5 flex flex-col">
        <div className="mb-8 border-b border-white/20 pb-4">
          <h2 className="text-2xl font-bold">Sponsor Portal</h2>
        </div>
        
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`w-full text-left py-2 px-4 rounded ${activeTab === 'dashboard' ? 'bg-primary' : 'hover:bg-white/10'}`}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('events')}
                className={`w-full text-left py-2 px-4 rounded ${activeTab === 'events' ? 'bg-primary' : 'hover:bg-white/10'}`}
              >
                Available Events
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('mySponsors')}
                className={`w-full text-left py-2 px-4 rounded ${activeTab === 'mySponsors' ? 'bg-primary' : 'hover:bg-white/10'}`}
              >
                My Sponsorships
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left py-2 px-4 rounded ${activeTab === 'profile' ? 'bg-primary' : 'hover:bg-white/10'}`}
              >
                Company Profile
              </button>
            </li>
          </ul>
        </nav>
        
        <div className="mt-auto pt-4 border-t border-white/20">
          <button 
            onClick={handleLogout}
            className="w-full text-left py-2 px-4 text-red-300 hover:bg-white/10 rounded"
          >
            Logout
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
              <p className="text-white/70">Company: {user.company}</p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {stats.map(stat => (
                <div key={stat.id} className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center">
                  <p className="text-white/70 mb-2">{stat.name}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>
            
            {/* Recent Activity */}
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 pb-2 border-b border-white/20">Recent Activity</h2>
              <ul className="space-y-4">
                {activities.map(activity => (
                  <li key={activity.id} className="flex border-l-2 border-primary pl-4 py-1">
                    <div className="w-24 text-white/70">{activity.date}</div>
                    <div>{activity.description}</div>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div onClick={() => setActiveTab('events')} className="bg-white/10 backdrop-blur-md rounded-lg p-6 cursor-pointer hover:bg-white/15 transition-all">
                <h3 className="text-xl font-bold mb-3">Browse Available Events</h3>
                <p className="text-white/70">Find new sponsorship opportunities from various clubs.</p>
              </div>
              <div onClick={() => setActiveTab('mySponsors')} className="bg-white/10 backdrop-blur-md rounded-lg p-6 cursor-pointer hover:bg-white/15 transition-all">
                <h3 className="text-xl font-bold mb-3">View Your Sponsorships</h3>
                <p className="text-white/70">Check the status of your existing sponsorship requests.</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Events Tab */}
        {activeTab === 'events' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Available Events</h1>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map(event => (
                <div key={event.id} className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-primary to-secondary p-4">
                    <h2 className="text-xl font-bold">{event.name}</h2>
                    <p className="text-white/70">{event.club}</p>
                  </div>
                  <div className="p-6">
                    <p><span className="text-white/70">Date:</span> {event.date}</p>
                    <p><span className="text-white/70">Location:</span> {event.location}</p>
                    <p><span className="text-white/70">Expected Attendees:</span> {event.attendees}</p>
                    <p className="mt-4 mb-4 text-sm">{event.description}</p>
                    <div className="mt-4">
                      <h4 className="font-bold mb-2">Sponsorship Packages:</h4>
                      <ul className="space-y-2 text-sm">
                        {event.packages.map((pkg, index) => (
                          <li key={index}>
                            <span className="font-bold">{pkg.name}:</span> ${pkg.price}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button 
                      onClick={() => handleSelectEvent(event)} 
                      className="w-full mt-6 py-2 bg-green-600 rounded hover:bg-green-700 font-bold"
                    >
                      Sponsor This Event
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* My Sponsorships Tab */}
        {activeTab === 'mySponsors' && (
          <div>
            <h1 className="text-3xl font-bold mb-8">My Sponsorships</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {sponsorships.map(sponsorship => (
                <div key={sponsorship.id} className="bg-white/10 backdrop-blur-md rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold">{sponsorship.name}</h2>
                    <span 
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        sponsorship.status === 'approved' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}
                    >
                      {sponsorship.status === 'approved' ? 'Approved' : 'Pending'}
                    </span>
                  </div>
                  <p><span className="text-white/70">Date:</span> {sponsorship.date}</p>
                  <p><span className="text-white/70">Club:</span> {sponsorship.club}</p>
                  <p><span className="text-white/70">Amount:</span> {sponsorship.amount}</p>
                  <p><span className="text-white/70">Package:</span> {sponsorship.package}</p>
                  <div className="mt-4 flex space-x-3">
                    <button className="px-4 py-2 bg-primary rounded hover:bg-opacity-80">
                      View Details
                    </button>
                    {sponsorship.status === 'pending' && (
                      <button className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white">
                        Cancel Request
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Sponsorship Form Tab */}
        {activeTab === 'sponsorForm' && selectedEvent && (
          <div>
            <button 
              onClick={() => setActiveTab('events')}
              className="flex items-center text-white/70 hover:text-white mb-6"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Events
            </button>
            
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-8">
              <h1 className="text-2xl font-bold mb-2">Sponsor {selectedEvent.name}</h1>
              <p className="text-white/70 mb-6">{selectedEvent.club} | {selectedEvent.date}</p>
              
              <form onSubmit={handleSponsorSubmit} className="space-y-6">
                <div>
                  <label className="block text-white/70 mb-2">Select Package</label>
                  <select 
                    name="packageType" 
                    value={formData.packageType}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/20 rounded p-3 text-white"
                    required
                  >
                    <option value="">-- Select a Package --</option>
                    {selectedEvent.packages.map((pkg, index) => (
                      <option key={index} value={pkg.name}>
                        {pkg.name} - ${pkg.price}
                      </option>
                    ))}
                  </select>
                </div>
                
                {formData.packageType && (
                  <div>
                    <h3 className="font-bold mb-2">Package Benefits:</h3>
                    <ul className="list-disc pl-6 mb-4 text-white/80">
                      {selectedEvent.packages
                        .find(pkg => pkg.name === formData.packageType)?.benefits
                        .map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))
                      }
                    </ul>
                  </div>
                )}
                
                <div>
                  <label className="block text-white/70 mb-2">Sponsorship Amount ($)</label>
                  <input 
                    type="number" 
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/20 rounded p-3 text-white"
                    required
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-white/70 mb-2">Message to Event Organizers</label>
                  <textarea 
                    name="message" 
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full bg-white/5 border border-white/20 rounded p-3 text-white"
                    placeholder="Introduce your company and explain why you want to sponsor this event..."
                  />
                </div>
                
                <div>
                  <label className="block text-white/70 mb-2">Special Requirements</label>
                  <textarea 
                    name="requirements" 
                    value={formData.requirements}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full bg-white/5 border border-white/20 rounded p-3 text-white"
                    placeholder="Any special requirements or requests you may have..."
                  />
                </div>
                
                <div className="flex items-center justify-between pt-4">
                  <button 
                    type="button"
                    onClick={() => setActiveTab('events')}
                    className="px-6 py-3 bg-transparent border border-white/30 rounded hover:bg-white/10"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 bg-green-600 rounded hover:bg-green-700 font-bold"
                  >
                    {isLoading ? 'Processing...' : 'Submit Sponsorship Request'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div>
            <h1 className="text-3xl font-bold mb-8">Company Profile</h1>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 max-w-2xl">
              <div className="mb-4">
                <label className="block text-sm text-white/70 mb-1">Company Name</label>
                <input 
                  type="text" 
                  defaultValue={user.company}
                  className="w-full bg-white/5 border border-white/20 rounded p-2 text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm text-white/70 mb-1">Contact Person</label>
                <input 
                  type="text" 
                  defaultValue={user.name}
                  className="w-full bg-white/5 border border-white/20 rounded p-2 text-white"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-white/70 mb-1">Email</label>
                  <input 
                    type="email" 
                    defaultValue="contact@example.com"
                    className="w-full bg-white/5 border border-white/20 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/70 mb-1">Phone</label>
                  <input 
                    type="tel" 
                    defaultValue="(123) 456-7890"
                    className="w-full bg-white/5 border border-white/20 rounded p-2 text-white"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm text-white/70 mb-1">Company Description</label>
                <textarea 
                  rows="4"
                  defaultValue="Your company description and information about your sponsorship goals."
                  className="w-full bg-white/5 border border-white/20 rounded p-2 text-white"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm text-white/70 mb-1">Sponsorship Interests</label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span>Technical Events</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Cultural Events</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span>Workshops</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Sports Events</span>
                  </label>
                </div>
              </div>
              <button className="px-6 py-2 bg-green-600 rounded hover:bg-green-700">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SponsorDashboard;