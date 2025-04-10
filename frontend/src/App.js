import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import UserRegister from './pages/UserRegister';
import SponsorRegister from './pages/SponsorRegister';
import SponsorDashboard from './pages/SponsorDashboard';

// Protected route component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const userRole = localStorage.getItem('userRole');
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function AppLayout() {
  const location = useLocation();
  
  // Routes that don't need the header
  const hideHeaderOnPaths = [
    '/', // Hide on main dashboard
    '/sponsor/dashboard',
    '/login',
    '/user/register',
    '/sponsor/register'
  ];
  
  const shouldShowHeader = !hideHeaderOnPaths.includes(location.pathname);

  return (
    <div className="container">
      {shouldShowHeader && <Header />}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/sponsor/register" element={<SponsorRegister />} />
        
        {/* Protected routes */}
        <Route 
          path="/sponsor/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['sponsor']}>
              <SponsorDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;