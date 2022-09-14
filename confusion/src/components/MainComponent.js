import React, { useEffect } from 'react'
import MenuComponent from './MenuComponent';
import DishdetailComponent from './DishdetailComponent';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import HomeComponent from './HomeComponent';
import About from './AboutComponent';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, postComment, fetchLeaders, postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ContactComponent from './ContactComponent';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes()) },
  fetchComments: () => { dispatch(fetchComments()) },
  fetchPromos: () => { dispatch(fetchPromos()) },
  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
  fetchLeaders: () => { dispatch(fetchLeaders()) },
  postFeedback: (firstname, lastname, telnum, email, agree, contactType, message, id) => {dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message))}
})

function MainComponent(props) {

  useEffect(() => {
    props.fetchDishes();
    props.fetchPromos();
    props.fetchComments();
    props.fetchLeaders();
  }, [])

  const HomePage = () => {
    return (
      <HomeComponent
        dish={props.dishes.dishes.filter((dish) => dish.featured)[0]}
        dishesLoading={props.dishes.isLoading}
        dishesErr={props.dishes.err}
        promo={props.promotions.promos.filter((promo) => promo.featured)[0]}
        promosLoading={props.promotions.isLoading}
        promosErr={props.promotions.err}
        leader={props.leaders.leaders.filter((leader) => leader.featured)[0]}
        leadersLoading={props.leaders.isLoading}
        leadersErr={props.leaders.err}
      />
    );
  }

  const DishWithId = ({ match }) => {
    return (
      <DishdetailComponent
        dish={props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
        isLoading={props.dishes.isLoading}
        err={props.dishes.err}
        comments={props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))} postComment={props.postComment}
        commentsErr={props.comments.err} />
    )
  }

  return (
    <div>
      <HeaderComponent />
      <TransitionGroup>
        <CSSTransition key={props.location.key} classNames="page" timeout={300}>
          <Switch location={props.location}>
            <Route path="/home" component={HomePage} />
            <Route exact path="/menu" component={() => <MenuComponent dishes={props.dishes} />} />
            <Route path="/menu/:dishId" component={DishWithId} />
            <Route exact path="/contactus" component={() => <ContactComponent resetFeedbackForm={props.resetFeedbackForm} postFeedback={props.postFeedback} />} />
            <Route exact path="/aboutus" component={() => <About leaders={props.leaders} isLoading={props.leaders.isLoading}
              err={props.leaders.err} />} />
            <Redirect to="/home" />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      <FooterComponent />
    </div>
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));
