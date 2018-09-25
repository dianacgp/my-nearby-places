import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import colors from '../../../colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const propTypes = {
  focused: PropTypes.bool,
  title: PropTypes.string,
};

const defaultProps = {
  focused: false,
  title: '',
};

const TabIcon = props => <Icon  size={25} name={props.title} color={props.focused ? 'white' : colors.principal} />;

TabIcon.propTypes = propTypes;
TabIcon.defaultProps = defaultProps;

export default TabIcon;
