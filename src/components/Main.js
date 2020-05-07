import React, { Component } from 'react';
import Home from './home.js';
import Menu from './menufunc';
import Contact from './contactus';
import Aboutus from './aboutus'
import Header from './header'
import Footer from './footer'
import DishDetails from './dishfunc';
import { connect } from 'react-redux'
import { Switch, Route, Redirect, withRouter} from 'react-router-dom';
// import { renderIntoDocument } from 'react-dom/test-utils';
//import { render } from '@testing-library/react';

const mapStateToProps = (state) => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      leaders: state.leaders,
      promotions: state.promotions
    }
}

class Main extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
    const Homepage = () => {
      return (
        <Home dish={this.props.dishes.filter((dish) => dish.featured)[0]}
              promotion = {this.props.promotions.filter((promo) => promo.featured)[0]}
              leader = {this.props.leaders.filter((lead) => lead.featured)[0]}
        />
      )
    }

    const DishWithId = ({match}) => {
        return (
          <DishDetails dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            comments = {this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
        );
    }

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={Homepage} />
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />}/>
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route exact path="/contactus" component={Contact} />
          <Route path="/aboutus" component = {() => <Aboutus leaders={this.props.leaders} />}/>
          <Redirect to="/home" />
        </Switch>
        <Footer />
    </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
