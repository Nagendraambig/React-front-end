import React, { Component } from 'react';
import { Card, CardImg, CardText,CardBody, CardTitle, Button } from 'reactstrap';

class DishDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    
        formatDate(string){
            var options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(string).toLocaleDateString([],options);
        }
        
        renderDish(dish) {
                return (
                    <div className="col-12 col-md-5 m-2">
                        <Card>
                        <CardImg width="100%" object src={dish.image} alt="{this.props.dish.name}"/>
                    <CardBody>
                    <CardTitle><h4>{this.props.dish.name}</h4></CardTitle>
                    <CardText>{this.props.dish.description}</CardText>
                    </CardBody>
                    </Card>
                    </div>
                );
        }
        renderCmts(comments){
            if(comments != null) 
            return (
                <div className="col-12 col-md-5 m-2">
                    <Card>
                        <h4>Comments</h4>
                        <ul className="list-unstyled">
                            {comments.map((com) => {
                                return (
                                    <li key={com.id}>
                                        <p>{com.comment}</p>
                                        <p>--{com.author}, {this.formatDate(com.date)}</p>
                                    </li>
                                )
                            })}
                        </ul>
                        <Button outline onClick={this.toggleModal}>
                            <span className="fa fa-edit fa-lg"></span> SubmitComment
                        </Button>
                    </Card>
                </div>
            )
            else
                return (
                    <div></div>
                )
        }
        render() {
            if(this.props.dish != null)
            {
                return (
                    <div className="container">
                        <div className="row">
                                {this.renderDish(this.props.dish)}
                                {this.renderCmts(this.props.dish.comments)}
                            {/* <div className="col-12 col-md-5 m-2">
                                <Card>
                                <CardTitle className="mx-auto"><h4>Comments</h4></CardTitle>
                                { this.props.dish.comments.map((com) =>
                                    <div key={com.id}>
                                      <CardBody>
                                      <CardText>{com.comment}</CardText>
                                      <CardText>--{com.author}, {this.formatDate(com.date)}</CardText>
                                      </CardBody>  
                                    </div>    
                                )}
                                </Card>
                                
                            </div> */}
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
}

export default DishDetails