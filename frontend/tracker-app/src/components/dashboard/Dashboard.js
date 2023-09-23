import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import '../../styles/Dashboard.css';
import BootstrapCard from '../dashboard/BootstrapCard';
import DateTimeDisplay from './DateTimeDisplay';
import { formatDateAsMMMDD } from '../../helpers/dateHelpers';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const activeUser = useSelector((state) => state.user);
  const navigate = useNavigate();
  const userId = Cookies.get('userId');

  useEffect(() => {
    if ((activeUser.firstName === undefined) && (userId === -1)) {
      navigate("/login");
    }
  }, [activeUser, navigate]);

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

  // Create an array of dates for the last 14 days
  const last14Days = Array.from({ length: 14 }, (_, index) =>
    subtractDays(index)
  );

  // Filter and sort the daysData array based on the last14Days
  const filteredAndSortedDays = daysData
    .filter((day) =>
      last14Days.some(
        (date) =>
          formatDateAsMMMDD(new Date(day.entryDate)) ===
          formatDateAsMMMDD(date)
      )
    )
    .sort((a, b) => new Date(b.entryDate) - new Date(a.entryDate));

  return (
    <div id="wrapper" className="container-fluid">
      <div>
        <h2 className="dash-page-text center-align pt-3">
          {userData.firstName} {userData.lastName}'s Daily Tracker
        </h2>
        <h3 className="dash-page-text2 center-align pb-2">
          <DateTimeDisplay />
        </h3>
        <hr className="line" />
        <hr className="line" />
        <p className="dash-page-text3 center-align">
          {userData.goal?.dailyCaloricGoal !== undefined
            ? `Daily Caloric Goal: ${Math.round(
              userData.goal.dailyCaloricGoal
            )} calories`
            : 'Loading...'}
        </p>
        <p className="dash-page-text3 center-align">
          {userData.goal?.dailyStepsGoal !== undefined
            ? `Daily Steps Goal: ${userData.goal.dailyStepsGoal} steps`
            : 'Loading...'}
        </p>
        <hr className="line" />
        <hr className="line" />
      </div>
      <div className="container-fluid">
        <div className="row">
          {last14Days.map((date, dayIndex) => {
            const matchingDay = filteredAndSortedDays.find(
              (day) => formatDateAsMMMDD(day.entryDate) === formatDateAsMMMDD(date)
            );

            return (
              <div
                key={`day-${dayIndex}`}
                className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"
              >
                <BootstrapCard
                  title={formatDateAsMMMDD(date)}
                  content={
                    <div>
                      {matchingDay ? (
                        <div>
                          <h6 className="mb-2 text-muted"> Steps: {matchingDay.totalDailySteps}</h6>
                          <h6 className="mb-2 text-muted"> Calories: {Math.round(matchingDay.totalCaloriesConsumed)}</h6>
                          <Link
                            to={`/details?dayId=${matchingDay.id}`}
                            className="btn btn-primary card-button"
                            role="button"
                          >
                            View Meals
                          </Link>
                        </div>
                      ) : (
                        <div>
                          <h6 className="mb-2 text-muted"> Steps: 0</h6>
                          <h6 className="mb-2 text-muted"> Calories: 0</h6>
                          <button
                            type="button"
                            className="btn btn-secondary card-button btn-sm"
                            disabled
                          >
                            View Meals
                          </button>
                        </div>
                      )}
                      <div>
                        <Link
                          to={`/foods?entryDate=${date}`}
                          className="btn btn-primary card-button"
                          role="button"
                        >
                          Add Meals
                        </Link>
                      </div>
                      <div>
                        <Link
                          to={`/steps?entryDate=${date}`}
                          className="btn btn-primary card-button"
                          role="button"
                        >
                          Add Steps
                        </Link>
                      </div>
                    </div>
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
