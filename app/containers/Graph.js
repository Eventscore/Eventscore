import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ReactNative, {ART} from 'react-native';

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

const Graph = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Oh Hai
      </Text>

<Surface width={500} height={200}>
    <Group x={300} y={100}> 
      <Shape
        d={'M-68.9646319937036,-29.476762610114324A75,75,0,0,1,-49.345310456503256,-56.48044206582762L-20.635195356782273,-21.775874553905552A30,30,0,0,0,-27.086713440010442,-12.896121704557451Z'}
        stroke={'#2ca02c'}  // green line
        strokeWidth={3}     
      />
    </Group>
</Surface>


    </View>
  );
};

export default connect(({routes}) => ({routes}))(Graph);




