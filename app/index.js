import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';
import { Router, Scene, Actions, Switch, ActionConst } from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { ActionCreators } from './actions/index';
import { bindActionCreators } from 'redux';


// --- child component can connect and listen to props they want.
// const myConnectedMainComponent = connect()(Home);
// const myConnectedLoginComponent = connect()(Login);

//Include initialState inside configureStore as param
const store = configureStore();
const RouterWithRedux = connect()(Router);

import NavBar from './containers/NavBar';
import Filter from './containers/Filter';
import Landing from './containers/Landing';
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import EventView from './containers/EventView';
import EventList from './containers/EventList';
import Search from './containers/Search'; //for testing, remove later
import BasicNav from './containers/BasicNav';

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="landing" direction="right" component={Landing} title="Landing" hideNavBar/>    
    <Scene key="login" direction="right" component={Login} title="Login" hideNavBar />
    <Scene key="signup" direction="left" component={Signup} title="Sign Up" hideNavBar />
    <Scene key="home" component={Home} title="Home" hideNavBar />
    <Scene key="filter" component={Filter} title="Search" hideNavBar />
    <Scene key="event" component={EventList} title="Events" hideNavBar initial />
    <Scene key="eventview" component={EventView} hideNavBar />
  </Scene>
);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux scenes={scenes}/>
      </Provider>
    );
  }
}
