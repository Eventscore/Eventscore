import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';
import { Router, Scene, Actions, Switch } from 'react-native-router-flux';
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

import Search from './containers/Search';
import Filter from './containers/Filter';
import Landing from './containers/Landing';
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import User from './containers/User';
import EventView from './containers/EventView';
import EventList from './containers/EventList';

const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{color: selected ? 'red' : 'black'}}>{title}</Text>
  );
};

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="login" direction="right" component={Login} title="Login" hideNavBar initial />
    <Scene key="signup" direction="left" component={Signup} title="Sign Up" hideNavBar />
    <Scene
      key="rootTabBar"
      tabs
      tabBarStyle={{backgroundColor: '#ffffff'}}
      type="replace">
      <Scene key="home" component={Home} title="Home" icon={TabIcon} hideNavBar/>
      <Scene key="event" component={EventList} title="Events" icon={TabIcon} hideNavBar/>
      <Scene key="user" component={User} title="User" icon={TabIcon} hideNavBar/>
    </Scene>
    <Scene key="eventview" component={EventView} hideNavBar/>
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

const styles = StyleSheet.create({
  tarBarStyle: {
    backgroundColor: '#FFFFFF',
    opacity: 0.5,
  }
});

