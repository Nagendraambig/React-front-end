import React , { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
class Menu extends Component {
    
    
    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
                <div className="col-12 col-md-5 m-2">
                    <Card key={dish.id}  onClick={() => this.props.onClick(dish)}>
                            <CardImg width="100%" object src={dish.image} alt="{dish.name"/>
                        <CardImgOverlay>
                            <CardTitle heading><h5>{dish.name}</h5></CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });

        return (
                <div className="container">
                    <div className="row">
                            {menu}
                    </div>
                    
                </div>
        );
    }
}

export default Menu