import React from 'react'
import { useSelector } from "react-redux";
import logo from "../../images/logo.svg";
import shine from "../../images/shine.svg";


const Success = () => {
  const user = useSelector(e => e.user.value);
  return (
    <div className='thanks'>
      <div className="d-flex justify-content-center mt-1">
        <img className="back-img" src={shine} alt="back logo" />
        <img className="center" src={logo} alt="home logo" />
      </div>
      <h2><span>{user.fname}</span>, your account has succesfully been created!</h2>
      <h4><a href="/login">Log In</a> now to start your rise to a healthier lifestyle! <br /> We hope you enjoy using NutriLift! </h4>
    </div>
  )
}

export default Success