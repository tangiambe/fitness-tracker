import React, { useEffect } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/Navbar.css"


export const NavBar = () => {

    const activeUser = useSelector((state) => state.user);
    useEffect(() => { }, [activeUser.firstName])

    return (
        <>
            <Navbar expand="lg" className="trivNavBar bg-body-tertiary" >
                <Container>
                    <Navbar.Brand className="fw-bold">
                        <Link to="/" className="nav-title">NutriLIFT</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle id="offcanvasNavbarToggle" className="border border-0" aria-controls="offcanvasNavbar-expand-lg" />
                    <Navbar.Offcanvas id="offcanvasNavbar-expand-lg" aria-labelledby="offcanvasNavbarLabel-expand-lg" placement="end">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg" className="fw-bold">Menu</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            {activeUser.firstName === undefined ? (
                                <Nav className="justify-content-end flex-grow-1 align-items-center">
                                    <Nav.Item className=" nav-link px-3 py-2">
                                        <Nav.Link href="/register" className="fw-bold">
                                            Register
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="nav-link px-3 py-2">
                                        <Nav.Link href="/login" className="fw-bold">
                                            Login
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            ) : (
                                <Nav className="justify-content-end flex-grow-1 align-items-center">
                                    <Nav.Item className=" px-3 py-2">
                                        <Link to="/dashboard" className=" nav-link text-decoration-none">
                                            Dashboard
                                        </Link>
                                    </Nav.Item>
                                    <Nav.Item className="px-3 py-2">
                                        <Nav.Link href="/" className="fw-bold">
                                            Logout
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            )}
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    );
}