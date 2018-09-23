import React, { Component } from 'react';
import { View, Button, TextInput, TouchableOpacity } from 'react-native';
import basicStyles from '../../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../../colors'

export default class SearchBar extends Component {

  render(){
    
    return(
      <TouchableOpacity onPress={this.props.onPress} style={basicStyles.containerSearchBar}>
        <View style={basicStyles.containerInputSearchBar}>
          <Icon name="search" color={colors.grayMedium} size={16} style={basicStyles.iconSearchBar} />
          <TextInput
            autoFocus={true}
            {...this.props.TextInput}
            clearButtonMode='always'
            style={basicStyles.inputSearchBar}
           />
        </View>
        <Button
          {...this.props.Button}
          color={colors.principal}
          title="Search"
        />
      </TouchableOpacity>
    )
  }
}
