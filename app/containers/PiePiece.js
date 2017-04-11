import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ART,
  LayoutAnimation,
} from 'react-native';

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

class PiePiece extends Component { 
  constructor(props) {
    super(props);
  }   
  // const path = this.props.path;
  render () {
    console.log('d', this.props.d);
    return (
      <Shape
        d={this.props.d()}
        stroke={this.props.color} // green line
        fill={this.props.color}
      />
    );
  }
}
        // strokeWidth={3}

export default connect(({routes}) => ({routes}))(PiePiece);
