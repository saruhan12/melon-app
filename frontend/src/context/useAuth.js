import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { authenticated_user, login, logout, register } from '../api/endpoints';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const nav = useNavigate();
    
    const get_authenticated_user = async () => {
        try {
          const user = await authenticated_user();
          setUser(user);
        } catch (error) {
          setUser(null); // If the request fails, set the user to null
        } finally {
          setLoading(false); // Set loading to false after request completes
        }
    };

    const loginUser = async (username, password) => {
        const user = await login(username, password)
        if (user) {
          setUser(user)
          nav('/home')
        } else {
          alert('Incorrect username or password')
        }
    }

    const logoutUser = async () => {
      await logout();
      nav('/login')
    }

    const registerUser = async (username, email, password, confirm_password) => {
      try {
          if (password === confirm_password) {
              const response = await register(username, email, password);
              console.log('Registration successful:', response); // Log response
              alert('User successfully registered');
              nav('/login');
          } else {
              alert('Passwords do not match');
          }
      } catch (error) {
          console.error('Error registering user:', error.response || error.message); // Log error details
          alert(`Error registering user: ${error.response?.data || error.message}`);
      }
  };
  

    useEffect(() => {
        get_authenticated_user();
    }, [window.location.pathname])

    return (
        <AuthContext.Provider value={{ user, loading, loginUser, logoutUser, registerUser }}>
          {children}
        </AuthContext.Provider>
      );
}

export const useAuth = () => useContext(AuthContext);