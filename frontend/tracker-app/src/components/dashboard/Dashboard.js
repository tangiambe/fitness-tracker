import React, { useEffect, useState } from 'react';
import '../../styles/Dashboard.css'; // Import the CSS file
import BootstrapCard from '../dashboard/BootstrapCard';
import DateTimeDisplay from './DateTimeDisplay'; // Adjust the path as needed
import Cookies from 'js-cookie'; // Import the js-cookie library
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card"
import { Table } from 'react-bootstrap'
import { Doughnut } from 'react-chartjs-2';
import logo from "../../images/logo.svg";
import shine from "../../images/shine.svg";

function Dashboard() {
  const userId = Cookies.get('userId');
  const userApiUrl = `http://localhost:8080/api/user/${userId}`;
  const daysApiUrl = `http://localhost:8080/api/days/${userId}`;

  // Sample data for the card
  const [userData, setUserData] = useState(null);
  const [daysData, setDaysData] = useState(null);
  const [reversedDaysData, setReversedDaysData] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the API request using Axios directly
        const userResponse = await axios.get(userApiUrl);
        // Handle the response data as needed
        console.log(userResponse.data);
        setUserData(userResponse.data);

        // Handle other API calls here if needed
      } catch (error) {
        // Handle errors
        console.error('Error:', error);
      }
    };

    fetchData(); // Call the fetchData function
  }, [userApiUrl]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the API request using Axios directly
        const daysResponse = await axios.get(daysApiUrl);
        // Handle the response data as needed
        console.log(daysResponse.data);
        setDaysData(daysResponse.data);
        setReversedDaysData([...daysData].reverse());




        // Handle other API calls here if needed
      } catch (error) {
        // Handle errors
        console.error('Error:', error);
      }
    };

    fetchData(); // Call the fetchData function
  }, [daysApiUrl]);



function subtractDays(daysToSubtract) {
  const currentDate = new Date();
  const newDate = new Date(currentDate);
  newDate.setDate(currentDate.getDate() - daysToSubtract);
  return newDate;
}

function formatDateAsMMMDD(inputDate) {
  const formattedDate = inputDate.toLocaleString('default', {
    month: 'short', // Abbreviated month name (e.g., "Sep" for September)
    day: 'numeric',  // Day of the month (e.g., "17")
  });
  return formattedDate;
}
const dailyCaloricGoal = Math.round(userData.goal.dailyCaloricGoal / 100) * 100;
//const dailyCaloricGoal = 0



  return(
    <div>
    <h3 className="center-align">{userData ? `${userData.firstName} ${userData.lastName}'s Daily Tracker` : 'Loading...'}</h3>
      <h3 className="center-align"> <DateTimeDisplay /></h3><br/><br/>
 {/* Displaying the 'dailyCaloricGoal' property */}
 <p className="center-align">Daily Caloric Goal: {dailyCaloricGoal} calories</p>
    
    {/* Displaying the 'dailyStepsGoal' property */}
    <p className="center-align">Daily Steps Goal: {userData ? userData.goal.dailyStepsGoal : 'Loading...'} steps</p>
    <div className="container-fluid-wrapper"> {/* Wrapper with margin */}
        <div className="container-fluid">
          <div className="row">
          <div className="col custom-col" >
            <BootstrapCard title={formatDateAsMMMDD(subtractDays(0)) } content={"Content"} />
            </div>    
            <div className="col custom-col" >
            <BootstrapCard title={formatDateAsMMMDD(subtractDays(1)) } content={"Content"} />
            </div>    
            <div className="col custom-col" >
            <BootstrapCard title={formatDateAsMMMDD(subtractDays(2)) } content={"Content"} />
            </div>
            <div className="col custom-col" >
            <BootstrapCard title={formatDateAsMMMDD(subtractDays(3)) } content={"Content"} />
            </div>
            <div className="col custom-col" >
            <BootstrapCard title={formatDateAsMMMDD(subtractDays(4)) } content={"Content"} />
            </div>
            <div className="col custom-col" >
            <BootstrapCard title={formatDateAsMMMDD(subtractDays(5)) } content={"Content"} />
            </div>
            <div className="col custom-col" >
            <BootstrapCard title={formatDateAsMMMDD(subtractDays(6)) } content={"Content"} />
            </div>
            <div className="w-100"></div>
            <div className="col custom-col" >
            <BootstrapCard title={formatDateAsMMMDD(subtractDays(7)) } content={"Content"} />
            </div>
            <div className="col custom-col" >
            <BootstrapCard title={formatDateAsMMMDD(subtractDays(8)) } content={"Content"} />
            </div>    
            <div className="col custom-col" >
            <BootstrapCard title={formatDateAsMMMDD(subtractDays(9)) } content={"Content"} />
            </div>
            <div className="col custom-col" >
            <BootstrapCard title={formatDateAsMMMDD(subtractDays(10)) } content={"Content"} />
            </div>
            <div className="col custom-col" >
            <BootstrapCard title={formatDateAsMMMDD(subtractDays(11)) } content={"Content"} />
            </div>
            <div className="col custom-col" >
            <BootstrapCard title={formatDateAsMMMDD(subtractDays(12)) } content={"Content"} />
            </div>
            <div className="col custom-col" >
            <BootstrapCard title={formatDateAsMMMDD(subtractDays(13)) } content={"Content"} />
            </div>


          </div>
        </div>
      </div>
 
    </div>
  );
}
export { Dashboard }; // Export 'Tracker' as a named export
