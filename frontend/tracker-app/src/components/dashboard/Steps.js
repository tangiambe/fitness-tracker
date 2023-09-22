import React, { useEffect, useState } from 'react';
import '../../styles/Details.css'
import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import { useSelector } from "react-redux";
import Cookies from 'js-cookie';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import { formatDateAsMMMDD, displayCardDate } from '../../helpers/dateHelpers';
import BootstrapCard from '../dashboard/BootstrapCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const Steps = () => {

    const activeUser = useSelector((state) => state.user);
    const navigate = useNavigate();
    const userId = Cookies.get('userId');

    useEffect(() => {
      if ((activeUser.firstName === undefined) && (userId === -1)) {
        navigate("/login");
      }
    }, [activeUser, navigate]);

    const [loading, setLoading] = useState(true); // State to track loading state

    
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const dayId = params.get("dayId");
    console.log(dayId);

    const daysApiUrl = `http://localhost:8080/api/days/day/${dayId}`;

    const [steps, setsteps] = useState("");
 useEffect(() => {
        async function fetchData() {
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



    const stepsApiUrl = `http://localhost:8080/api/request/updateTotalSteps?id=${dayId}&steps=${steps}`;

    const [daysData, setDaysData] = useState([]);
    
    
    const handleSubmit = (event) => {
        event.preventDefault();      
        

        console.error('Steps:', steps);
      console.error('Steps:', dayId);

        axios
          .patch(stepsApiUrl)
          .then((response) => {
            // Handle the successful response here
            console.log('Updated data:', response.data);
      
            // Update the daysData state with the response
            setDaysData(response.data); // Assuming the response contains the updated days data
            dayId = params.get("dayId");
          })
          .catch((error) => {
            // Handle any errors that occurred during the request
            console.error('Error:', steps);
            window.location.reload();


          });
      }
    return (
        <>
            <Container fluid id="wrapper">
                <Col id="homePageCol">
                    <Container>
                        <BootstrapCard
                          title={loading ? 'Loading...' : formatDateAsMMMDD(daysData.entryDate)}
                          content={
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Steps</li>
                                    <li className="list-group-item">
                                        {daysData ? daysData.totalDailySteps : '0'}
                                    </li>
                                </ul>
                            }
                        />
                    </Container>
    
                    <Container className="home-page text-center">
                        <h3>Add the number of steps you have taken.</h3>
                        <h4><br></br></h4>
                    </Container>
    
                    <Container>
                        {/* mx-auto refers to the CSS property margin: auto and 'w' refers to width */}
                        <Form className="mx-auto w-60" onSubmit={handleSubmit}>
                            <Form.Group className="mt-4 mb-4">
                                <Form.Label htmlFor="password">Quantity&nbsp;&nbsp;
                                </Form.Label>
    
                                <Form.Control
                                    required
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    placeholder="# of steps taken"
                                    min="1"  // Set the minimum value to 0
                                    onChange={(e) => setsteps(e.target.value)}                                />
    
                            </Form.Group>
                            <Button type="submit" className="login_btn">Enter</Button>
                        </Form>
                    </Container>
    
                    <Container className="text-center">
                        <Button href="/dashboard" className="back-btn">Return to Dashboard</Button>
                    </Container>
    
                </Col>
    
            </Container>
        </>
    );
}
    