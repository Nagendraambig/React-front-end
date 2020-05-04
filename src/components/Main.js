import React, { Component } from 'react';
import Home from './home.js';
import Menu from './menufunc';
import Contact from './contact';
import Aboutus from './aboutus'
import Header from './header'
import Footer from './footer'
import DishDetails from './dishfunc';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotion';
import { Switch, Route, Redirect} from 'react-router-dom';
// import { renderIntoDocument } from 'react-dom/test-utils';
//import { render } from '@testing-library/react';

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }

  render() {
    const Homepage = () => {
      return (
        <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
              promotion = {this.state.promotions.filter((promo) => promo.featured)[0]}
              leader = {this.state.leaders.filter((lead) => lead.featured)[0]}
        />
      )
    }

    const DishWithId = ({match}) => {
        return (
          <DishDetails dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            comments = {this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
        );
    }

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={Homepage} />
          <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />}/>
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route exact path="/contactus" component={Contact} />
          <Route path="/aboutus" component = {() => <Aboutus leaders={this.state.leaders} />}/>
          <Redirect to="/home" />
        </Switch>
        <Footer />
    </div>
    );
  }
}

export default Main;
