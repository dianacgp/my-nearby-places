import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import colors from '../../../colors';
import basicStyles from '../../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({

  container: {
    backgroundColor: colors.grayVeryLight,
    padding: 20,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,

  },
  iconError: {
    marginBottom: 10,
  },
  textCenter: {
    textAlign: 'center',
  }

});

export default class Message extends Component {
  render() {
    const { message, reload, error, textReload, messageError} = this.props;

    return (
       <TouchableOpacity  onPress={reload}style={styles.container}>
       
          <View style={basicStyles.center}>
            <Icon name={ error ? "exclamation-triangle" : "info-circle"} size={30} color={colors.grayDark} style={styles.iconError} />
            <Text style={[basicStyles.textNormal, styles.textCenter]}>
              { messageError ?
                messageError
                : 
                error ?
                'It seems you have problems with your connection'
                :
                message
              }
            </Text>
            {error && reload &&
            <Button
              onPress={reload}
              title= {textReload ? textReload : "Try again"}
              color={colors.principal}
            /> 
            }
          </View>    
      </TouchableOpacity>
    );
  }
}