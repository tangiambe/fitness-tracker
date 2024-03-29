import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import logo from "../../images/logo.svg";
import shine from "../../images/shine.svg";


const Success = () => {
  const user = useSelector(e => e.user.value);
  useEffect(() => {
    // Create the request body
    const requestBody = {
      email: user.email,
      firstName: user.fname,
      lastName: user.lname,
      userName: user.username,
      password: user.password,
      activityType: user.level,
      age: user.age,
      height: user.height,
      weight: user.weight
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
        // Handle errors here
        console.error('Error:', error);

      });
  }, [user])

  return (
    <div className='thanks'>
      <div className="d-flex justify-content-center mt-1">
        <img className="back-img" src={shine} alt="back logo" />
        <img className="center" src={logo} alt="home logo" />
      </div>
      <h2><span>{user.fname}</span>, your account has succesfully been created!</h2>
      <h4><a href="/login">Log In</a> now to start your rise to a healthier lifestyle! <br /> We hope you enjoy using NutriLIFT! </h4>
    </div>
  )
}

export default Success;