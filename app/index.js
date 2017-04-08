import ReactNative from 'react-native';
import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { Actions, Scene, Router } from 'react-native-router-flux';
import configureStore from './store/configureStore';
const store = configureStore();
const RouterWithRedux = connect()(Router);

const {
  Text,
  StyleSheet,
} = ReactNative;

import reducer from './reducers';
import AppContainer from './containers/AppContainer';
import Home from './containers/Home';
import Landing from './containers/Landing';
import Search from './containers/Search';

const TabIcon = ({ selected, title }) => {
    return (
      <Text style={{color: selected ? 'red' : 'black'}}>{title}</Text>
    )
}

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="root">
            <Scene key="landing" component={Landing} title="Landing" initial={true} />
            <Scene 
              key="rootNavBar"
              tabs={true}
              tabBarStyle={{backgroundColor: '#FFFFFF'}}>
              <Scene key="home" component={Home} title="Home" icon={TabIcon} initial />
              <Scene key="search" component={Search} title="Search" icon={TabIcon} /> 
            </Scene>
          </Scene>
        </RouterWithRedux>
      </Provider>
    )
  }
}

// export default class App extends Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <AppContainer />
//       </Provider>
//     )
//   }
// }

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#FFFFFF',
    opacity: 0.5,
  }
})