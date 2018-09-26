import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {  Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import colors from '../../../colors'
import basicStyles from '../../styles/styles';
import styles from './styles';

class Sort extends Component {

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
  closeModal = () => {
    this.props.set({showSort: false});
    this.props.searchPlaces();
  }

  render() {

    const { filters } = this.props;

    if (filters !== undefined){
      return (

        <ScrollView 
          keyboardShouldPersistTaps="always"
          >
          <View style={styles.item}>
            <Text style={[basicStyles.textNormal, basicStyles.textBold]}>Sort by</Text>
            <TouchableOpacity 
              style={filters.has('sortByDistance') ? styles.filterActive : styles.filterInactive} 
              onPress={this.setFilter.bind(this, 'sortByDistance', {category: 'sortByDistance', value: 1})}>
              <Text style={ filters.has('sortByDistance') ? styles.textFilterActive : styles.textFilterInactive}>Distance</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={!filters.has('sortByDistance') ? styles.filterActive : styles.filterInactive} 
              onPress={this.setFilter.bind(this, 'sortByDistance', {category: 'sortByDistance', value: 1})}>
              <Text style={ !filters.has('sortByDistance') ? styles.textFilterActive : styles.textFilterInactive}>Rating</Text>
            </TouchableOpacity>
          </View>
          <View style={basicStyles.center}>
            <TouchableOpacity
              onPress={this.closeModal}
              style={basicStyles.buttonPrincipal}
              >
                <Text style={basicStyles.textButtonPrincipal}>Apply</Text>
            </TouchableOpacity> 
          </View>
            
      </ScrollView>
      );
    }else{
      return null;
    }
  }

}

export default Sort;
