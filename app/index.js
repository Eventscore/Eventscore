import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
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
      tabBarStyle={{backgroundColor: '#ffffff'}}>
      <Scene key="home" component={Home} title="Home" icon={TabIcon} hideNavBar/>
      <Scene key="event" component={Event} title="Event" icon={TabIcon} hideNavBar/>
      <Scene key="user" component={User} title="User" icon={TabIcon} hideNavBar/>              
    </Scene>
  </Scene>
);

export default class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     'test': 0
  //   }
  // //   this.testCount = this.testCount.bind(this);
  // }

  //You can pass functions and state values through RouterWithRedux
  // testCount() { 
  //   console.log(this);
  //   this.setState((prevState) => {test: prevState.test + 1});
  // }

  // render() {
  //   return (
  //     <Provider store={store}>
  //       <RouterWithRedux scenes={scenes} state={this.state} />
  //     </Provider>
  //   )
  // }

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

// function mapDispatchToProps(dispatch){
//   return bindActionCreators(ActionCreators, dispatch);
// }

// export default connect(() => { return {} }, mapDispatchToProps)(App);

