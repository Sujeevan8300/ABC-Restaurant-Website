import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export const UserContext = createContext();
export const UserProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const [cookies, , removeCookie] = useCookies(['token']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get('http://localhost:4000/user/get-logged-in-user-details', {
          headers: {
            Authorization: `Bearer ${cookies.token}`
          }
        });
        if (response.data.status === 'success') {
          setUserRole(response.data.user.role);
          setUser(response.data.user)
        }
      } catch (error) {
        removeCookie('token');
      } finally {
        setLoading(false);
      }
    };

    if (cookies.token) {
      fetchUserRole();
    } else {
      setLoading(false);
    }
  }, [cookies.token, removeCookie]);

  const handleLogout = () => {
    removeCookie('token');
    setUserRole(null);
    
  };

  return (
    <UserContext.Provider value={{ userRole, handleLogout,user, loading }}>
      {children}
    </UserContext.Provider>
  );
};