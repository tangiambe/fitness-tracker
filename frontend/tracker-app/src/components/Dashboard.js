import React from "react";
import '../styles/Dashboard.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card"
import { Table } from 'react-bootstrap'

export const Dashboard = () => {


    return (
        <>
            <Container fluid id="wrapper">
                <h2 className="welcome">Welcome, User!</h2>
                <Col>
                    {/* <h2 className="text-center">Hi, User!</h2> */}
                    <Row>
                        {/* <Col> */}
                        <Card body className="Card">
                            <h4>Daily Total Calories</h4>
                            <h5>Total Left</h5>
                            <h5>----------</h5>
                            <h5>Total</h5>
                            {/* <h6>{auth.userCalorieGoal.daily_calories}</h6> */}
                        </Card>
                        {/* </Col> */}
                    </Row>
                </Col>
                <div>
                    <h2 className="title">Welcome, User!</h2>
                </div>
                {/* <Container className="Container">

                    <div className="content">
                    </div>
                </Container> */}

            </Container>
        </>
    );
}
