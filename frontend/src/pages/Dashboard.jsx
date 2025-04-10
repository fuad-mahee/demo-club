import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    const userRole = localStorage.getItem('userRole');

    if (userName) {
      setUser({
        name: userName,
        role: userRole
      });
    }

    // Fetch sample events (this would be an API call in a real app)
    const sampleEvents = [
      {
        id: 1,
        name: "Tech Expo 2025",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        club: "Computer Science Society",
        date: "July 15, 2025",
        description: "Annual technology showcase featuring the latest innovations and student projects."
      },
      {
        id: 2,
        name: "Business Summit 2025",
        image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        club: "Entrepreneurship Club",
        date: "August 23, 2025",
        description: "Connect with future business leaders and showcase your company's opportunities."
      },
      {
        id: 3,
        name: "Cultural Festival 2025",
        image: "https://images.unsplash.com/photo-1472653431158-6364773b2a56?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        club: "Arts & Culture Society",
        date: "September 10-12, 2025",
        description: "Three-day celebration of diverse cultures featuring performances, exhibitions, and food stalls."
      }
    ];

    setEvents(sampleEvents);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-primary">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-primary text-white overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative w-full">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="h-[500px] w-full bg-[url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 absolute inset-0 z-20 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Event Flow</h1>
          <p className="text-lg md:text-xl max-w-2xl">Your ultimate platform for club events and sponsorship opportunities. Connect, collaborate, and create memorable experiences.</p>
          
          {user ? (
            <div className="mt-8 flex flex-wrap gap-4">
              <button 
                onClick={() => navigate('/user/events')} 
                className="px-6 py-3 bg-primary hover:bg-opacity-80 rounded-lg font-bold transition"
              >
                Browse Events
              </button>
              
              {user.role === 'sponsor' && (
                <button 
                  onClick={() => navigate('/sponsor/dashboard')} 
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold transition"
                >
                  Sponsor Dashboard
                </button>
              )}
            </div>
          ) : (
            <div className="mt-8 flex flex-wrap gap-4">
              <button 
                onClick={() => navigate('/login')} 
                className="px-6 py-3 bg-primary hover:bg-opacity-80 rounded-lg font-bold transition"
              >
                Sign In
              </button>
              <button 
                onClick={() => navigate('/user/register')} 
                className="px-6 py-3 border border-white hover:bg-white hover:text-primary rounded-lg font-bold transition"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Featured Events Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Featured Events</h2>
          <p className="text-white/70">Discover exciting opportunities from various clubs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map(event => (
            <div key={event.id} className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden transform transition hover:scale-105">
              <div className="h-48 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{event.name}</h3>
                <p className="text-sm text-white/70 mb-1">
                  <span className="font-medium">Organized by:</span> {event.club}
                </p>
                <p className="text-sm text-white/70 mb-3">
                  <span className="font-medium">Date:</span> {event.date}
                </p>
                <p className="text-sm mb-4">{event.description}</p>
                <div className="flex justify-between">
                  <button className="px-4 py-2 bg-primary rounded hover:bg-opacity-80">
                    Learn More
                  </button>
                  {user?.role === 'sponsor' && (
                    <button className="px-4 py-2 bg-green-600 rounded hover:bg-green-700">
                      Sponsor This Event
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="px-6 py-3 border border-white hover:bg-white hover:text-primary rounded-lg font-bold transition">
            View All Events
          </button>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="w-full bg-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">How It Works</h2>
            <p className="text-white/70">Simple steps to get started</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Create an Account</h3>
              <p>Register as a user, club representative, or sponsor to access different features.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Browse Opportunities</h3>
              <p>Explore upcoming events or sponsorship opportunities based on your interests.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Connect & Collaborate</h3>
              <p>Register for events or apply for sponsorships to create meaningful partnerships.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl max-w-3xl mx-auto mb-8">
          Join our platform today to connect with clubs, events, and sponsorship opportunities.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => navigate('/user/register')} 
            className="px-6 py-3 bg-primary hover:bg-opacity-80 rounded-lg font-bold transition"
          >
            Register Now
          </button>
          <button 
            onClick={() => navigate('/sponsor/register')} 
            className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold transition"
          >
            Become a Sponsor
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-black/30 backdrop-blur-md py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-4">Event Flow</h3>
              <p className="text-white/70 max-w-md">
                Connecting clubs with sponsors and participants for 
                successful event collaborations.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-lg mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="/" className="text-white/70 hover:text-white">Home</a></li>
                  <li><a href="/events" className="text-white/70 hover:text-white">Events</a></li>
                  <li><a href="/login" className="text-white/70 hover:text-white">Sign In</a></li>
                  <li><a href="/user/register" className="text-white/70 hover:text-white">Register</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-4">Contact</h4>
                <ul className="space-y-2">
                  <li className="text-white/70">info@eventflow.com</li>
                  <li className="text-white/70">+1 (123) 456-7890</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/70">
            <p>© {new Date().getFullYear()} Event Flow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;