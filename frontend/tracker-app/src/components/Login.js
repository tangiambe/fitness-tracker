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
import UserApi from "../api/UserApi";
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";



export const Login = () => {

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

    useEffect(() => {


        if (user._id !== "-1") {
            dispatch(login(user));

            Cookies.set('loggedIn', 'true'); // Set a cookie indicating the user is logged in
            Cookies.set('userId', user.id);

            setTimeout(() => {
                navigate("/dashboard");
            }, 600)
        }
    }, [user, dispatch, navigate, auth])

    /* Password Visiblity */
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => { setPasswordShown(passwordShown ? false : true) };
    const showPwd = <FontAwesomeIcon icon={faEye} />;
    const hidePwd = <FontAwesomeIcon icon={faEyeSlash} />;

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
                                <Form.Label htmlFor="password">Password&nbsp;&nbsp;
                                    <i onClick={togglePasswordVisiblity}>{passwordShown ? hidePwd : showPwd}</i>
                                </Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        required
                                        type={passwordShown ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Button type="submit" className="login_btn">Login</Button>
                            <div>
                                {auth.show ? (
                                    auth.auth ?
                                        <Alert variant="success">Logged In!</Alert>
                                        :
                                        <Alert variant="danger">Invalid Credentials </Alert>
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