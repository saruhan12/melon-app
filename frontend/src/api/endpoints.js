import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/'

const LOGIN_URL = `${BASE_URL}login/`
const REGISTER_URL = `${BASE_URL}register/`
const LOGOUT_URL = `${BASE_URL}logout/`
const NOTES_URL = `${BASE_URL}todos/`
const AUTHENTICATED_URL = `${BASE_URL}authenticated/`
const PROFILE_URL = `${BASE_URL}profile/`// Profil API endpoint'i


axios.defaults.withCredentials = true; 

export const login = async (username, password) => {
    try {
        const response = await axios.post(
            LOGIN_URL, 
            { username, password },  // Object shorthand for cleaner syntax
            { withCredentials: true }  // Ensures cookies are included
        );
        
        // Check if the response contains a success attribute (depends on backend response structure)
        return response.data
    } catch (error) {
        console.error("Login failed:", error);
        return false;  // Return false or handle the error as needed
    }
};

export const get_notes = async () => {
    const response = await axios.get(NOTES_URL, { withCredentials: true });
    return response.data;
};

export const logout = async () => {
    const response = await axios.post(LOGOUT_URL, { withCredentials: true });
    return response.data;
};

export const register = async (username, email, password) => {
    try {
        const response = await axios.post(
            REGISTER_URL,
            { username, email, password },
            { withCredentials: true }
        );
        console.log('Register API response:', response); // Log response
        return response.data;
    } catch (error) {
        console.error('Register API error:', error.response || error.message); // Log error details
        throw error; // Re-throw the error for the caller to handle
    }
};


export const authenticated_user = async () => {
    const response = await axios.get(AUTHENTICATED_URL, { withCredentials: true });
    return response.data
}


export const fetchProfile = async () => {
    try {
        const response = await axios.get(PROFILE_URL, { withCredentials: true });
        return response.data; // API'den dönen veriyi döndür
    } catch (error) {
        console.error("Error fetching profile:", error.response || error.message);
        throw error;
    }
};
