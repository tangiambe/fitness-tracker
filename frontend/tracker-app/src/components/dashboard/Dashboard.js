import React, { useEffect, useState } from 'react';
import '../../styles/Dashboard.css'; // Import the CSS file
import BootstrapCard from '../dashboard/BootstrapCard';
import DateTimeDisplay from './DateTimeDisplay'; // Adjust the path as needed
import { findTotalDailyStepsByDate, findTotalCaloriesConsumedByDate, findDayIdByDate } from '../../helpers/dateHelpers';

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
        setDaysData(daysResponse.data);

        // Use the findDayIdByDate function to find the matching day's ID for the selectedDate
        const matchingId = findDayIdByDate(daysResponse.data, selectedDate);

        // Set the matching day in the state variable
        if (matchingId !== null) {
          const matching = daysResponse.data.find((day) => day.id === matchingId);
          setMatchingDay(matching);
        } else {
          setMatchingDay(null);
        }

        // Handle other API calls here if needed
      } catch (error) {
        // Handle errors
        console.error('Error:', error);
      }
    };

    fetchData(); // Call the fetchData function
  }, [userApiUrl, daysApiUrl, selectedDate]);

  // Use the matchingDay state variable to access its properties
  const matchingDayId = matchingDay ? matchingDay.id : null;

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
    return (
      <div className="container-fluid-wrapper"> {/* Wrapper with margin */}
        <div className="container-fluid">
          {[...Array(2).keys()].map((rowIndex) => (
            <div className="row" key={`row-${rowIndex}`}>
              {/* Display 7 cards in each row */}
              {[...Array(7).keys()].map((index) => {
                // Calculate the date for this card
                const cardDate = subtractDays(rowIndex * 7 + index);
  
                // Use the matchingDay state variable to access its properties
                const matchingDayId = matchingDay ? matchingDay.id : null;
  
                return (
                  <div key={index} className="col custom-col">
                    <BootstrapCard
                      title={formatDateAsMMMDD(cardDate)}
                      content={
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item">Steps:</li>
                          <li className="list-group-item">{matchingDayId ? matchingDayId.totalDailySteps : 'N/A'}</li>
                          <li className="list-group-item">Calories Consumed:</li>
                          <li className="list-group-item">{matchingDayId ? matchingDayId.totalCaloriesConsumed : 'N/A'}</li>
                          <li className="list-group-item"><a className="btn btn-primary" href="#" role="button">Add Meals</a></li>
                          <li className="list-group-item"><a className="btn btn-primary" href="#" role="button">Add Steps</a></li>
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