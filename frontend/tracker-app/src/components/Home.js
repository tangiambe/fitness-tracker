import React, { useEffect } from "react";
import '../styles/Home.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import logo from "../images/logo.svg";
import shine from "../images/shine.svg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Home = () => {
    const activeUser = useSelector((state) => state.user);
    useEffect(() => { }, [activeUser])

    return (
        <>
            <Container fluid id="wrapper">
                <Col id="homePageCol">

                    {/* Picture Row */}
                    <Row className="d-flex flex-column justify-content-center">
                        <Container className="d-flex justify-content-center mt-5">
                            <img className="back-img" src={shine} alt="back logo" />
                            <img className="center" src={logo} alt="home logo" />
                        </Container>
                    </Row>

                    {/* Text Row */}
                    <Row>
                        <Container className="home-page text-center">
                            <h1>NutriLIFT</h1>
                            <h3>Rise to a Healthier You!</h3>
                            <h4>Ready to Start your Journey?</h4>
                        </Container>
                        <Container className="text-center">
                            {activeUser.firstName !== undefined ? (
                                <>
                                    <Button className="dash-btn1">
                                        <Link to="/dashboard" className="dash-btn" >Dashboard</Link>
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button href="/register" className="register-btn">Register</Button>
                                    <Button href="/login" className="login-btn">Login</Button>
                                </>
                            )}
                        </Container>
                    </Row>
                </Col>
            </Container>
        </>
    );
}