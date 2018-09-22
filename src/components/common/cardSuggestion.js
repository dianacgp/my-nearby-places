import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '../../../colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Categories from './categories';
import Snippets from './snippets';
import basicStyles from '../../styles/styles';
import { Actions } from 'react-native-router-flux';
const General = require('../../functions/general.js');

const styles = StyleSheet.create({

  containerItem: {
    padding: 10,
    flexDirection: 'column', 
    borderBottomColor: colors.grayLight,
    borderBottomWidth: 1,
  },
  bodyItem: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row', 
  },
  body: {
    flex: 1,
    flexDirection: 'column',
  },

  name: {
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: 5,
    fontSize: 14,
  },

  imagePlace: {
    borderColor: colors.grayLighter,
    borderWidth: 1,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },

  withoutImage: {
    borderColor: colors.grayLighter,
    borderWidth: 1,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },

});

export default class CardSuggestion extends Component {
  
  render(){

    const { item, index } = this.props;

    return(
      <TouchableOpacity 
        key={index} 
        style={styles.containerItem}
        onPress={()=> {Actions.modal_place({item: item})}}>
        <View style={styles.bodyItem}>
          <View 
            style={styles.body}
            >
            <Text style={styles.name}>{item.venue.name}</Text>
            <View style={basicStyles.row}>
              {item.venue.location &&
                <Text style={basicStyles.textVerySmall}>{General.getLocation(item.venue.location)}  <Text style={styles.link} onPress={()=> {this.props.set({openMap: true, place: item.venue})}} >Open in Maps</Text></Text>
              }
             
            </View> 
            <Categories  categories={item.venue.categories }/> 
          </View>
          <View>
            { item.photo !== undefined ? 
            <Image  style={styles.imagePlace} source={{ uri: item.photo.prefix + '200x200' + item.photo.suffix }} />
            :
            <View style={styles.withoutImage}>
              <Icon name="picture-o" size={30} color={colors.grayLighter} />
            </View>
            }
          </View>
        </View>
        <Snippets snippets={item.snippets}/>
      </TouchableOpacity>
    )
  }
}
