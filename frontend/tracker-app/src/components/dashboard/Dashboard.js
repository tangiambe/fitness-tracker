import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import '../../styles/Dashboard.css';
import BootstrapCard from '../dashboard/BootstrapCard';
import DateTimeDisplay from './DateTimeDisplay';
import { findDayByDate } from '../../helpers/dateHelpers';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Container, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const activeUser = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeUser.firstName === undefined) {
      navigate("/login");
    }
  }, [activeUser, navigate]);

    
    console.log(activeUser.firstName)

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
        <h2 className="dash-page-text center-align pt-3">
          {userData.firstName} {userData.lastName}'s Daily Tracker
        </h2>
        {/* <hr /> */}
        <h3 className="dash-page-text2 center-align pb-2">
          <DateTimeDisplay />
        </h3>
        <hr className='line' /><hr className='line' />
        <p className="dash-page-text3 center-align">
          {userData.goal?.dailyCaloricGoal !== undefined
            ? `Daily Caloric Goal: ${Math.round(userData.goal.dailyCaloricGoal)} calories`
            : 'Loading...'}
        </p>
        <p className="dash-page-text3 center-align">
          {userData.goal?.dailyStepsGoal !== undefined
            ? `Daily Steps Goal: ${userData.goal.dailyStepsGoal} steps`
            : 'Loading...'}
        </p>
        <hr className='line' /><hr className='line' />
      </div>
      {/* <br /><br /> */}
      <div className="container-fluid">
        {[...Array(2).keys()].map((rowIndex) => (
          <div className="row" key={`row-${rowIndex}`}>
            {[...Array(7).keys()].map((index) => {
              const displayCardDate = formatDateAsMMMDD(
                subtractDays(rowIndex * 7 + index)
              );
              const matchingCardDate = subtractDays(rowIndex * 7 + index);
              const matchingDay = findDayByDate(daysData, matchingCardDate);
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
                        {matchingDay && matchingDay.totalCaloriesConsumed !== 0 ? (
                          <Link
                            to={`/details?dayId=${matchingDayId}`}
                            className="btn btn-primary "
                            role="button"
                          >
                            View Meals
                          </Link>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-secondary invisible-button "
                            disabled
                            style={{ color: "transparent" }}
                          >
                            View Meals
                          </button>
                        )}
                        </li>
                        <li className="list-group-item">
                          <a
                            className="btn btn-primary "
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
      <br /><br />
      <br /><br />
      <br /><br />
    </div>
  );
}

