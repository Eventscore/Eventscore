import React, { Component } from 'react';
// import ReactNative from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Home from './Home'

// const {
//   View,
//   Text,
//   TouchableHighlight
// } = ReactNative

class AppContainer extends Component {
  // constructor(props){
  //   super(props);
  // }

  // addEvent(){
  //   this.props.addEvent();
  // }

  render() {
    return (
      <Home {...this.props} />
    )
  }

  // render() {
  //   return (
  //     <View>
  //       <Text style = {{marginTop: 20}}>
  //         I am App Container! Event Count: {this.props.eventCount}
  //       </Text>
  //       <TouchableHighlight onPress={() => {this.addEvent()}} >
  //         <Text> Add Event </Text>
  //       </TouchableHighlight>
  //     </View>
  //   )
  // }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => { return {} }, mapDispatchToProps)(AppContainer);

// export default connect((state) => { return {
//   eventCount: state.eventCount
// } }, mapDispatchToProps)(AppContainer);

