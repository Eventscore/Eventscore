import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import { ActionCreators } from '../actions';
import ReactNative, {ART, TouchableWithoutFeedback} from 'react-native';
import PiePiece from './PiePiece';

const {
  View,
  Text,
  StyleSheet,
} = ReactNative;

const {
  Surface,
  Group,
  Rectangle,
  Shape,
} = ART;

import * as scale from 'd3-scale';
import * as shape from 'd3-shape';

const d3 = {
  scale,
  shape,
};

const colors = [
  '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
  '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
];

// delete these later // change to props;
const propsradius = 100;
const innerRadius = 20; // .3 * pieWidth/2  OR .3 * pieRadius
const margin = 20;
const padAngle = 0.03;

class Graph extends Component {
  constructor(props) {
    super(props);
    this._value = this._value.bind(this);
    this._label = this._label.bind(this);
    this._color = this._color.bind(this);
    this._createPieChart = this._createPieChart.bind(this);
    this._onPieItemSelected = this._onPieItemSelected.bind(this);
  }  
  _value(item) { 
    return item.weight; 
  }
  _label(item) { 
    return item.name; 
  }
  _color(index) { 
    return colors[index % colors.length]; 
  }

  _createPieChart(index, item, data) {

    // console.log('val', this._value);
    let arcs = d3.shape.pie()
      .sort(null) // this makes it not go by weight!
      .value(this._value)
      (data);

    let arc = d3.shape.arc()
      .outerRadius(( propsradius - innerRadius)*item.score/100 + innerRadius)  // Radius of the pie 
      .padAngle(padAngle)    // Angle between sections
      .innerRadius(innerRadius);  // Inner radius: to create a donut or pie
      // (arcs[index]);

    let outerArc = d3.shape.arc()
      .outerRadius(propsradius)  // Radius of the pie 
      .padAngle(padAngle)    // Angle between sections
      .innerRadius(innerRadius);  // Inner radius: to create a donut or pie
      // (arcs[index]);

    let arcData = arcs[index];
    let path = [arc(arcData), outerArc(arcData)];
    return path;
  }

  _onPieItemSelected(index) {
    this.setState({...this.state, highlightedIndex: index});
    this.props.onItemSelected(index);
  }


  render () {
    let _round = (num) => Math.round(100 * num) / 100; 
    console.log('event red', this.props.eventsReducers.currEvent);
    const event = this.props.eventsReducers.currEvent;
    let data = [ // const??? had changed from const to let
      // {'weight': 1, 'name': 'Spotify Artist Ranking', 'score': 60},
      // {'weight': 1.5, 'name': 'SeatGeek Score', 'score': 75},
      // {'weight': 1, 'name': 'Spotify Play Count', 'score': 90},
      // {'weight': 1, 'name': 'iamjasonkuo internet crawling', 'score': 40},
      // {'weight': .5, 'name': 'Misc', 'score': 80},
      {'weight': .3, 'name': 'Beyonce test (fixed)', 'score': 100},
    ];
    // GET FOR ALL ARTISTS BUT NEED TO REMOVE DUPLICATES!
    if (event.artists[0] !== undefined) {
      let weight = 1;
      event.artists.forEach(function(artist, index) {
        data.push({'weight': weight, 'name': artist.name + '\'s Spotify Ranking', 'score': artist.spotify.popularity});
        data.push({'weight': weight, 'name': artist.name + '\'s SeatGeek Score', 'score': _round(artist.score * 100)});
        if (index === 0) {
          weight /= event.artists.length;
        }
      });
    }
    data.push({'weight': 0.5, 'name': event.venue + '\'s Venue Score', 'score': _round(event.venueScore * 100)});
    data.push({'weight': 1.5, 'name': 'SeatGeek Event Score', 'score': _round(event.sgscore * 100)});

    if (event.watsonScore) {
      data.push({'weight': 2, 'name': 'EventScore Crawl', 'score': _round(event.watsonScore.score)});
    }

    const eventScore = 
      Math.round(
      data.reduce(function(a, b) {
        return a + (b.score * b.weight); 
      }, 0) / 
      data.reduce(function(a, b) { 
        return a + b.weight; 
      }, 0)
      );
    return (
      <View style={styles.container}>

        <Surface width={2 * (propsradius + margin) } height={2 * (propsradius + margin)}>
        <Group x={propsradius + margin} y={propsradius + margin}> 
        {
          data.map( (item, index) => 
            // {console.log(item)}
            (<PiePiece
              key={index}
              color={'rgba(0,0,0,0)'} // white is #ffffff
              d={this._createPieChart(index, item, data)[1]}  
            />)
          )
        }
        </Group>
        <Group x={propsradius + margin} y={propsradius + margin}> 
        {
          data.map( (item, index) => 
            (<PiePiece
              key={index}
              color={this._color(index)}
              d={this._createPieChart(index, item, data)[0]}  
            />)
          )
        }
        </Group>


        </Surface>
        <View style={{position: 'absolute', top: propsradius + margin - 15}}>
          <Text style={[styles.scoreStyle, {}]}>{eventScore}</Text>
        </View>
        <View>
          {
            data.map( (item, index) =>
            // {
              // var fontWeight = this.state.highlightedIndex == index ? 'bold' : 'normal';
              
                (<TouchableWithoutFeedback key={index}>
                  <View>
                    <Text style={[styles.label, {color: this._color(index), fontWeight: 'normal'}]}>{this._label(item)}: {item.score}%</Text>
                  </View>
                </TouchableWithoutFeedback>
              )
            // })
            )
          }
        </View>


      </View>
    );
  }

}

              //   (<TouchableWithoutFeedback key={index} onPress={() => this._onPieItemSelected(index)}>
              //     <View>
              //       <Text style={[styles.label, {color: this._color(index), fontWeight: 'normal'}]}>{this._label(item)}: {item.score}%</Text>
              //     </View>
              //   </TouchableWithoutFeedback>
              // )
        
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    // backgroundColor: '#EEE', // gray background
    margin: 3,
  },
  scoreStyle: {
    fontSize: 20,
    // color: '#ffffff', // white color
  },
  label: {
    alignSelf: 'center'
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(({routes, eventsReducers}) => { return {routes, eventsReducers} }, mapDispatchToProps)(Graph);
