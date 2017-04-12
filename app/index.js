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
import Landing from './containers/Landing';
import Home from './containers/Home';
import Login from './containers/Login';
import User from './containers/User';
import Event from './containers/Event';
import EventList from './containers/EventList';

const TabIcon = ({ selected, title }) => {
    return (
      <Text style={{color: selected ? 'red' : 'black'}}>{title}</Text>
    )
}

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="landing" component={Landing} title="Landing" hideNavBar initial/>
    <Scene key="login" direction="vertical" component={Login} title="Login" hideNavBar />
    <Scene
      key="rootTabBar"
      tabs
      tabBarStyle={{backgroundColor: '#ffffff'}}
      type="replace">
      <Scene key="home" component={Home} title="Home" icon={TabIcon} hideNavBar/>
      <Scene key="event" component={EventList} title="Events" icon={TabIcon} hideNavBar/>
      <Scene key="user" component={User} title="User" icon={TabIcon} hideNavBar/>
    </Scene>
  </Scene>
);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux scenes={scenes}/>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  tarBarStyle: {
    backgroundColor: '#FFFFFF',
    opacity: 0.5,
  }
})

