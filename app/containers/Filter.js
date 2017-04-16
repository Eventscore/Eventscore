import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ActionCreators } from '../actions/index';
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
  Dimensions,
  ListView,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
const { width , height } = Dimensions.get("window");
const background = require("../assets/image/login1_bg.png");

class Filter extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const genreList = ['pop', 'hip hop', 'rock', 'soul', 'jazz'];
    this.state = {
      keyword: '',
      genreList: ds.cloneWithRows(genreList)
    }
  }

  fetchEventsByKeywordRedux(){
    let keyword = this.state.keyword || null;
    // this.fetchEventByKeyword(keyword);
    console.log(keyword);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerSearchContainer}>
          <Image source={background} 
          style={[styles.container, styles.bg]} 
          resizeMode="cover">
            <View style={styles.navBarContainer}>
              <View style={styles.navLeftContainer}>
                <View style={styles.navLeftIconView}>
                  <TouchableOpacity style={styles.navLeftIconButton} onPress={() => {Actions.pop()}}>
                    <Icon name='angle-left' style={styles.navLeftIconView} size={30} color="white" resizeMode="contain" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.navRightContainer}>
                <View style={styles.headerTitleView}>
                  <Text style={styles.titleViewText}>Search</Text>
                </View>
              </View>
            </View>
            <View style={styles.wrapper}>
              <View style={styles.inputWrap}>
                <TextInput 
                  placeholderTextColor="#dbdfe0"
                  placeholder="Keyword"
                  style={styles.input}
                  onChangeText={(keyword) => this.setState({keyword})}
                  value={this.state.keyword}
                />
                <View style={styles.iconWrap}>
                  <TouchableOpacity onPress={() => this.fetchEventsByKeywordRedux()}>
                    <Icon name='search' style={styles.navRightIconView} size={15} color="#dbdfe0" resizeMode="contain" />  
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Image>
        </View>

        <ListView style={styles.filterOptionContainer}
          dataSource={this.state.genreList}
          renderRow={ (genre) => <FilterItem genre={genre}/>}
        />

      </View>
    );
  }
}

var FilterItem = React.createClass({
  fetchEventsByGenreRedux(){
    this.setState({genre: this.props.genre}, ()=> {
      let keyword = this.props.keyword || null;
      let genre = this.props.genre || null;
      // this.fetchEventByKeyword(keyword, genre)});
      console.log('genre:', this.props.genre);
    });
  },

  render(){
    return(
      <View style={styles.filterOptionGenre}>
        <TouchableOpacity style={styles.filterOptionGenre} onPress={() => this.fetchEventsByGenreRedux()} value={this.props.genre}>
          <Image source={background} 
          style={styles.filterOptionGenre} 
          resizeMode="cover">
            <View style={styles.genreTextContainer}>
              <Text style={styles.genreTextTitle}>{this.props.genre}</Text>
            </View>
          </Image>     
        </TouchableOpacity>
      </View>
    )
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#393a3d',
  },
  bg: {
    width: null,
    height: null
  },   
  headerSearchContainer: {
    display: 'flex',
    height: 110,
  },
  navBarContainer: {
    flex: 1,
    height: 30,
    padding: 5,
    marginTop: 20, 
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  navLeftContainer: {
    backgroundColor: 'transparent',    
  },
  navLeftIconView: {
    paddingLeft: 5, 
  },
  navLeftIconButton: {
    backgroundColor: 'transparent',    
  },
  navRightContainer: {
    backgroundColor: 'transparent',    
  },  
  headerTitleView: {
    backgroundColor: 'transparent',
    // marginTop: 25,
    // marginLeft: 25,
  },
  titleViewText: {
    fontSize: 30,
    color: '#fff',
  },
  wrapper: {
    paddingVertical: 5,
  },
  inputWrap: {
    flexDirection: "row",
    // marginVertical: 10,
    marginLeft: 15,
    marginRight: 15,    
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
    backgroundColor: 'transparent'
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  filterOptionContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  filterOptionGenre: {
    // display: 'flex',
    margin: 3,
    width: 75,
    height: 75,
  },
  genreTextContainer: {
    // display: 'flex',
    // justifyContent: 'center'
  },
  genreTextTitle: {
    color: '#FFF',
  }
});

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(({routes, loginReducers, eventsReducers, addCountExample}) => { return {routes, loginReducers, eventsReducers, addCountExample}}, mapDispatchToProps)(Filter);