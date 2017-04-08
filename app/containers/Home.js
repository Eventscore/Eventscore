import React , { Component } from 'react';
import ReactNative from 'react-native';
import { connect } from 'react-redux';

const {
  ScrollView,
  View,
  TextInput,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet,
} = ReactNative;


class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      genreInput: '',
      searching: false
    }
  }
  searchPress() {
    this.setState({searching: true});
    this.props.fetchEvents(this.state.genreInput).then( () => {
      this.setState({searching: false});
    });
  }

  events() {
    return Object.keys(this.props.searchedEvents).map( key => this.props.searchedEvents[key] );
  }

  render() {
    return (
      <View style={styles.scene}>
        <View style={styles.searchSection}>
          <TextInput style={styles.searchInput}
            returnKeyType='search'
            placeholder='Genre (comma delimited)'
            onChangeText={(genreInput) => this.setState({genreInput})}
            value={this.state.genre}
          />
          <TouchableHighlight onPress={() => this.searchPressed()} style={styles.searchButton}>
            <Text> Fetch Events </Text>
          </TouchableHighlight>
        </View>
        <ScrollView style={styles.scrollSection}>
          {!this.state.searching && this.events().map((event) => {
            return 
            <View key={event.id}>
              <Image source={{uri: event.image}} style={styles.resultImage} />
              <Text style={styles.resultText}>{event.title}</Text>
            </View>
          })}
          { this.state.searching ? <Text>Searching...</Text> : null }
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    marginTop: 20,
  },
  searchSection: {
    height: 30,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    padding: 5,
    flexDirection: 'row',
  },
  searchInput: {
    flex: 0.7,
  },
  searchButton: {
    flex: 0.3,
  },
  scrollSection: {
    flex: 0.8,
  },
  resultImage: {
    height: 150,
  },
  resultText: {
    backgroundColor: '#000',
    color: '#FFF',
    height: 20,
  }
});

//Enter data you want to send from the store to the component below
function mapStateToProps(state) {
  return {
    searchedEvents: state.searchedEvents
  };
}

export default connect(mapStateToProps)(Home);
