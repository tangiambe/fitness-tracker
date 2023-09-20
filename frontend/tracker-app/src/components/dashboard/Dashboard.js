import React, { useEffect, useState } from 'react';
import '../../styles/Dashboard.css';
import BootstrapCard from '../dashboard/BootstrapCard';
import DateTimeDisplay from './DateTimeDisplay';
import { findDayByDate, findNutritionByDate } from '../../helpers/dateHelpers';

import Cookies from 'js-cookie';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard(props) {
  const userId = Cookies.get('userId');
  const userApiUrl = `http://localhost:8080/api/user/${userId}`;
  const daysApiUrl = `http://localhost:8080/api/days/${userId}`;
  
  const [userData, setUserData] = useState({
    id: "-1",
    firstName: "",
    lastName: "",
    dailyStepsGoal: 0,
    dailyCaloricGoal: 0,
  });

  const [nutrition, setNutrition] = useState({
    id: "-1",
    entryDate: "",
  });

  const [daysData, setDaysData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, daysResponse] = await Promise.all([
          axios.get(userApiUrl),
          axios.get(daysApiUrl),
        ]);

        setUserData(userResponse.data);
        setDaysData(daysResponse.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [userApiUrl, daysApiUrl]);

  function subtractDays(daysToSubtract) {
    const currentDate = new Date();
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - daysToSubtract);
    return newDate;
  }

  function formatDateAsMMMDD(inputDate) {
    const formattedDate = inputDate.toLocaleString('default', {
      month: 'short',
      day: 'numeric',
    });
    return formattedDate;
  }

  return (
    <div fluid id="wrapper">
      <div>
        <h3 className="center-align">
          {userData.firstName} {userData.lastName}'s Daily Tracker
        </h3>
        <h3 className="center-align">
          <DateTimeDisplay />
        </h3>
        <br /><br />
        <p className="center-align">
          {userData.goal?.dailyCaloricGoal !== undefined 
            ?  `Daily Caloric Goal: ${Math.round(userData.goal.dailyCaloricGoal)} calories`
            : 'Loading...'}
        </p>
        <p className="center-align">
          {userData.goal?.dailyStepsGoal !== undefined
            ? `Daily Steps Goal: ${userData.goal.dailyStepsGoal} steps`
            : 'Loading...'}
        </p>
      </div>
      <div className="container-fluid">
        {[...Array(2).keys()].map((rowIndex) => (
          <div className="row" key={`row-${rowIndex}`}>
            {[...Array(7).keys()].map((index) => {
              const displayCardDate = formatDateAsMMMDD(
                subtractDays(rowIndex * 7 + index)
              );
              const matchingCardDate = subtractDays(rowIndex * 7 + index);
              const matchingDay = findDayByDate(daysData, matchingCardDate);
             // console.log(matchingDay);
              const matchingDayId = matchingDay ? matchingDay.id : 0;
              return (
                <div key={index} className="col custom-col">
                  <BootstrapCard
                    title={formatDateAsMMMDD(displayCardDate)}
                    content={
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">Steps</li>
                        <li className="list-group-item">
                          {matchingDay ? matchingDay.totalDailySteps : '0'}
                        </li>
                        <li className="list-group-item">Calories:</li>
                        <li className="list-group-item">
                          {matchingDay
                            ? Math.round(matchingDay.totalCaloriesConsumed)
                            : '0'}
                        </li>
                        <li className="list-group-item">
                          {matchingDay && (
                            <Link
                               to={`/details?dayId=${matchingDayId}`}
                                  className="btn btn-primary"
                                  role="button"
                                >
                                  View Meals
                          </Link>
                          )}
                        </li>
                        <li className="list-group-item">
                          <a
                            className="btn btn-primary"
                            href="/foods"
                            role="button"
                          >
                            Add Meals
                          </a>
                        </li>
                        <li className="list-group-item">
                          <a
                            className="btn btn-primary"
                            href="/steps"
                            role="button"
                          >
                            Add Steps
                          </a>
                        </li>
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

export {Dashboard};
