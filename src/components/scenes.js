import React from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import CardStackStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';
import { Scene, Router, Actions, Reducer, ActionConst, Overlay, Tabs, Modal, Drawer, Stack, Lightbox } from 'react-native-router-flux';
import Home from './home';
import Search from './search/search';
import Place from './place';
import Gallery from './common/photos/gallery';
import WebView from './common/webview';
import Location from './location';
import colors from '../../colors'
import styles from '../styles/styles';
import SearchBar from './common/searchBar';

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    //console.log('reducer: ACTION:', action);
    return defaultReducer(state, action);
  };
};

search = () => {
  return (
    <SearchBar
      route='home'
      showButton= {false}
      onPress={Actions.modal_search}
      openModalSearch={true}
    />
  );
};
back = () => {
  try {
    Actions.pop();
  } catch(e) {
    console.log('error root scene');
  }
}
const Scenes = () => (
  <Router 
    createReducer={reducerCreate} 
    sceneStyle={styles.sceneStyle}
    navigationBarStyle={styles.navigationBarStyle}
    backButtonTintColor={colors.principal}>
    <Overlay key="overlay">
      <Modal key="modal" hideNavBar transitionConfig={() => ({ screenInterpolator: CardStackStyleInterpolator.forFadeFromBottomAndroid })}>
        <Lightbox key="lightbox"  type={ActionConst.RESET}>
          <Stack key="root" titleStyle={{ alignSelf: 'center' }}>
           
            <Scene initial component={Home} type={ActionConst.RESET} hideNavBar={false} 
              renderTitle={() => this.search()}
              />
            <Scene key="location" hideNavBar component={Location} back={false}/>
            <Scene key="modal_search" hideNavBar component={Search} onBack={this.back} back={true} />
            <Scene key="modal_place" hideNavBar component={Place} hideNavBar={false} onBack={this.back} back={true}  />
            <Scene key="modal_gallery" component={Gallery} hideNavBar={false} navigationBarStyle={styles.navigationBarStyleBlack} onBack={this.back} back={true} />
            <Scene key="modal_webview" component={WebView} hideNavBar={false} onBack={this.back} back={true} />
          </Stack>
        </Lightbox>
      </Modal>
    </Overlay>
  </Router>
);

export default Scenes;
