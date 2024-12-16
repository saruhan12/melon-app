import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { ChakraProvider, Box, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthProvider, useAuth } from "./context/useAuth";
import Login from "./routes/Login";
import Register from "./routes/register";
import Home from "./routes/Home";
import Search from "./routes/Search";
import Profile from "./routes/Profile";
import { BookProvider } from "./context/BookContext";

import MelonImage from "./melon.webp";

const TopBar = () => {
  const { logoutUser } = useAuth(); // Use the logout function from AuthContext

  return (
    <Box
      backgroundColor="#f0f0ee"
      height="70px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding="0 20px"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      position="fixed"
      width="100%"
      zIndex="1000"
    >
      {/* Left Section: Logo and Navigation */}
      <Box display="flex" alignItems="center" gap="10px">
        <img
          src={MelonImage}
          alt="App Symbol"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <Link to="/home">
          <Button colorScheme="red" borderRadius="40px">
            Home
          </Button>
        </Link>
        <Link to="/search">
          <Button colorScheme="blue" borderRadius="40px">
            Search
          </Button>
        </Link>
      </Box>

      
      <Box display="flex" alignItems="center" gap="10px">
        <Link to="/profile">
          <Button colorScheme="green" borderRadius="40px">
            Profile
          </Button>
        </Link>
        <Button>
          <Link to="/login">
          <Button colorScheme="purple" borderRadius="40px" onClick={logoutUser}>
          
          Logout
          </Button>
        </Link>
          
        </Button>
      </Box>
    </Box>
  );
};


const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <AuthProvider>
          <BookProvider>
            <AppContent />
          </BookProvider>
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
};

const AppContent = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner
  }

  return (
    <>
      {user && <TopBar />}
      <Box paddingTop={user ? "80px" : "0"} backgroundColor="#f8f9fa">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Box>
    </>
  );
};

export default App;
