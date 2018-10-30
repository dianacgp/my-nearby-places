import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  TouchableOpacity, 
  Text,
  ScrollView
} from 'react-native';
import { setLanguageApp } from '../reducers/places/actions';
import { connect } from 'react-redux';
import styles from '../styles/styles';
import { Actions } from 'react-native-router-flux';
import RNRestart from 'react-native-restart';

var I18n = require('./translations/i18n');

class Menu extends Component {

  constructor(props) {
   
    super(props);
    this.data = [];
    
    Object.keys(I18n.translations).map((lang, i) => {      
      this.data.push({label: I18n.t(lang), value: lang })
    });
  }
  setLanguage = async (lang) => {    

    try{
      await this.props.setLanguageApp(lang);
      //Expo.Util.reload()
    }catch (error) {
      console.log(error);     
      return;
    }  
  }


  render() {

    console.log('data', this.data)
    return (
      <ScrollView 
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        style={styles.menu}
        >
      
        <Text style={styles.textMenu}>{I18n.t('changeLanguage')}</Text>
          {this.data.map((option, i) =>
          <TouchableOpacity
            onPress={this.setLanguage.bind(this, option.value)}
            key={i} style={styles.itemMenu}>
            <Text style={styles.textItemMenu}>{option.label}</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    );
  }
}

export default connect(state => ( {}), { setLanguageApp })(Menu);