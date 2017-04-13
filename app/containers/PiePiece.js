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

class PiePiece extends Component { 
  constructor(props) {
    super(props);
  }   
  render () {
    console.log('d', this.props.d);
    return (
        <Shape
          d={this.props.d} // path
          stroke={'#808080'} // gray border line
          strokeWidth={1} // for border
          fill={this.props.color} // fill color of selected information
        />

    );
  }
}

          // fill={this.props.color}


export default connect(({routes}) => ({routes}))(PiePiece);
