const API_URL = 'https://elysian-signup-server.azurewebsites.net';
const MESSAGE_SERVICE_URL = 'https://elysian-message-service.azurewebsites.net';

export const authService = {
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  register: async (email, password, name) => {
    try {
      // First, register the user
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Then, get welcome message from separate service
      const messageResponse = await fetch(`${MESSAGE_SERVICE_URL}/generate-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      const messageData = await messageResponse.json();

      if (!messageResponse.ok) {
        throw new Error(messageData.error || 'Failed to get welcome message');
      }

      return {
        ...data,
        welcomeMessage: messageData.message
      };
    } catch (error) {
      throw error;
    }
  },

  generateMessage: async (name) => {
    try {
      const response = await fetch(`${MESSAGE_SERVICE_URL}/generate-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate message');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },
}; 