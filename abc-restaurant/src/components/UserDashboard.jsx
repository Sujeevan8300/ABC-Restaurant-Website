import React, { useEffect, useContext } from "react";
import { UserContext } from '../components/UserContext';
import { useNavigate } from "react-router-dom";
import NavBar from '../components/Navigation';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, loading } = useContext(UserContext);

  useEffect(() => {
    if (!loading) { // Check if loading is complete
      if (user) {
        switch (user.role) {
          case 'admin':
            navigate('/admin-dashboard');
            break;
          case 'customer':
            navigate('/customer-dashboard');
            break;
          case 'staff':
            navigate('/staff-dashboard');
            break;
          default:
            navigate('/'); 
        }
      } else {
        navigate('/'); // Redirect to a default page if no user data
      }
    }
  }, [user, loading, navigate]);

  return (
    <div>
      <NavBar />
      <h1>Welcome, {user?.role}</h1>
    </div>
  );
};

export default UserDashboard;
