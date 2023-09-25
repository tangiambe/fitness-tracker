import React, { useEffect, useState } from 'react';
import '../../styles/Details.css';
import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { formatDateToYYYYMMDD } from '../../helpers/dateHelpers';
import { useSelector } from "react-redux";



export const Foods = () => {
    const userId = Cookies.get('userId');
    const activeUser = useSelector((state) => state.user);
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const entryDate = formatDateToYYYYMMDD((params.get("entryDate")));
    const [daysData, setDaysData] = useState([]);
    const [daysId, setDaysId] = useState();

    useEffect(() => {
        if ((activeUser.firstName === undefined) && (userId === -1)) {
            navigate("/login");
        }
    }, [activeUser, navigate]);
    console.log(activeUser.firstName)

    const addMealApiUrl = `http://localhost:8080/api/request/addfood`;

    // Define state variables for quantity and food
    const [quantity, setQuantity] = useState("");
    const [food, setFood] = useState("");
    const [foodError, setFoodError] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Create the request body with quantity and food
        const requestBody = {
            entryDate: entryDate,
            trackerId: Cookies.get('userId'),
            quantity: quantity,
            food: food
        };

        // Make the POST request using Axios
        axios.post(addMealApiUrl, requestBody)
            .then((response) => {
                console.log('Response Data:', response.data);

                navigate(`/details?dayId=${response.data}`);
            })

            .catch((error) => {
                // Handle any errors that occurred during the request
                console.error('Error:', error);
                if (error.response && error.response.status === 404) {
                    // Specific error message for 404 (Not Found) error
                    setFoodError("Food not found. Please try another food item.");
                } else {
                    // Generic error message for other 400 or 500 errors
                    setFoodError("Error, please try again.");
                }
            });
    };

    return (
        <>
            <Container fluid id="wrapper">
                <Col id="homePageCol">
                    <Container className="home-page text-center">
                        <h3>Please add the meal and quantity you have eaten.</h3>
                        <h4><br></br></h4>
                    </Container>
                    <Container>
                        <Form className="mx-auto w-60" onSubmit={handleSubmit}>
                            <Form.Group className="mt-4 mb-4">
                                <Form.Label htmlFor="food">Meal</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    id="food"
                                    name="food"
                                    placeholder="Food Item"
                                    value={food} // Bind the value to the food state variable
                                    onChange={(e) => setFood(e.target.value)} // Update the food state
                                />
                            </Form.Group>
                            {foodError && (
                                <div className="text-danger">{foodError}</div>
                            )}
                            <Form.Group className="mt-4 mb-4">
                                <Form.Label htmlFor="quantity">Quantity&nbsp;&nbsp;</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    placeholder="# of food items"
                                    value={quantity}
                                    min="1"  // Set the minimum value to 0
                                    max="50" // Set the maximum value to 50
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                                {quantity < 0 || quantity > 50 && (
                                    <div className="text-danger">Quantity must be between 0 and 50.</div>
                                )}
                            </Form.Group>
                            <Button type="submit" className="login_btn">Enter</Button>
                        </Form>
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
        </>
    );
};
