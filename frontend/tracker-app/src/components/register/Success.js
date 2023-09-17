import React, {  useEffect } from 'react';
import { useSelector } from 'react-redux';

const Success = () => {
  const user = useSelector(state => state.user.value);

  useEffect(() => {
    // Create the request body
    const requestBody = {
      email: user.email,
      firstName: user.fname, // Note the property name correction
      lastName: user.lname, // Note the property name correction
      userName: user.username,
      password: user.password,
      activityType: user.level, // Assuming 'level' is a property in your user object
    };

    // Send a POST request to the server
    fetch('http://localhost:8080/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response data here, for example, set it to state
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle errors here
      });
  }, [user])

  return (
    <div className='thanks'>
        <h2>Welcome {user.fname} {user.lname}</h2>
    </div>
  )
}

export default Success;