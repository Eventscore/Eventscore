//<Placeholder text={"Hello World"} />

import React, { PropTypes } from 'react';
import { View } from 'react-native';

// Consts and Libs
import { AppStyles } from '@theme/';

// Components
import { Text } from '@ui/';

const Placeholder = ({ text }) => (
  <View style={[AppStyles.container, AppStyles.containerCentered]}>
    <Text>{text}</Text>
  </View>
);

Placeholder.propTypes = { text: PropTypes.string };
Placeholder.defaultProps = { text: 'Coming soon...' };
Placeholder.componentName = 'Placeholder';

export default Placeholder;
