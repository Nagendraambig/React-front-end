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
import { postComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreator'
import { actions } from 'react-redux-form'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

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

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())}
})

class Main extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }
  
  render() {
    const Homepage = () => {
      return (
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading = {this.props.dishes.isLoading}
              dishesErrMess = {this.props.dishes.errMess}
              promotion = {this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
              promosLoading = {this.props.promotions.isLoading}
              promosErrMess = {this.props.promotions.errMess}
              leader = {this.props.leaders.filter((lead) => lead.featured)[0]}
        />
      )
    }

    const DishWithId = ({match}) => {
        return (
          <DishDetails dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            Loading = {this.props.dishes.isLoading}
            ErrMess = {this.props.dishes.errMess}
            comments = {this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            commentsErrMess = {this.props.comments.errMess}
            postComment = {this.props.postComment} />
        );
    }

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300} >
            <Switch>
              <Route path="/home" component={Homepage} />
              <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />}/>
              <Route path="/menu/:dishId" component={DishWithId} />
              <Route exact path="/contactus" component={() => <Contact resetFeedbackForm = {this.props.resetFeedbackForm} />} />
              <Route path="/aboutus" component = {() => <Aboutus leaders={this.props.leaders} />}/>
              <Redirect to="/home" />
            </Switch>
            </CSSTransition> 
        </TransitionGroup>
        <Footer />
    </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
