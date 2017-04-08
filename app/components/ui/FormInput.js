//<FormInput></FormInput>
import React, { Component, PropTypes } from 'react';
import { FormInput } from 'react-native-elements';

// Consts and Libs
import { AppColors, AppFonts } from '@theme/';

class CustomFormInput extends Component {
  static propTypes = {
    containerStyle: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.shape({}),
    ]),
    inputStyle: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.shape({}),
    ]),
  }

  static defaultProps = {
    containerStyle: [],
    inputStyle: [],
  }

  inputProps = () => {
    // Defaults
    const props = {
      ...this.props,
      containerStyle: [{
        borderBottomColor: AppColors.border,
        borderBottomWidth: 1,
        backgroundColor: 'rgba(255,255,255,0.05)',
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
      }],
      inputStyle: [{
        color: AppColors.textPrimary,
        fontFamily: AppFonts.base.family,
        paddingHorizontal: 10,
        paddingVertical: 3,
      }],
    };

    if (this.props.containerStyle) {
      props.containerStyle.push(this.props.containerStyle);
    }

    if (this.props.inputStyle) {
      props.inputStyle.push(this.props.inputStyle);
    }

    return props;
  }

  render = () => <FormInput {...this.inputProps()} />
}

export default CustomFormInput;
