import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Checkout from './container/Checkout/Checkout';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import Orders from './container/Orders/Orders';
import Auth from './container/Auth/Auth';
import Logout from './container/Auth/Logout/Logout';
import * as actions from './store/actions';

class App extends Component{

  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {
    
    let routes =(
      <Switch>
        <Route path= '/auth' component = {Auth} /> 
        <Route path= '/' exact component = {BurgerBuilder} />
        <Redirect to = "/"/>
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path= '/checkout' component = {Checkout} />
          <Route path= '/orders' component = {Orders} />  
          <Route path= '/logout' component = {Logout} />
          <Route path= '/' exact component = {BurgerBuilder} />
          <Redirect to = "/"/> 
       </Switch>
      );
    }


    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
