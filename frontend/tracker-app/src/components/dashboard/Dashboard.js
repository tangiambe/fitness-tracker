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
              
              setUserData(userResponse.data);
              console.log(userData.firstName);
              const fname = userData.firstName;
              const lname = userData.lastName;
              const username = userData.username;
              const email = userData.email;
              const trackType = userData.trackType;
              const activityType = userData.activityType;
              const timezone = userData.timeZone;
              const dailyCaloricGoal = Math.round(userData.goal.dailyCaloricGoal / 100) * 100;
              const dailyStepsGoal = userData.goal.dailyStepsGoal;

              Cookies.set('fname', fname); 
              Cookies.set('lname', lname ); 
              Cookies.set('username', username ); 
              Cookies.set('email', email ); 
              Cookies.set('trackType', trackType ); 
              Cookies.set('activityType', activityType ); 
              Cookies.set('timezone', timezone ); 
              Cookies.set('dailyCaloricGoal', dailyCaloricGoal ); 
              Cookies.set('dailyStepsGoal', dailyStepsGoal ); 
        


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
  return(
    <div>
    <h3 className="center-align">{Cookies.get('fname')} {Cookies.get('lname')}'s Daily Tracker</h3>
      <h3 className="center-align"> <DateTimeDisplay /></h3><br/><br/>
 {/* Displaying the 'dailyCaloricGoal' property */}
 <p className="center-align">Daily Caloric Goal:  {Cookies.get('dailyCaloricGoal')} calories</p>
    {/* Displaying the 'dailyStepsGoal' property */}
    <p className="center-align">Daily Steps Goal: {Cookies.get('dailyStepsGoal')} steps</p>
    <div className="container-fluid-wrapper"> {/* Wrapper with margin */}
        <div className="container-fluid">
          <div className="row">
{/* Display reversedDaysData */}
            {reversedDaysData.map((daysData, index) => (
              <>
                <div key={index} className="col custom-col">
                  <BootstrapCard
                    title={formatDateAsMMMDD(subtractDays(index))}
                    content={
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item">Steps:</li> 
                          <li class="list-group-item">{daysData.totalDailySteps}</li>
                          <li class="list-group-item">Calories Consumed:</li> 
                          <li class="list-group-item">{Math.round(daysData.totalCaloriesConsumed)}</li>
                          <li class="list-group-item"><a class="btn btn-primary" href="#" role="button">Add Meals</a></li>
                          <li class="list-group-item"><a class="btn btn-primary" href="#" role="button">Add Steps</a></li>
                        </ul>
                            }
                  />
                </div>
                {index === 6 && <div key={`w-100-${index}`} className="w-100"></div>}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export { Dashboard }; // Export 'Tracker' as a named export
