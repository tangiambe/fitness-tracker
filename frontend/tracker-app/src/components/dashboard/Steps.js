import React, {useState} from "react";
import '../../styles/Details.css'
import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';


import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const Steps = () => {

    const [steps, setsteps] = useState("");

    const handleSubmit = event => {
        setsteps(event.target.value);
    }
    const logValue = () => {
        console.log(steps);
    }

    return (
        <>
            <Container fluid id="wrapper">
                <Col id="homePageCol">
                        <Container className="home-page text-center">
                            <h3>Add the number of steps you have taken.</h3>
                            <h4><br></br></h4>
                        </Container>

                        <Container>
                            {/* mx-auto refers to the CSS property margin: auto and 'w' refers to width */}
                            <Form className="mx-auto w-60"
                                onSubmit={handleSubmit}>
                                <Form.Group className="mt-4 mb-4">
                                    <Form.Label htmlFor="password">Quantity&nbsp;&nbsp;
                                    </Form.Label>
                                    
                                        <Form.Control
                                            required
                                            type="number"
                                            id="quantity"
                                            name="quantity"
                                            placeholder="# of steps taken"
                                        />
                                    
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