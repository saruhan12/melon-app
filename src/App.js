import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Search from './Search';
import Profile from './Profile';

function App() {
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
