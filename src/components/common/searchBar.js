import React, { Component } from 'react';
import { View, Button, TextInput, TouchableOpacity, Text, StyleSheet,  Dimensions, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../../colors'
const { width, height } = Dimensions.get('window');

const styles =  StyleSheet.create({

  container: {
    flex: 1,
    paddingHorizontal: 11,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerData: {
    backgroundColor: colors.inputSearch,
    flexDirection: 'row',
    borderRadius: 15,
    padding: 10,
    flex: 1,
  },
  textSearch: {
    color: colors.textSecondary,
    fontSize: 14,
  },

  containerSearchBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  containerInputSearchBar: {
    backgroundColor: colors.inputSearch,
    flexDirection: 'row',
    borderRadius: 15,
    padding: 10,
  },
  inputSearchBar: {
    width: width ,
    color: colors.text,
    fontSize: 14,
    width: width / 2
  },
  iconSearchBar: {
    marginRight: 5,
  },
  textButtonSearch: {
    color: colors.principal,
  },
  paddingVertical: {
    paddingVertical: 10,
  }
 

});
export default class SearchBar extends Component {

  render(){

    if( this.props.openModalSearch && this.props.onPress){
      return(
        <TouchableOpacity onPress={this.props.onPress}  style={styles.container} >
          <View style={styles.containerData}>
            <Icon name="search" color={colors.grayMedium} size={16} style={styles.iconSearchBar} />
            <Text style={styles.textSearch}
            >Search near me</Text>
          </View>
        </TouchableOpacity>
      )
    }else{
      return(
      <View style={[styles.container, styles.paddingVertical]}>
        <View style={styles.containerInputSearchBar}>
          <Icon name="search" color={colors.grayMedium} size={16} style={styles.iconSearchBar} />
          <TextInput
            autoFocus={true}
            {...this.props.TextInput}
            clearButtonMode='always'
            style={styles.inputSearchBar}
           />
        </View>
        <View style={{flexDirection: 'row'}}>
          { this.props.refreshing &&
          <ActivityIndicator size="small" color={colors.principal} />
          }
        <Button
          {...this.props.Button}
          color={colors.principal}
          title="Search"
        />
        </View>
      </View>
    )
    }
    
    
  }
}
