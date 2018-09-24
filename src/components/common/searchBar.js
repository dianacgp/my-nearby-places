import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet,  Dimensions, ActivityIndicator, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { setErrorLocation } from '../../reducers/places/actions';
import colors from '../../../colors'
import basicStyles from '../../styles/styles';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
const { width, height } = Dimensions.get('window');

const styles =  StyleSheet.create({

  container: {
    flex: 1,
    paddingHorizontal: 11,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  containerIconText: {
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
  contentInput: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  containerInputSearchBar: {
    backgroundColor: colors.inputSearch,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 15,
    padding: 10,
    paddingLeft: 0,
    marginRight: 5,
  },
  inputSearchBar: {
    width: width ,
    color: colors.text,
    fontSize: 14,
    width: (width / 2) - 10,
  },
  iconSearchBar: {
    marginRight: 5,
  },
  textButtonSearch: {
    color: colors.principal,
  },
  paddingVertical: {
    paddingVertical: 10,
  },
  containerSearchBar:{
    backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    
    borderBottomColor: colors.grayMedium,
    ...Platform.select({
      ios: {
        paddingRight: 10,
        paddingTop: 30,
        paddingBottom: 3,
      },
      android: {
        paddingRight: 15,
        paddingTop: 30,
        paddingBottom: 3,
      }
    }),
  },
  iconBack: {
    backgroundColor: 'blue',
    ...Platform.select({
      ios: {
        width: 40,
        paddingLeft: 10,
      },
      android: {
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        //paddingTop: 10, 

      }
    }),
   
  }
 

});

class SearchBar extends Component {

  render(){

    if(this.props.error_location){
      return(<Text style={[basicStyles.textButtonPrincipal, basicStyles.textCenter]}>My Nearby Places</Text>)
    }else{
      if( this.props.openModalSearch && this.props.onPress){

        return(
        
          <TouchableOpacity onPress={this.props.onPress}  style={styles.container} >
            <View style={styles.containerIconText}>
              <Icon name="search" color={colors.grayMedium} size={16} style={styles.iconSearchBar} />
              <Text style={styles.textSearch}
              >Search near me</Text>
            </View>
          </TouchableOpacity>
        )
      }else{
        return(
          <View style={[styles.containerSearchBar]}>
            <View style={styles.contentInput}>
              <TouchableOpacity
                style={styles.iconBack}
                onPress={Actions.pop}
                >
                <Ionicon  name={Platform.OS === 'android' ?  'md-arrow-back' : 'ios-arrow-back'} size={Platform.OS === 'android' ?  25 : 35} color={colors.principal} />
              </TouchableOpacity>
              <View style={styles.containerInputSearchBar}>
                <Icon name="search" color={colors.grayMedium} size={16} style={styles.iconSearchBar} />
                <TextInput
                  autoFocus={true}
                  {...this.props.TextInput}
                  clearButtonMode='always'
                  underlineColorAndroid="transparent"
                  style={styles.inputSearchBar}
                 />
              </View>
            </View>
            <View style={{flexDirection: 'row', backgroundColor: 'pink'}}>
              { this.props.refreshing &&
              <ActivityIndicator size="small" color={colors.principal} />
              }
            <TouchableOpacity
              {...this.props.Button}
              style={basicStyles.buttonPrincipal}
              >
                <Text style={basicStyles.textButtonPrincipal}>Search</Text>
            </TouchableOpacity>
            </View>
          </View>
        )
      }
    }
  }
}

const mapStateToProps = state => {
  return {
    error_location: state.places.error_location
  }
}

export default connect(state => ( mapStateToProps), { setErrorLocation })(SearchBar);
