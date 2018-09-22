import React, {   Component } from 'react';
import { Text, View, WebView, Dimensions, StyleSheet, Platform, TouchableOpacity, Clipboard, Linking } from 'react-native';
import colors from '../../../colors';
import * as Progress from 'react-native-progress';
const { width } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import basicStyles from '../../styles/styles';

export default class Web_View extends Component {

  constructor(props) {
    super(props);
    this.state = {     
      load: 0,
    };
  }
  
  render() {
    const { url } = this.props;

    if(this.state.load < 1) {
      setTimeout((function() {
        this.setState({ load: this.state.load + (0.2)});
      }).bind(this), 1000);
    }

    return (
      <View style={{flex: 1}}>
        {this.state.load < 1 &&
          <View>            
            <Progress.Bar color={colors.principal} borderWidth={0} progress={this.state.load} width={width} height={3} />
          </View>
        }
        <WebView
          showsVerticalScrollIndicator={false}
          source={{uri: url}}
          style={{flex: 1}}
        />            
      </View>      
    );
  }
}