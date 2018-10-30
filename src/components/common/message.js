import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../../colors';
import basicStyles from '../../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
var I18n = require('../translations/i18n');

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
  },
  button: {
    marginTop: 10,
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
                I18n.t('problemsConnection')
                :
                message
              }
            </Text>
            {error && reload &&
            <TouchableOpacity
              onPress={reload}
              style={[basicStyles.buttonPrincipal, styles.button]}
            >
              <Text style={basicStyles.textButtonPrincipal}> {textReload ? textReload : I18n.t('tryAgain')}</Text>
            </TouchableOpacity> 
            }
          </View>    
      </TouchableOpacity>
    );
  }
}