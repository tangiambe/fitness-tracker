// UserApi.js

import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const getUserByCredentials = async (userName, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/login`, {
      userName,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.data.enabled) {
      // Authentication succeeded
      return (response.data)

    } else {
      // Authentication failed
    }
  } catch (error) {
    // Handle authentication errors here
    console.error('Authentication error:', error);
  }
};

const UserApi = {
  getUserByCredentials,
};

export default UserApi;
