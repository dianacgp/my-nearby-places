import React, { Component } from 'react';
import { BackHandler, AppState } from 'react-native';
import scenes from './src/components/scenes/scenes';
import styles from './src/styles/styles';
import { Actions, Router, Reducer } from 'react-native-router-flux';
import colors from './colors'

const reducerCreate = params => { 
  const defaultReducer = new Reducer(params); 
  return (state, action) => { 

      return defaultReducer(state, action); 
    }; 
  };
export default class Home extends Component {

	 constructor(props) {
    super(props);
    this.state = {
      backPress: false,
      routes: ['home'],
      router: false,
    };

  }

	onExitApp = () => {

    let _this = this;

    if (Actions.state.routes[0].index === 0) {
      if(!this.state.backPress) {
        this.setState({ backPress: this.state.backPress + 1 })
        this.setState({ backPress: true });
        setTimeout(function () {
          _this.setState({ backPress: false });
        }, 3000);
        return true;
      } else {
        BackHandler.exitApp();
        return false;
      }
    } else {
      Actions.pop();
      return true;
    }
  }

  render() {

    return (
     
      <Router
        backAndroidHandler={() => this.onExitApp()}
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