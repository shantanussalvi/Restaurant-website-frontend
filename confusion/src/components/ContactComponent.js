import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Button, Col, Label, Row } from 'reactstrap';
import { Control, Errors, Form } from "react-redux-form";

const ContactComponent = (props) => {

    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !val || val.length <= len;
    const minLength = (len) => (val) => !val || val.length >= len;
    const isNum = (val) => !isNaN(Number(val))
    const isEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)

    const handleSubmit = (values) => {
        alert(JSON.stringify(values));
        props.postFeedback(values.fname, values.lname, values.telnum, values.email, values.agree, values.contactType, values.message);
        props.resetFeedbackForm();
    }

    return (
        <div className="container">
            <div className='row'>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to='/home'>Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        Contact Us
                    </BreadcrumbItem>
                </Breadcrumb>
                <div className='col-12'>
                    <h3>Contact Us</h3>
                    <hr></hr>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h3>Location Information</h3>
                </div>
                <div className="col-12 col-sm-4 offset-sm-1">
                    <h5>Our Address</h5>
                    <address>
                        121, Clear Water Bay Road<br />
                        Clear Water Bay, Kowloon<br />
                        HONG KONG<br />
                        <i className="fa fa-phone"></i>: +852 1234 5678<br />
                        <i className="fa fa-fax"></i>: +852 8765 4321<br />
                        <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                    </address>
                </div>
                <div className="col-12 col-sm-6 offset-sm-1">
                    <h5>Map of our Location</h5>
                </div>
                <div className="col-12 col-sm-11 offset-sm-1">
                    <div className="btn-group" role="group">
                        <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                        <button role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</button>
                        <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                    </div>
                </div>
            </div>
            <div className='row row-content'>
                <div className='col-12'>
                    <h3>Send us your Feedback</h3>
                </div>
                <div className='col-12 col-md-9'>
                    <Form model='feedback' onSubmit={(values) => { handleSubmit(values) }}>
                        <Row className="form-group">
                            <Label htmlFor='fname' md={2}>First Name</Label>
                            <Col md={10}>
                                <Control.text model=".fname" id='fname' name='fname' className='form-control' placeholder='First Name' validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}/>
                                <Errors className='text-danger' model=".fname" show="touched" messages={{
                                    required: 'Required',
                                    minLength: "Must be greater than 2 characters",
                                    maxLength: "Must be 15 characters or less"
                                }} />       
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor='lname' md={2}>Last Name</Label>
                            <Col md={10}>
                                <Control.text model=".lname" id='lname' name='lname' className='form-control' placeholder='Last Name' validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}/>
                                <Errors className='text-danger' model=".lname" show="touched" messages={{
                                    required: 'Required',
                                    minLength: "Must be greater than 2 characters",
                                    maxLength: "Must be 15 characters or less"
                                }} />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor='telnum' md={2}>Contact Tel.</Label>
                            <Col md={10}>
                                <Control.text model='.telnum' id='telnum' name='telnum' placeholder='Tel. number' className='form-control' validators={{
                                    required, minLength: minLength(10), maxLength: maxLength(10), isNum
                                }}/>
                                <Errors className='text-danger' model=".telnum" show="touched" messages={{
                                    required: 'Required',
                                    minLength: "Number should contain 10 digits",
                                    maxLength: "Number should contain 10 digits",
                                    isNum: "Must be a number"
                                }} />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor='email' md={2}>Email</Label>
                            <Col md={10}>
                                <Control.text model='.email' id='email' name='email' placeholder='Email' className='form-control' validators={{
                                    required, isEmail
                                }}/>
                                <Errors className='text-danger' model=".email" show="touched" messages={{
                                    required: 'Required',
                                    isEmail: "Invalid Email Address"
                                }} />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={{size: 6, offset:2}}>
                                <div className="form-check">
                                    <Label check>
                                        <Control.checkbox model='.agree' name='agree' className='form-check-input'/>{' '}
                                        <strong>May we contact you</strong>
                                    </Label>
                                </div>
                            </Col>
                            <Col md={{size: 3, offset:1}}>
                                <Control.select model='.contactType' name='contactType' className='form-control'>
                                    <option>Tel.</option>
                                    <option>Email</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="message" md={2}>Your Feedback</Label>
                            <Col md={10}>
                                <Control.textarea model=".message" id="message" name="message" rows="12" className="form-control" />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={{ size: 10, offset: 2 }}>
                                <Button type='submit' color='primary'>Send Feedback</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default ContactComponent;