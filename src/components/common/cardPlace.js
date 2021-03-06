import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '../../../colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Categories from './categories';
import Snippets from './snippets';
import basicStyles from '../../styles/styles';
import { Actions } from 'react-native-router-flux';
const General = require('../../functions/general.js');
var I18n = require('../translations/i18n');

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
    marginRight: 10,
  },

  name: {
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: 5,
    fontSize: 14,

  },
  nameRating: {
    flexDirection: 'row',
    alignItems: 'center',
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

export default class CardPlace extends Component {


  render(){

    const { item, index } = this.props;

    return(
      <TouchableOpacity 
        key={index} 
        style={styles.containerItem}
        onPress={()=> {Actions.modal_place({idVenue: item.venue.id})}}>
      
        <View style={styles.bodyItem}>
          <View 
            style={styles.body}
            >
            <View style={styles.nameRating}>
              {item.rating &&  
              <View style={[basicStyles.rating, basicStyles.center]}>
                <Text style={basicStyles.textRating}>{item.rating}</Text>
              </View>
              }
              <Text style={[styles.name, basicStyles.column]}>{item.venue.name}</Text>
            </View>
            <View style={basicStyles.row}>
              {item.venue.location &&
                <Text style={basicStyles.textVerySmall}>{General.getLocation(item.venue.location)}  <Text style={basicStyles.textBold} onPress={()=> {this.props.set({openMap: true, place: item.venue})}} >( {I18n.t('openInMaps')} )</Text></Text>
              }
             
            </View>
          </View>
          <View>
            { item.photo !== undefined ? 
            <Image  resizeMethod={'resize'} style={styles.imagePlace} source={{ uri: item.photo.prefix + '200x200' + item.photo.suffix }} />
            :
            <View style={styles.withoutImage}>
              <Icon name="picture-o" size={30} color={colors.grayLighter} />
            </View>
            }
          </View>
        </View>
         
        <Categories  place={item.venue}/> 
        <Snippets snippets={item.snippets}/>
      </TouchableOpacity>
    )
  }
}
