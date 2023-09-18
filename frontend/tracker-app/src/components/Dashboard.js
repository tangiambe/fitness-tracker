import React from "react";
import '../styles/Home.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card"
import { Doughnut } from 'react-chartjs-2';
import logo from "../images/logo.svg";
import shine from "../images/shine.svg";

export const Dashboard = () => {

    return (
        <>
            <Container fluid id="wrapper">
                <Col id="homePageCol">

                    {/* Picture Row
                    <Row className="d-flex flex-column justify-content-center">
                        <Container className="d-flex justify-content-center mt-5">
                            <img className="back-img" src={shine} alt="back logo"/>
                            <img className="center" src={logo} alt="home logo"/>
                        </Container>
                    </Row> */}

                    <Row>
                    {/* <Col xs={12} md={{span:6,offset:2}}>
                        <Card body className="border-0">
                            <Row>   
                                <Doughnut 
                                    data={dataSet}
                                    height={200}
                                    options={{
                                        title:{
                                            display:true,
                                            text:"Today's calorie breakdown",
                                            fontSize:20
                                        
                                        },
                                        legend:{
                                            display:true,
                                            position:'bottom'
                                        },
                                        maintainAspectRatio:false
                                    }}
                                
                                
                                />
                            </Row>
                        </Card>
                        
                    </Col> */}

                    {/* <Col xs={12} md={{span:2,offset:1}}> */}
                        <Card body className="text-center">
                            <h4>Daily Total Calories</h4>
                            <h5>2500</h5>   
                            <h5>----------</h5>
                            <h5>2500</h5>
                            {/* <h6>{auth.userCalorieGoal.daily_calories}</h6> */}
                        </Card>
                    {/* </Col> */}
                </Row>

                </Col>

            </Container>
        </>
    );
}
