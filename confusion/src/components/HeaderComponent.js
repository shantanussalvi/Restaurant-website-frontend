import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Collapse, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap'

const HeaderComponent = () => {

    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen)
    }

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    let uname = {}
    let pass = {}
    let remember = {}
    const handleLogin = (event) => {
        toggleModal();
        alert("Username: " + uname.value + " Password: " + pass.value + " Remember: " + remember.checked);
        event.preventDefault();
    }

    return (
        <div>
            <Navbar dark expand='md'>
                <div className='container'>
                    <NavbarToggler onClick={toggleNav} />
                    <NavbarBrand className='mr-auto' href='/'>
                        <img src='assets/images/logo.png' height='30' width='41' alt='Ristorante Con Fusion'></img>
                    </NavbarBrand>
                    <Collapse isOpen={isNavOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className='nav-link' to='/home'>
                                    <span className='fa fa-home fa-lg'></span>Home
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className='nav-link' to='/aboutus'>
                                    <span className='fa fa-info fa-lg'></span>About Us
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className='nav-link' to='/menu'>
                                    <span className='fa fa-list fa-lg'></span>Menu
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className='nav-link' to='/contactus'>
                                    <span className='fa fa-address-card fa-lg'></span>Contact Us
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <Nav className='ml-auto' navbar>
                            <NavItem>
                                <Button outline onClick={toggleModal}>
                                    <span className='fa fa-sign-in fa-lg'>Login</span>
                                </Button>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
            <div className='jumbotron'>
                <div className='container'>
                    <div className='row row-header'>
                        <div className='col-12 col-sm-6'>
                            <h1>Ristorante Con Fusion</h1>
                            <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>
                    Login
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleLogin}>
                        <FormGroup>
                            <Label htmlFor="uname">Username</Label>
                            <Input type='text' id='uname' name='uname' innerRef={(input) => uname = input} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="pass">Password</Label>
                            <Input type='password' id='pass' name='pass' innerRef={(input) => pass = input} />
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type='checkbox' name='remember' innerRef={(input) => remember = input} /> Remember Me
                            </Label>
                        </FormGroup>
                        <Button type='submit' value="submit" color='primary'>Login</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default HeaderComponent