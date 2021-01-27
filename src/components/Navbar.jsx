import React, { Component } from 'react'
import { Navbar, Container, Form, Nav, FormControl, Button, InputGroup } from 'react-bootstrap';

import { AiFillHome } from 'react-icons/ai';
import { FaUserFriends } from 'react-icons/fa';
import { HiSearch } from 'react-icons/hi';
import { BsFillBriefcaseFill } from 'react-icons/bs';
import { RiMessage2Fill } from 'react-icons/ri';
import { RiNotification3Fill } from 'react-icons/ri';
import { RiArrowDownSFill } from 'react-icons/ri';
import { CgMenuGridR } from 'react-icons/cg';
import '../styles/Navbar.css';
import { Link, withRouter } from 'react-router-dom'

let logo = './assets/logo.png';
 class NavBar extends Component {
    render() {
        return (
            <>
                <Navbar variant="light" style={{ backgroundColor: "#fff" }} className="navbar p-0" expand="lg">
                    <Container>
                        <Navbar.Brand href="#home"><img src={logo} alt="logo" className="nav-brand" /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Form inline>
                                <InputGroup style={{ width: "240px" }}>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text style={{ backgroundColor: "#EEF3F8", border: "none" }}>
                                            <HiSearch />
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        style={{ backgroundColor: "#EEF3F8", border: "none" }}
                                        type="text"
                                        placeholder="Search"
                                    />
                                </InputGroup>
                            </Form>

                            <Nav className="ml-auto">
                            <Link to="/">
                                <div className="nav-link"><AiFillHome className="icon m-0 p-0" /><p>Home</p></div>
                            </Link>
                                <Nav.Link href="#" className="nav-link"><FaUserFriends /><p>My Network</p></Nav.Link>
                                <Nav.Link href="#" className="nav-link"><BsFillBriefcaseFill /><p>Jobs</p></Nav.Link>
                                <Nav.Link href="#" className="nav-link"><RiMessage2Fill /><p>Messaging</p></Nav.Link>
                                <Nav.Link href="#" className="nav-link"><RiNotification3Fill /><p>Notifications</p></Nav.Link>
                                <Link to="/profile">
                                <div href="#" className="nav-link"><img src={logo} className="profile-img" /><p>Me <RiArrowDownSFill className="m-0 p-0" style={{ fontSize: "17px" }} /></p></div>
                                </Link>
                            </Nav>
                            <Nav className="second-nav">
                                <Nav.Link href="#" className="nav-link"><CgMenuGridR /><p>Work <RiArrowDownSFill className="m-0 p-0" style={{ fontSize: "17px" }} /></p></Nav.Link>
                                <Nav.Link href="#" className="nav-link" style={{ maxWidth: "70px", textDecoration: "underline" }}><p style={{ color: "#5D3B09" }}>Reactivate premium</p></Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        )
    }
}
export default withRouter(NavBar);