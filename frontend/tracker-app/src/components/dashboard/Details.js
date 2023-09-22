import { useLocation, useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Col } from 'react-bootstrap';
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Cookies from 'js-cookie';



export const Details = () => {
  const activeUser = useSelector((state) => state.user);
  const navigate = useNavigate();
  const userId = Cookies.get('userId');


  useEffect(() => {
    if ((activeUser.firstName === undefined) && (userId === -1)) {
      navigate("/login");
    }
  }, [activeUser, navigate]);

  console.log(activeUser.firstName)

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const dayId = params.get("dayId");

  const daysApiUrl = `http://localhost:8080/api/days/day/${dayId}`;

  const [daysData, setDaysData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      console.log("Day ID:", dayId);
      try {
        const [daysResponse] = await Promise.all([
          axios.get(daysApiUrl),
        ]);
        setDaysData(daysResponse.data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchData()
  }, [dayId, daysApiUrl]);

  if (!daysData || !daysData.nutritions) {
    return <p>No nutrition data available.</p>;
  }
  const entryDate = daysData.entryDate;
  console.log("Day ID:", daysData.entryDate);
  return (
    <Container fluid id="wrapper">
      <Col id="homePageCol">
        <Container className="home-page text-center">
          <h3>This is the list of meals you have added to this day!</h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Food Calories</th>
                <th>Serving Size (g)</th>
                <th>Total Fat (g)</th>
                <th>Saturated Fat (g)</th>
                <th>Protein (g)</th>
                <th>Sodium (mg)</th>
                <th>Potassium (mg)</th>
                <th>Cholesterol (mg)</th>
                <th>Total Carbohydrates (g)</th>
                <th>Fiber (g)</th>
                <th>Sugar (g)</th>
                <th>Quantity</th>
                <th>Total Serving Size (g)</th>
                <th>Total Calories</th>
              </tr>
            </thead>
            <tbody>
              {daysData.nutritions.map((nutrition) => (
                <tr key={nutrition.id}>
                  <td>{nutrition.name}</td>
                  <td>{nutrition.foodCalories}</td>
                  <td>{nutrition.serving_size_g}</td>
                  <td>{nutrition.fat_total_g}</td>
                  <td>{nutrition.fat_saturated_g}</td>
                  <td>{nutrition.protein_g}</td>
                  <td>{nutrition.sodium_mg}</td>
                  <td>{nutrition.potassium_mg}</td>
                  <td>{nutrition.cholesterol_mg}</td>
                  <td>{nutrition.carbohydrates_total_g}</td>
                  <td>{nutrition.fiber_g}</td>
                  <td>{nutrition.sugar_g}</td>
                  <td>{nutrition.quantity}</td>
                  <td>{nutrition.totalServingSize}</td>
                  <td>{nutrition.totalCalories}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
        <Container className="text-center" style={{ marginTop: '50px' }}>
          <Link
            to={`/foods?entryDate=${entryDate}`}
            className="back-btn"
            role="button"
          >
            Add Meals
          </Link>
        </Container>
        <Container className="text-center">
          <Button 
          onClick={() => navigate('/dashboard')}
          className="back-btn">
            Return to Dashboard
          </Button>
        </Container>
      </Col>
    </Container>
  );
  
}
