import React, { useState } from 'react';
import ApiCallComponent from './ApiCallComponent';

function RegistrationApi({ user }) {
  const apiUrl = 'http://localhost:8080/api/register';
  const method = 'POST';

  // Use the user prop to construct the requestBody
  const requestBody = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    userName: user.username,
    password: user.password,
    activityType: user.level,
  };

  const handleApiResponse = (response) => {
    // Handle the API response here
    console.log('API Response:', response);

    // You can also set the response data in the component's state if needed
    // Example:
    // setResponseData(response);
  };

  return (
    <div>
      <h1>Registration API</h1>
      <ApiCallComponent
        apiUrl={apiUrl}
        method={method}
        requestBody={requestBody}
        onResponse={handleApiResponse} // Pass the callback function
      />
    </div>
  );
}

export default RegistrationApi;
