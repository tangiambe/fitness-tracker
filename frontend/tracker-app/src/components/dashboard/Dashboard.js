import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import '../../styles/Dashboard.css'; // Import the CSS file
import BootstrapCard from '../dashboard/BootstrapCard';
import DateTimeDisplay from './DateTimeDisplay'; // Adjust the path as needed
import { findTotalDailyStepsByDate, findTotalCaloriesConsumedByDate, findDayIdByDate } from '../../helpers/dateHelpers';
import { useNavigate } from "react-router-dom";
import { findDayByDate } from '../../helpers/dateHelpers';
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

  const activeUser = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
      if (activeUser._id === "-1") {
          navigate("/login");
      }
  }, [activeUser, navigate])

  const userId = Cookies.get('userId');
  const userApiUrl = `http://localhost:8080/api/user/${userId}`;
  const daysApiUrl = `http://localhost:8080/api/days/${userId}`;

  // Sample data for the card
  const [userData, setUserData] = useState({
      id: "-1",
      firstName: "",
      lastName: "",
      dailyStepsGoal: "",
      dailyCaloricGoal: "",
  });
    

  const [daysData, setDaysData] = useState([]);
  
  // Define selectedDate
  const selectedDate = new Date(); // Set it to today's date by default

  // Define a state variable to store the matching day
  const [matchingDay, setMatchingDay] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the API request using Axios directly
        const [userResponse, daysResponse] = await Promise.all([
          axios.get(userApiUrl),
          axios.get(daysApiUrl),
        ]);

        // Handle the response data as needed
        setUserData(userResponse.data);
        console.log(userData);
        setDaysData(daysResponse.data);

        // Use the findDayIdByDate function to find the matching day's ID for the selectedDate

        // Handle other API calls here if needed
      } catch (error) {
        // Handle errors
        console.error('Error:', error);
      }
    };

    fetchData(); // Call the fetchData function
  }, [userApiUrl, daysApiUrl, selectedDate]);

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
      function formatDateAsYYYYMMDD(date) {
        const year = String(date.getFullYear());
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
    return (
      <div fluid id="wrapper"> {/* Wrapper with margin */}
        <div>
          <h3 className="center-align">{userData.firstName} {userData.lastName}'s Daily Tracker</h3>
          <h3 className="center-align"> <DateTimeDisplay /></h3><br/><br/>
          {/* Displaying the 'dailyCaloricGoal' property */}
          <p className="center-align">Daily Caloric Goal:  {userData.dailyCaloricGoal} calories</p>
          {/* Displaying the 'dailyStepsGoal' property */}
          <p className="center-align">Daily Steps Goal: {userData.dailyStepsGoal} steps</p>

        </div>
        <div className="container-fluid">
          {[...Array(2).keys()].map((rowIndex) => (
            <div className="row" key={`row-${rowIndex}`}>
              {/* Display 7 cards in each row */}
              {[...Array(7).keys()].map((index) => {
                // Calculate the date for this card
                const displayCardDate = formatDateAsMMMDD(subtractDays(rowIndex * 7 + index));
                const matchingCardDate = subtractDays(rowIndex * 7 + index);

  
                console.log('Days Data:', daysData);
                // Use the matchingDay state variable to access its properties
                const matchingDay = findDayByDate(daysData, matchingCardDate);
                console.log('Matching Day:', matchingDay);
  
                return (
                  <div key={index} className="col custom-col">
                    <BootstrapCard
                      title={formatDateAsMMMDD(displayCardDate)}
                      content={
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item">Steps</li>
                          <li className="list-group-item">{matchingDay ? matchingDay.totalDailySteps : '0'}</li>
                          <li className="list-group-item">Calories:</li>
                          <li className="list-group-item">{matchingDay ? Math.round(matchingDay.totalCaloriesConsumed) : '0'}</li>
                          <li className="list-group-item"><a className="btn btn-primary" href="/details" role="button">View Meals</a></li>
                          <li className="list-group-item"><a className="btn btn-primary" href="/foods" role="button">Add Meals</a></li>
                          <li className="list-group-item"><a className="btn btn-primary" href="/steps" role="button">Add Steps</a></li>
                          
                        </ul>
                      }
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }
export { Dashboard }; 