import Container from "react-bootstrap/esm/Container";
import Steps from "./Steps";
import StepOne from "./StepOne";
import NavigationButton from "./NavButton";
import Success from "./Success"
import StepThree from "./StepThree"
import StepFour from "./StepFour";
import StepTwo from "./StepTwo"
// import { useState } from "react";
import { useSelector } from "react-redux";
import '../../styles/Register.css'


export const Register = () => {

    const page = useSelector((e) => e.page.value)
    const PageDisplay = () => {
        switch (page) {
            case 0:
                // Account Details
                return <StepOne />
            case 1:
                // User Details
                return <StepTwo />
            case 2:
                // Activity Level
                return <StepThree />
            case 3:
                // User Goal
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

                        {page !== 4 && <NavigationButton />}
                    </div>
                </Container>
            </Container>
        </>
    );

}