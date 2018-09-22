import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../../../colors'
import styles from '../../styles/styles';

export default class Spinner extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { animating, color, style } = this.props;

    console.log('en spinner')
    return (
      <View style={[styles.flex, styles.center, style ]}>
      {
        //animating === true &&
        <ActivityIndicator
          animating={animating}
          //style={[{ height: 80 }]}
          size={ this.props.size === undefined ? "large" : this.props.size}
          color={color !== undefined ? color : colors.grayMedium}
        />
      }
      </View>
    );
  }
}