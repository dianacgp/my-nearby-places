import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import colors from '../../../colors'
import basicStyles from '../../styles/styles';
import styles from './styles';
var I18n = require('../translations/i18n');

const prices = [
  {
    label: '$', value: 1
  },
  {
    label: '$$', value: 2
  }, 
  {
    label: '$$$', value: 3
  },
  {
    label: '$$$$', value: 4,
  }
];

class Filters extends Component {

  constructor(props) {
    super(props);
  }
  setFilter = (key, value) => {
    let { filters } = this.props; 

    if (filters.has(key)){

      filters.delete(key);
    }
    else{
      filters.set(key, value);
    } 
    this.props.set({filters})
  }
  closeModal = ( apply ) => {
    this.props.set({showFilters: false});
    if ( apply ) {
      this.props.searchPlaces();
    }
  }

  render() {

    const { filters } = this.props;

    if (filters !== undefined){
      return (

        <ScrollView 
          keyboardShouldPersistTaps="always"
          >
          <View style={styles.item}>
            <Text style={[basicStyles.textNormal, basicStyles.textBold]}>Price</Text>
            <View style={styles.labels}>
              {prices.map((price, i) =>
                <TouchableOpacity 
                  key={i} 
                  style={filters.has('prices=' + (price.value)) ? styles.filterActive : styles.filterInactive} 
                  onPress={this.setFilter.bind(this, 'prices=' + (price.value),{category: 'price', value: price.value})}>
                  <Text style={ filters.has('prices=' + (price.value)) ? styles.textFilterActive : styles.textFilterInactive}>{price.label}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={styles.item}>
            <Text style={[basicStyles.textNormal, basicStyles.textBold]}>Open Now</Text>
            <TouchableOpacity
               style={filters.has('openNow') ? styles.filterActive : styles.filterInactive} 
               onPress={this.setFilter.bind(this, 'openNow', {category: 'openNow', value: 1})}>
              <Text 
                style={filters.has('openNow') ? styles.textFilterActive : styles.textFilterInactive}
                >{I18n.t('yes')}</Text>
            </TouchableOpacity>
          </View>
          <View style={[basicStyles.center, basicStyles.rowSpaceBetween]}>
            <TouchableOpacity
              onPress={this.closeModal.bind(this, false)}
              style={basicStyles.buttonPrincipal}
              >
                <Text style={basicStyles.textNormal}>{I18n.t('cancel').toUpperCase()}</Text>
            </TouchableOpacity> 
            <TouchableOpacity
              onPress={this.closeModal.bind(this, true)}
              style={basicStyles.buttonPrincipal}
              >
                <Text style={basicStyles.textButtonPrincipal}>{I18n.t('apply').toUpperCase()}</Text>
            </TouchableOpacity> 
          </View>
        </ScrollView>
      );
    }else{
      return null;
    }
  }

}

export default Filters;
