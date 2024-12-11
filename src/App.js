import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from "./Login";
import Home from "./Home"; // Your existing components
import Search from "./Search";
import Profile from "./Profile";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check login state from localStorage
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
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
            <nav
                style={{
                    position: 'fixed',
                    bottom: '10px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '10px',
                }}
            >
                <Link to="/search">
                    <button
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: '#007BFF',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Search
                    </button>
                </Link>
                <Link to="/">
                    <button
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: 'red',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Home
                    </button>
                </Link>
                <Link to="/profile">
                    <button
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: '#28A745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Profile
                    </button>
                </Link>
                
            </nav>
        </BrowserRouter>
    );
}

export default App;
