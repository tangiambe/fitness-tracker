import React from "react";
import '../styles/Home.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import logo from "../images/logo.svg";
import shine from "../images/shine.svg";

export const Home = () => {

    return (
        <>
            <Container fluid id="wrapper">
                <Col id="homePageCol">

                    {/* Picture Row */}
                    <Row className="d-flex flex-column justify-content-center">
                        <Container className="d-flex justify-content-center mt-5">
                            <img className="back-img" src={shine} alt="back logo"/>
                            <img className="center" src={logo} alt="home logo"/>
                        </Container>
                    </Row>

                    {/* Text Row */}
                    <Row>
                        <Container className="home-page text-center">
                            <h1>NutriLift</h1>
                            <h3>Rise to a Healthier You!</h3>
                            <h4>Ready to Start your Journey?</h4>
                        </Container>
                        <Container className="text-center">
                            <Button href="/register" className="register-btn">Register</Button>
                            <Button href="#" className="login-btn">Login</Button>
                        </Container>
                    </Row>

                </Col>

            </Container>
        </>
    );
}