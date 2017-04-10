import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
// import ActionCreators from '../actions/index';
import { bindActionCreators } from 'redux';
import {
  ScrollView,
  View,
  TextInput,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity, 
  StyleSheet,
} from 'react-native';
import Search from './Search';


//Enter data you want to send from the store to the component below
// const mapStateToProps = (state) => {
//   return {
//     searchedEvents: state.searchedEvents,
//     eventCount: state.eventCount,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(ActionCreators, dispatch);
// }

// const mapDispatchToProps = (dispatch) => ({
//     fetchEvents: (genre) => {
//       dispatch(fetchEvents(genre));
//     },
//     setSearchedEvents: (event) => {
//       dispatch(setSearchedEvents(event));
//     },
//     addEvent: () => {
//       dispatch(addEvent());
//     },
//     removeEvent: () => {
//       dispatch(removeEvent());
//     },
// });

class Home extends Component {
  // constructor(props){
  //   super(props);
  //   // var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  //   this.state = {
  //     genreInput: '',
  //     searching: false,
  //   }
  // }
  // searchPress() {
  //   this.setState({searching: true});
  //   this.props.fetchEvents(this.state.genreInput).then( () => {
  //     this.setState({searching: false});
  //   });
  // }

  // events() {
  //   return Object.keys(this.props.searchedEvents).map( key => this.props.searchedEvents[key] );
  // }

  render() {
    console.log('this', this);
    return (
      <View style={styles.container}>
        <Search />
        <Text style={styles.welcome}>Home</Text>
        <Text onPress={Actions.login}>Open modal</Text>
      </View>
    )
  }

//   render() {
//     console.log('this.props: ', this.props);
//     console.log('this: ', this);
//     return (
//       <View style={styles.scene}>
//         <View style={styles.searchSection}>
//           <TextInput style={styles.searchInput}
//             returnKeyType='search'
//             placeholder='Genre (comma delimited)'
//             onChangeText={(genreInput) => this.setState({genreInput})}
//             value={this.state.genre}
//           />
//           <TouchableHighlight onPress={() => this.searchPressed()} style={styles.searchButton}>
//             <Text> Fetch Events </Text>
//           </TouchableHighlight>
//         </View>
//         <View style={styles.filterSection}>
//           <TouchableOpacity onPress={() => this.addEvent()} style={styles.searchButton}>
//             <Text> Add Event Count </Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => this.removeEvent()} style={styles.searchButton}>
//             <Text> Subtract Event Count </Text>
//           </TouchableOpacity>
//         </View>
//         <ScrollView style={styles.scrollSection}>
//           {!this.state.searching && this.events().map((event) => {
//             return 
//             <View key={event.id}>
//               <Image source={{uri: event.image}} style={styles.resultImage} />
//               <Text style={styles.resultText}>{event.title}</Text>
//             </View>
//           })}
//           { this.state.searching ? <Text>Searching...</Text> : null }
//         </ScrollView>
//       </View>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   scene: {
//     flex: 1,
//     marginTop: 20,
//   },
//   searchSection: {
//     height: 30,
//     borderBottomColor: '#000',
//     borderBottomWidth: 1,
//     padding: 5,
//     flexDirection: 'row',
//   },
//   filterSection: {
//     height: 30,
//     borderBottomColor: '#000',
//     borderBottomWidth: 1,
//     padding: 5,
//     flexDirection: 'row',
//   },  
//   searchInput: {
//     flex: 0.7,
//   },
//   searchButton: {
//     flex: 0.3,
//   },
//   scrollSection: {
//     flex: 0.8,
//   },
//   resultImage: {
//     height: 150,
//   },
//   resultText: {
//     backgroundColor: '#000',
//     color: '#FFF',
//     height: 20,
//   }
// });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#bb0000',
    // justifyContent: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  }
})

// Enter data you want to send from the store to the component below
// function mapStateToProps(state) {
//   return {
//     searchedEvents: state.searchedEvents
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Home);

//React Native Router Flux
export default connect(({routes}) => ({routes}))(Home)
