import React from "react";
import '../../styles/Details.css'
import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import logo from "../../images/logo.svg";
import shine from "../../images/shine.svg";

export const Foods = () => {

    return (
        <>
            <Container fluid id="wrapper">
                <Col id="homePageCol">
                        <Container className="home-page text-center">
                            <h3>This is the list of meals you have added to this day!</h3>
                            <h4><br></br></h4>
                        </Container>

                        <Container className="text-center">
                            <Button href="/dashboard" className="back-btn">Return to Dashboard</Button>
                        </Container>

                </Col>

            </Container>
        </>
    );
}
