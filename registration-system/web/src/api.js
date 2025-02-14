import axios from 'axios';

// Update these URLs with your actual Azure-hosted services
const API_URL = 'https://elysian-signup-server.azurewebsites.net';  // Your main API service
const MESSAGE_SERVICE_URL = 'https://elysian-message-service.azurewebsites.net';  // Your message service

// Optional: Add default headers for all requests
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const register = async (userData) => {
  try {
    console.log('Registering with:', API_URL);  // Debug log
    
    // Register the user
    const response = await axios.post(`${API_URL}/register`, {
      email: userData.email,
      password: userData.password,
      name: userData.username
    });

    console.log('Getting welcome message from:', MESSAGE_SERVICE_URL);  // Debug log
    
    // Get welcome message
    const messageResponse = await axios.post(`${MESSAGE_SERVICE_URL}/generate-message`, {
      name: userData.username
    });

    return {
      ...response.data,
      welcomeMessage: messageResponse.data.message
    };
  } catch (error) {
    console.error('Registration error:', error.response || error);
    throw new Error(error.response?.data?.error || 'Registration failed');
  }
};

export const login = async (credentials) => {
  try {
    console.log('Logging in with:', API_URL);  // Debug log
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response || error);
    throw new Error(error.response?.data?.error || 'Login failed');
  }
}; 