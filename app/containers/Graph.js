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
    console.log('event red', this.props.eventsReducers.currEvent);
    data = this.props.data;
    colors = this.props.colors;
    eventScore = this.props.eventScore;
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

function mapStateToProps(state) {
  return {
    eventsReducers: state.eventsReducers,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Graph);