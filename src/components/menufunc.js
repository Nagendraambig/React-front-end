import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link } from 'react-router-dom'
import { Loading } from './loading';
import { baseUrl } from '../shared/baseUrl'

    function Rendermenu ({dish, onClick}) {
        return(
            <Card>
                    <Link to={`/menu/${dish.id}`}>
                        <CardImg width="100%" object src={baseUrl + dish.image} alt="{dish.name}"/>
                        <CardImgOverlay>
                            <CardTitle heading><h5>{dish.name}</h5></CardTitle>
                        </CardImgOverlay>
                    </Link>
            </Card>
        )
    }
    
    const Menu = (props) => {
        const menu = props.dishes.dishes.map((dish) => {
            return (
                <div key={dish.id} className="col-12 col-md-5 m-2">
                    <Rendermenu dish={dish}/>
                </div>
            );
        });

        if(props.dishes.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            )
        }
        else if(props.dishes.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{props.dishes.errMess}</h4>
                    </div>
                </div>
            )
        }
        else
            return (
                    <div className="container">
                        <div className="row">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                                <BreadcrumbItem active>Menu</BreadcrumbItem>
                            </Breadcrumb>
                            <div className="col-12">
                                <h3>Menu</h3>
                                <hr />
                            </div>
                        </div>
                        <div className="row">
                                {menu}
                        </div>
                        
                    </div>
            );
    }
        

export default Menu