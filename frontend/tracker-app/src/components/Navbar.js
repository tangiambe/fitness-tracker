import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link} from "react-router-dom";
import "../styles/Navbar.css"


export const NavBar = () => {

    return (
        <>
            <Navbar expand="lg" className="trivNavBar bg-body-tertiary" >
                <Container>
                    <Navbar.Brand className="fw-bold">
                        <Link to="/" className="nav-title">NutriLift</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle id="offcanvasNavbarToggle" className="border border-0" aria-controls="offcanvasNavbar-expand-lg" />
                    <Navbar.Offcanvas id="offcanvasNavbar-expand-lg" aria-labelledby="offcanvasNavbarLabel-expand-lg" placement="end">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg" className="fw-bold">Menu</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 align-items-center">
                                    <Nav.Item className=" nav-link px-3 py-2">
                                        <Nav.Link href="#" className="fw-bold">
                                            Register
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="nav-link px-3 py-2">
                                        <Nav.Link href="#" className="fw-bold">
                                            Login
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    );
}