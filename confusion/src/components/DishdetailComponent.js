import React, { useState } from 'react'
import { Control, Errors, LocalForm } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { baseURL } from '../shared/baseURL';
import LoadingComponent from './LoadingComponent';
import { FadeTransform, Stagger, Fade } from "react-animation-components";


const CommentForm = (props) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleSubmit = (values) => {
        toggleModal();
        props.postComment(props.dishId, values.rating, values.author, values.comment)
    }

    const minLength = (len) => (val) => !val || val.length >= len;
    const maxLength = (len) => (val) => !val || val.length <= len;

    return (
        <>
            <Button outline color="secondary" onClick={toggleModal}>
                <span className="fa fa-pencil fa-lg"> Submit Comment</span>
            </Button>
            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>
                    Submit Comment
                </ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <LocalForm onSubmit={(values) => handleSubmit(values)}>
                            <Row className='form-group'>
                                <Label htmlFor='rating'>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating" id="rating" className='form-control'>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor='author'>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" name="author" id="author" placeholder='Your Name' className='form-control' validators={{
                                        minLength: minLength(3), maxLength: maxLength(15)
                                    }} />
                                    <Errors className='text-danger' model=".author" show="touched" messages={{
                                        minLength: "Must be greater than 2 characters",
                                        maxLength: "Must be 15 characters or less"
                                    }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor='comment'>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" name="comment" id="comment" rows="6" className='form-control' />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 10 }}>
                                    <Button type='submit' color='primary'>Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </div>
                </ModalBody>
            </Modal>

        </>
    )
}

const RenderComments = ({ comments, dishId, postComment }) => {
    if (comments != null) {
        return (
            <>
                <div className='col-12 col-md-5 m-1'>
                    <h4>Comments</h4>
                    <Stagger in>
                        {comments.map((com) => {
                            const d = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(com.date)));
                            return (
                                <Fade in>
                                    <div key={com.id} className='list-unstyled'>
                                        <p>{com.comment}</p>
                                        <p>--{com.author} , {d}</p>
                                    </div>
                                </Fade>
                            )
                        })}
                    </Stagger>
                    <CommentForm dishId={dishId} postComment={postComment} />
                </div>
            </>
        )

    }
    else {
        return (
            <div></div>
        )
    }
};

const DishdetailComponent = (props) => {

    if (props.isLoading) {
        return (
            <div className='container'>
                <div className='row'>
                    <LoadingComponent />
                </div>
            </div>
        )
    }
    else if (props.err) {
        return (
            <div className='container'>
                <div className='row'>
                    <h4>{props.err}</h4>
                </div>
            </div>
        )
    }
    else if (props.dish != null) {
        return (
            <div className='container'>
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/menu'>Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            {props.dish.name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>{props.dish.name}</h3>
                        <hr></hr>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12 col-md-5 m-1'>
                        <FadeTransform in
                            transformProps={{
                                exitTransform: 'scale(0.5) translateY(-50%)'
                            }}>
                            <Card>
                                <CardImg width="100%" src={baseURL + props.dish.image} alt={props.dish.name} />
                                <CardBody>
                                    <CardTitle>{props.dish.name}</CardTitle>
                                    <CardText>{props.dish.description}</CardText>
                                </CardBody>
                            </Card>
                        </FadeTransform>
                    </div>

                    {<RenderComments comments={props.comments} postComment={props.postComment}
                        dishId={props.dish.id} />}

                </div>
            </div>
        )
    }
    else {
        return (
            <div></div>
        )
    }
}

export default DishdetailComponent