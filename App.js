import React,{ Component } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { Provider } from 'react-redux';
import Home from './home';
import configureStore from './src/reducers/configureStore';
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';;
const store = configureStore();
const engineKey = 'redux-storage:myNearbyPlaces';
const engine = createEngine && createEngine(engineKey);
import { connect } from 'react-redux';


export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      backPress: false,
      routes: ['home'],
      initialized: false,
      loaded: false,
    };
    console.log('props', this.props.languageApp)
    console.log('storage', store)
    this.store = configureStore({hola: 'jj'});
     
 
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <Provider store={this.store}>        
            <Home/>        
          </Provider>  
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/icon.png'),
        require('./assets/icon.png'),
      ]),
      // Font.loadAsync({
      //   // This is the font that we are using for our tab bar
      //   ...Icon.Ionicons.font,
      //   // We include SpaceMono because we use it in HomeScreen.js. Feel free
      //   // to remove this if you are not using it in your app
      //   //'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      // }),
    ]);
  };

  _handleLoadingError = error => {

    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});





