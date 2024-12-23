import React, { useState } from "react";
import {
    FormControl,
    FormLabel,
    Button,
    Input,
    Text,
} from "@chakra-ui/react";
import "./Login.css";
import { login } from "../api/endpoints"; // API'deki login fonksiyonu import ediliyor
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null); // Hata durumunu saklamak için
    const nav = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); // Önceki hataları temizle

        try {
            const response = await login(username, password);
            if (response && response.success) {
                nav("/home"); // Başarılı giriş sonrası yönlendirme
            } else {
                setError(response?.message || "Login failed. Please check your credentials.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred while trying to log in. Please try again.");
        }
    };

    const handleNavigate = () => {
        nav("/register");
    };

    return (
        <div style={{ backgroundColor: '#FFD54F', minHeight: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 0 }}>
            <form onSubmit={handleLogin} className="login-form">
                <h2>Login</h2>
                {error && (
                    <Text color="red.500" fontSize="sm" mb="10px">{error}</Text>
                )}
                <FormControl mb="20px">
                    <FormLabel>Username</FormLabel>
                    <Input
                        bg="white"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        type="text"
                        placeholder="Your username here"
                        required
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                        bg="white"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        placeholder="Your password here"
                        required
                    />
                </FormControl>
                <Button
                    mb="10px"
                    colorScheme="green"
                    mt="20px"
                    w="100%"
                    type="submit"
                >
                    Login
                </Button>
                <Text
                    onClick={handleNavigate}
                    cursor="pointer"
                    color="gray.600"
                    fontSize="14px"
                >
                    Don't have an account? Sign up
                </Text>
            </form>
        </div>
    );
};

export default Login;
