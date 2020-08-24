import React, { Component } from 'react';
import { Card, CardImg, CardText,CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, 
    Modal, ModalHeader, ModalBody, Col, Row, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Loading } from './loading';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) =>(val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen : !this.state.isModalOpen
        })
    }
    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render () {
        return(
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-edit fa-lg"></span> SubmitComment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <div className="container">
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".rating" name="rating" className="form-control">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                            </Row>
                            <Row>
                                <Label htmlFor="firstname">Your Name</Label>
                                    <Control.text model=".author" id="yourname" name="yourname"
                                     className="form-control" placeholder="Your Name" 
                                     validators = {{
                                         required, minLength: minLength(3), maxLength: maxLength(15)
                                     }} />
                                    <Errors className="text-danger"
                                        model=".author" show="touched"
                                        messages = {{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 or less characters'
                                        }}
                                    />
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="message">Comment</Label>
                                    <Control.textarea model=".comment" id="message" name="message" rows="6" 
                                    className="form-control" />
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
        function RenderDish({dish}) {
                return (
                    <div className="col-12 col-md-5 m-2">
                        <FadeTransform
                            in
                            transformProps={{
                                exitTransform: 'scale(0.5) translateY(-50%)'
                            }}>
                            <Card>
                                <CardImg width="100%" object src={ baseUrl + dish.image} alt="{this.props.dish.name}"/>
                                <CardBody>
                                    <CardTitle><h4>{dish.name}</h4></CardTitle>
                                    <CardText>{dish.description}</CardText>
                                </CardBody>
                            </Card>
                        </FadeTransform>    
                    </div>
                );
        }
        function RenderCmts({comments, postComment, dishId}){
            if(comments != null) {
                console.log(comments);
            return (
                <div className="col-12 col-md-5 m-2">
                    {/* <Card> */}
                    <h4>Comments</h4>
                        <ul className="list-unstyled d-table">
                        <Stagger in>
                            {comments.map((com) => {
                                return (
                                    <Fade in>
                                        <li key={com.id} >
                                            <p>{com.comment}</p>
                                            <p>--{com.author}, {new Intl.DateTimeFormat('en-us', {year:'numeric', month:'short',day:'2-digit'}).format(new Date(Date.parse(com.date)))}</p>
                                        </li>
                                    </Fade>
                                );
                            })}
                            </Stagger>
                        </ul>
                        <CommentForm dishId={dishId} postComment={postComment} />
                    {/* </Card> */}
                </div>
            );
            } else
                return (
                    <div></div>
                )
        }
        const DishDetails = (props) => {
            if(props.Loading) {
                return (
                    <div className="container">
                        <div className="row">
                            <Loading />
                        </div>
                    </div>
                )
            }
            else if(props.errMess) {
                return (
                    <div className="container">
                        <div className="row">
                            <h4>{props.errMess}</h4>
                        </div>
                    </div>
                )
            }
            else if(props.dish != null)
            {
                return (
                    <div className="container">
                        <div className="row">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                                <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <div className="col-12">
                                <h3>Menu</h3>
                                <hr />
                            </div>
                        </div>
                        <div className="row">
                            <RenderDish dish = {props.dish} />
                            <RenderCmts comments = {props.comments}
                                postComment = {props.postComment} dishId={props.dish.id} />
                        </div>
                    </div>
                )
            } else 
            {
                return (
                    <div></div>
                );
            }
    }

export default DishDetails