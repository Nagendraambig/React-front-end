import React from 'react';
import { Card, CardImg, CardText,CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

   
        function RenderDish({dish}) {
                return (
                    <div className="col-12 col-md-5 m-2">
                    <Card>
                        <CardImg width="100%" object src={dish.image} alt="{this.props.dish.name}"/>
                        <CardBody>
                            <CardTitle><h4>{dish.name}</h4></CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                    </div>
                );
        }
        function RenderCmts({comments}){
            if(comments != null) {
                console.log(comments);
            return (
                <div className="col-12 col-md-5 m-2">
                    <Card>
                    <h4>Comments</h4>
                        <ul className="list-unstyled">
                        {comments.map((com) => {
                            return (
                                <li key={com.id}>
                                    <p>{com.comment}</p>
                                    <p>--{com.author}, {new Intl.DateTimeFormat('en-us', {year:'numeric', month:'short',day:'2-digit'}).format(new Date(Date.parse(com.date)))}</p>
                                </li>
                            );
                        })}
                    </ul>
                    </Card>
                </div>
            );
            } else
                return (
                    <div></div>
                )
        }
        const DishDetails = (props) => {
            if(props.dish != null)
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
                            <RenderCmts comments = {props.comments} />
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