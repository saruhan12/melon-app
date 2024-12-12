import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Search from "./Search";
import Profile from "./Profile";
import MelonImage from "./melon.webp"; // Replace with the correct path to your image

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedIn = localStorage.getItem("isLoggedIn");
        setIsLoggedIn(loggedIn === "true");
    }, []);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    if (!isLoggedIn) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <BrowserRouter>
            {/* Top Bar */}
            <div
                style={{
                    backgroundColor: "#f0f0ee", // Background color of the symbol (replace with actual color)
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

            {/* App Routes */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
