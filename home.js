import React, { Component } from 'react';
import { BackHandler, ToastAndroid } from 'react-native';
import scenes from './src/components/scenes/scenes';
import styles from './src/styles/styles';
import { Actions, Router, Reducer } from 'react-native-router-flux';
import colors from './colors';
import { connect } from 'react-redux';
var I18n = require('./src/components/translations/i18n');

let backLoginScene = false;
const reducerCreate = params => { 
  const defaultReducer = new Reducer(params); 
  return (state, action) => { 

      return defaultReducer(state, action); 
    }; 
  };
class Home extends Component {

	 constructor(props) {
    super(props);
    this.state = {
      backPress: false,
      routes: ['home'],
      router: false,
    };

  }
  componentWillReceiveProps = (nextProps) => {
    console.log('recibe algo', nextProps)
    if (nextProps.languageApp !== null){
      I18n.locale = nextProps.languageApp;
    }

  }
	onExitApp = () => {

    if (Actions.currentScene === "_food" || Actions.currentScene === "location" ) {
      if (backLoginScene == false) {
        ToastAndroid.show("Click back again to exit.", ToastAndroid.SHORT);
        backLoginScene = !backLoginScene;
        return true;
      } else {
        backLoginScene = false;
        BackHandler.exitApp();
      }
      return false;
    }
  }

  render() {

    return (
     
      <Router
        backAndroidHandler={this.onExitApp}
        createReducer={reducerCreate}
		  	titleStyle={styles.titleStyle}
		    createReducer={reducerCreate} 
		    sceneStyle={styles.sceneStyle}
		    navigationBarStyle={styles.navigationBarStyle}
		    backButtonTintColor={colors.principal}
      >
        {scenes()}
      </Router>

    );
  }
}
export default connect(state => ({
  languageApp: state.places.languageApp,
}),)(Home);
