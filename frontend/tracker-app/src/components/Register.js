import Container from "react-bootstrap/esm/Container";
import Steps from "../components/register/Steps";
import StepOne from "../components/register/StepOne";
import NavigationButton from "../components/register/NavButton";
import Success from "../components/register/Success"
import StepThree from "../components/register/StepThree"
import StepFour from "./register/StepFour";
import StepTwo from "../components/register/StepTwo"
import { useState } from "react";
import { useSelector } from "react-redux";
import '../styles/Register.css'


export const Register = () => {

    const page = useSelector((e) => e.page.value)
    const PageDisplay = () => {
        switch (page) {
            case 0:
                return <StepOne />
            case 1:
                return <StepTwo />
            case 2:
                return <StepThree />
            case 3:
                return <StepFour />
            case 4:
                return <Success />
        }
    }
    return (
        <>
            <Container fluid id="wrapper" className="d-flex align-items-center">
                <Container className="mt-1">
                    <section className="mx-auto">
                        <h1 className=" header text-center">Register</h1>
                    </section>
                    <div>
                        <p className="text-center"> Already have an account? <a href="/login">Log In!</a></p>
                    </div>
                </Container>
                <Container className="Container">
                    <Steps />
                    <div className="content">
                        {PageDisplay()}

                        {page != 4 && <NavigationButton />}
                    </div>
                </Container>
            </Container>
        </>
    );

}