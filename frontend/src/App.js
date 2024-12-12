import React from "react"; 
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { AuthProvider } from "./context/useAuth";
import Login from "./routes/Login";
import Menu from "./routes/menu";
import Register from "./routes/register";
import Layout from "./components/layout";
import PrivateRoute from "./components/private_route";

import MelonImage from "./melon.webp"; // Replace with the correct path to your image
import Home from "./routes/Home";
import Search from "./routes/Search";
import Profile from "./routes/Profile";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <AuthProvider>
          {/* Top Bar */}
          <div
            style={{
              backgroundColor: "#f0f0ee", // Background color of the symbol
              height: "70px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 20px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Left Section: Logo and Buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* Melon Image */}
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
              {/* Home Button */}
              <Link to="/">
                <button
                  style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "40px",
                    cursor: "pointer",
                  }}
                >
                  Home
                </button>
              </Link>
              {/* Search Button */}
              <Link to="/search">
                <button
                  style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    backgroundColor: "#007BFF",
                    color: "white",
                    border: "none",
                    borderRadius: "40px",
                    cursor: "pointer",
                  }}
                >
                  Search
                </button>
              </Link>
            </div>

            {/* Right Section: Profile Button */}
            <div>
              <Link to="/profile">
                <button
                  style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    backgroundColor: "#28A745",
                    color: "white",
                    border: "none",
                    borderRadius: "40px",
                    cursor: "pointer",
                  }}
                >
                  Profile
                </button>
              </Link>
            </div>
          </div>

          {/* Routes */}
          <Routes>
            <Route
              element={
                <PrivateRoute>
                  <Layout>
                    <Menu />
                  </Layout>
                </PrivateRoute>
              }
              path="/"
            />
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
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
}

export default App;
