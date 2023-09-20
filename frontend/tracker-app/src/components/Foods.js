import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import '../styles/Foods.css'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'

import { login } from "../redux/userSlice";
import { Alert } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup'
import UserApi from "../api/UserApi";
import Cookies from 'js-cookie';
export const Foods = () => {
    const [user, setUser] = useState({
        _id: "-1",
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        sex: "",
        age: "",
        height: "",
        weight: "",
        level: "",
        goal: "",
    });

    const [auth, setAuth] = useState({ show: false, auth: false });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const result = await UserApi.getUserByCredentials(
            event.target.username.value,
            event.target.password.value
        );

        if (result) {
            // Authentication succeeded
            setUser(result);
            setAuth({ show: true, auth: true });
        } else {
            // Authentication failed
            setAuth({ show: true, auth: false });
        }
    };

    return (
        <>

            <Container fluid id="wrapper" className="d-flex align-items-center">
                <Card id="mealCard" className="mx-auto">
                        {/* This container holds the login header */}
                        <Container className="mt-5">
                            <section className="mx-auto">
                                <h1 className="text-center">Track your Meals</h1>
                                <p className="mt-2 text-center">Please enter the food you have eaten today.</p>
                            </section>
                        </Container>

                        {/* This container holds the login form */}
                        <Container>
                            {/* mx-auto refers to the CSS property margin: auto and 'w' refers to width */}
                            <Form className="mx-auto w-60"
                                onSubmit={handleSubmit}>
                                <Form.Group className="mt-4 mb-4">
                                    <Form.Label htmlFor="username">Enter Food Name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        id="food"
                                        name="food"
                                        placeholder="Food/Meal Name"
                                    />
                                </Form.Group>
                                <Form.Group className="mt-4 mb-4">
                                    <Form.Label htmlFor="password">Enter Quantity</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            required
                                            type="number"
                                            id="number"
                                            name="amount"
                                            placeholder="# of food"
                                        />
                                        {/* This Input Group handles the Password Visibility Toggle */}
                                    </InputGroup>
                                </Form.Group>
                                <Button type="submit" className="enter_btn">Enter</Button>
                                <div>
                                    {auth.show ? (
                                        auth.auth ?
                                            <Alert variant="success">Food Recorded</Alert>
                                            :
                                            <Alert variant="danger">Invalid Food/Quantity </Alert>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </Form>
                        </Container>
                </Card>
                <Container className="text-center">
                            <Button href="/dashboard" className="back-btn">Return to Dashboard</Button>
                </Container>
            </Container>
        </>
    );
}
