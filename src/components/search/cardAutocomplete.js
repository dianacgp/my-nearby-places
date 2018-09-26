import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '../../../colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Categories from '../common/categories';
import Snippets from '../common/snippets';
import basicStyles from '../../styles/styles';
import { Actions } from 'react-native-router-flux';
const General = require('../../functions/general.js');

const styles = StyleSheet.create({

  containerItem: {
    padding: 10,
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomColor: colors.grayLight,
    borderBottomWidth: 1,
  },


  name: {
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: 5,
    fontSize: 14,
  },

  image: {
    width: 40,
    height: 40,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.grayLighter,
    borderWidth: 1,
    borderRadius: 5,
  },

  icon: {
    width: 30,
    height: 30,
  },

});

export default class CardAutocomplete extends Component {
  
  open = () => {
    const { item } = this.props;

    if (item.type === 'minivenue') {
      Actions.modal_place({idVenue: item.object.id})
    }else{
      if (item.type === 'query') {

        this.props.set({searchTerm: item.text})
        this.props.searchPlaces(item.text);
      }
    }
  }
  render(){

    const { item, index } = this.props;

    
    return(
      <TouchableOpacity 
        key={index} 
        style={styles.containerItem}
        onPress={this.open}>
          { item.object &&
            item.object.icon ? 
            <View style={styles.image}>
              <Image  resizeMethod={'resize'} style={styles.icon} source={{ uri: item.object.icon.prefix + '30' + item.object.icon.name }} />
            </View>
            :
             item.object.bestPhoto ?
            <Image resizeMethod={'resize'} style={styles.image} source={{ uri: item.object.bestPhoto.prefix + '200x200' + item.object.bestPhoto.suffix }} />
            :
            <View style={styles.image}>
              <Icon name="picture-o" size={20} color={colors.grayLighter} />
            </View>
          }
          <Text style={styles.name}>{item.text}</Text>

      </TouchableOpacity>
    )
  }
}
