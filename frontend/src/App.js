import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ChakraProvider, Box, Button } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/useAuth";
import Login from "./routes/Login";
import Menu from "./routes/menu";
import Register from "./routes/register";
import Layout from "./components/layout";
import PrivateRoute from "./components/private_route";

import MelonImage from "./melon.webp";
import Home from "./routes/Home";
import Search from "./routes/Search";
import Profile from "./routes/Profile";
import { BookProvider } from "./context/BookContext";

const TopBar = () => {
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
      {/* Left Section: Logo and Buttons */}
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
      {/* Right Section: Profile Button */}
      <Box>
        <Link to="/profile">
          <Button colorScheme="green" borderRadius="40px">
            Profile
          </Button>
        </Link>
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

  if (loading) {
    return <div>Loading...</div>; // Loading screen
  }

  return (
    <>
      {user && <TopBar />}
      <Box paddingTop="80px" backgroundColor="#f8f9fa">
        <Routes>
          {/* Redirect "/" to "/login" */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            element={
              <Layout>
                <Login />
              </Layout>
            }
            path="/login"
          />
          <Route
            element={
              <Layout>
                <Register />
              </Layout>
            }
            path="/register"
          />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Box>
    </>
  );
};


export default App;
