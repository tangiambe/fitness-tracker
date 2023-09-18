import React from "react";
import '../styles/Home.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card"
import { Table } from 'react-bootstrap'
import { Doughnut } from 'react-chartjs-2';
import logo from "../images/logo.svg";
import shine from "../images/shine.svg";

export const Dashboard = () => {


    return (
        <>
            <Container fluid id="wrapper">
                <Col id="homePageCol">
                    <h2 className="text-center">Welcome, User!</h2>
                    <Row>
                        <Col>
                            <Card body className="text-center">
                                <h4>Daily Total Calories</h4>
                                <h5>2500</h5>
                                <h5>----------</h5>
                                <h5>2500</h5>
                                {/* <h6>{auth.userCalorieGoal.daily_calories}</h6> */}
                            </Card>
                        </Col>
                    </Row>
                </Col>

                <Container>
                <Table striped bordered size="sm">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Calories</th>
                        <th>Fat</th>
                        <th>Protein</th>
                        <th>Carbs</th>
                        <th></th>
                    </tr>
                    
                </thead>
                
            </Table>
            </Container>

            </Container>
        </>
    );
}
