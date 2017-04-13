import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative, {
  ART,
  LayoutAnimation,
} from 'react-native';

const {
  View,
  Text,
  StyleSheet,
} = ReactNative;

const {
  Shape,
} = ART;

import * as shape from 'd3-shape';

const d3 = {
  shape,
};

// let arcs = d3.shape.pie()
//   // .value(this._value)
//   .value(8)
//   (this.props.data);

// let arc = d3.shape.arc()
//   .outerRadius(150 / 2)  // Radius of the pie 
//   .padAngle(.05)    // Angle between sections
//   .innerRadius(30);  // Inner radius: to create a donut or pie
//   // (arcs[index]);

// let arcData = arcs[this.props.index];
// let path = arc(arcData);
      /*<View>
        <Shape
          d={this.props.d()}
          stroke={this.props.color} // green line
          fill={this.props.color}
        />
        <Shape />
      </View>*/

              /*<View>
        <Shape
          d={this.props.d()[0]}
          stroke={this.props.color} // green line
        strokeWidth={3}
        />
        <View>
        <Shape
          d={this.props.d()[1]}
          stroke={this.props.color} // green line
          strokeWidth={3}
        /></View>
        </View>*/

class PiePiece extends Component { 
  constructor(props) {
    super(props);
  }   
  render () {
    console.log('d', this.props.d);
    return (
        <Shape
          d={this.props.d}
          stroke={'#808080'} // gray line
          strokeWidth={3}
        fill={this.props.color}
        />

    );
  }
}

          // fill={this.props.color}


export default connect(({routes}) => ({routes}))(PiePiece);
