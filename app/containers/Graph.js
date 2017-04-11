import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ReactNative, {ART} from 'react-native';
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  }
});

const data = [
  {'number': 8, 'name': 'Fun activities'},
  {'number': 7, 'name': 'Dog'},
  {'number': 16, 'name': 'Food'},
  {'number': 23, 'name': 'Car'},
  {'number': 42, 'name': 'Rent'},
  {'number': 4, 'name': 'Misc'},
];

const colors = [
  '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
  '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
];

// this._value = this._value.bind(this);
//  _value(item) { 
//   return item.number; 
// }


        // d={'M-68.9646319937036,-29.476762610114324A75,75,0,0,1,-49.345310456503256,-56.48044206582762L-20.635195356782273,-21.775874553905552A30,30,0,0,0,-27.086713440010442,-12.896121704557451Z'}
class Graph extends Component {
  constructor(props) {
    super(props);
    this._value = this._value.bind(this);
  }  
  _value(item) { return item.number; }
  _label(item) { return item.name; }
  _color(index) { 
    return colors[index % colors.length]; 
  }

  _createPieChart(index) {
    let arcs = d3.shape.pie()
      // .value(this._value)
      .value(this._value)
      (data);

    let arc = d3.shape.arc()
      .outerRadius(150 / 2)  // Radius of the pie 
      .padAngle(.05)    // Angle between sections
      .innerRadius(30);  // Inner radius: to create a donut or pie
      // (arcs[index]);

    let arcData = arcs[index];
    let path = arc(arcData);
    return path;
  }

  // console.log('what is paths even anyway', arcs);
  // console.log('this is the path', path);
  // this._value = 
          // key={index}
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Oh Hai
        </Text>

        <Surface width={200} height={500}>
        <Group x={95} y={95}> 
        {
          data.map( (item, index) => 
            // {console.log(item)}
            (<PiePiece
              key={index}
              color={this._color(index)}
              d={() => this._createPieChart(index)}  
            />)
          )
        }
        </Group>
        </Surface>
      </View>
    );
  }

}

              // color={colors[index]}
export default connect(({routes}) => ({routes}))(Graph);

