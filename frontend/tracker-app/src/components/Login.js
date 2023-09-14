import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import '../styles/Login.css'
import { login } from "../redux/userSlice";
import { Alert } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup'


export const Login = () => {

    const [user, setUser] = useState({
        _id: "-1",
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
    });

    const [auth, setAuth] = useState({ show: false, auth: false });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // UserApi.getUserByCredentials(event.target.username.value, event.target.password.value, setUser, setAuth);
    }

    useEffect(() => {
        if (user._id !== "-1") {
            dispatch(login(user));

            setTimeout(() => {
                navigate("/dashboard");
            }, 600)
        }
    }, [user, dispatch, navigate, auth])

    /* Password Visiblity */
    // const [passwordShown, setPasswordShown] = useState(false);
    // const togglePasswordVisiblity = () => { setPasswordShown(passwordShown ? false : true) };
    // const showPwd = <FontAwesomeIcon icon={faEye} />;
    // const hidePwd = <FontAwesomeIcon icon={faEyeSlash} />;

    return (
        <>

            <Container fluid id="wrapper" className="d-flex align-items-center">
                <Card id="loginCard" className="mx-auto">
                        {/* This container holds the login header */}
                        <Container className="mt-5">
                            <section className="mx-auto">
                                <h1 className="text-center">Login</h1>
                                <p className="mt-2 text-center">Don't have an account? <a href="/register">Register Now!</a></p>
                            </section>
                        </Container>

                        {/* This container holds the login form */}
                        <Container>
                            {/* mx-auto refers to the CSS property margin: auto and 'w' refers to width */}
                            <Form className="mx-auto w-60"
                                onSubmit={handleSubmit}>
                                <Form.Group className="mt-4 mb-4">
                                    <Form.Label htmlFor="username">Username</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        id="username"
                                        name="username"
                                        placeholder="Username"
                                    />
                                </Form.Group>
                                <Form.Group className="mt-4 mb-4">
                                    <Form.Label htmlFor="password">Password</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            required
                                            type="password"
                                            id="password"
                                            name="password"
                                            placeholder="Password"
                                        />
                                        {/* This Input Group handles the Password Visibility Toggle */}
                                        {/* <InputGroup.Text >
                                            <i onClick={togglePasswordVisiblity}>{passwordShown ? hidePwd : showPwd}</i>
                                        </InputGroup.Text> */}
                                    </InputGroup>
                                </Form.Group>
                                <Button type="submit" className="login_btn">Login</Button>
                                <div>
                                    {auth.show ? (
                                        auth.auth ?
                                            <Alert variant="success">Logged In!</Alert>
                                            :
                                            <Alert variant="danger">Invalid Credentials</Alert>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </Form>
                        </Container>
                </Card>
            </Container>
        </>
    );
}