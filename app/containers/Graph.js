import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
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

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    // margin: 10,
    color: '#ffffff',
  }
});

const data = [
  {'weight': 1, 'name': 'Spotify Artist Ranking', 'score': 60},
  {'weight': 1, 'name': 'Spotify Play Count', 'score': 90},
  {'weight': 1.5, 'name': 'SeatGeek Score', 'score': 75},
  {'weight': 1, 'name': 'iamjasonkuo internet crawling', 'score': 40},
  {'weight': 2, 'name': 'Beyonce test', 'score': 100},
  {'weight': .5, 'name': 'Misc', 'score': 80},
];

const eventScore = 
  Math.round(
  data.reduce(function(a, b) {
    return a + (b.score * b.weight); 
  }, 0) / 
  data.reduce(function(a, b) { 
    return a + b.weight; 
  }, 0)
  );

const colors = [
  '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
  '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
];

// delete these later // change to props;
const propsradius = 100;
const innerRadius = 20; // .3 * pieWidth/2  OR .3 * pieRadius
const margin = 20;
const width = 2*propsradius + 2*margin;
const height = 2*propsradius + 2*margin;

class Graph extends Component {
  constructor(props) {
    super(props);
    this._value = this._value.bind(this);
    this._label = this._label.bind(this);
    this._color = this._color.bind(this);
    this._createPieChart = this._createPieChart.bind(this);
    this._onPieItemSelected = this._onPieItemSelected.bind(this);
  }  
  _value(item) { return item.weight; }
  _label(item) { return item.name; }
  _color(index) { 
    return colors[index % colors.length]; 
  }

  _createPieChart(index, item) {

    console.log('val', this._value);
    let arcs = d3.shape.pie()
      // .value(this._value)
      .value(this._value)
      (data);

    let arc = d3.shape.arc()
      .outerRadius(( propsradius - innerRadius)*item.score/100 + innerRadius)  // Radius of the pie 
      .padAngle(.05)    // Angle between sections
      .innerRadius(innerRadius);  // Inner radius: to create a donut or pie
      // (arcs[index]);

    let outerArc = d3.shape.arc()
      .outerRadius(propsradius)  // Radius of the pie 
      .padAngle(.05)    // Angle between sections
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
    return (
      <View style={styles.container}>

        <Surface width={width} height={height}>
        <Group x={width/2} y={propsradius + margin}> 
        {
          data.map( (item, index) => 
            // {console.log(item)}
            (<PiePiece
              key={index}
              color={'rgba(0,0,0,0)'} // white is #ffffff
              d={this._createPieChart(index, item)[1]}  
            />)
          )
        }
        </Group>
        <Group x={width/2} y={propsradius + margin}> 
        {
          data.map( (item, index) => 
            // {console.log(item)}
            (<PiePiece
              key={index}
              color={this._color(index)}
              d={this._createPieChart(index, item)[0]}  
            />)
          )
        }
        </Group>


        </Surface>







        <View style={{position: 'absolute', top: propsradius + margin - 15}}>
          <Text style={[styles.welcome, {}]}>{eventScore}</Text>
        </View>
        <View style={{position: 'absolute', top: height}}>
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
        

export default connect(({routes}) => ({routes}))(Graph);