import React, { useState } from 'react';
import ApiCallComponent from './ApiCallComponent';

function RegistrationApi({ user, onRegistrationSuccess }) {
  const apiUrl = 'http://localhost:8080/api/register'; // Replace with your actual API endpoint
  const method = 'POST';

  const requestBody = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    userName: user.username,
    password: user.password,
    activityType: user.level,
  };

  const handleApiResponse = async (response) => {
    if (response.status === 200) {
      // Registration was successful, you can handle it here
      console.log('Registration successful');

      // Call the onRegistrationSuccess callback if provided
      if (typeof onRegistrationSuccess === 'function') {
        onRegistrationSuccess();
      }
    } else {
      // Registration failed, you can handle errors here
      console.error('Registration failed');

      // You can also check the response body for more details
      const data = await response.json();
      console.error('Error data:', data);
    }
  };

  const registerUser = async () => {
    try {
      const response = await fetch(apiUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      handleApiResponse(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Registration API</h1>
      <ApiCallComponent
        apiUrl={apiUrl}
        method={method}
        requestBody={requestBody}
        onResponse={handleApiResponse}
      />
    </div>
  );
}

export default RegistrationApi;
