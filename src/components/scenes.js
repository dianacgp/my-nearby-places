import React from 'react';
import { Platform, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Scene, Router, Actions, Reducer, ActionConst, Overlay, Tabs, Modal, Drawer, Stack, Lightbox } from 'react-native-router-flux';
import Home from './home';
import Places from './places';
import Place from './place';
import Gallery from './common/gallery';
import colors from '../../colors'
import styles from '../styles/styles';
import { Container, Header, Item, Input, Icon, Button, Text, Card, CardItem, Body, Thumbnail, List, ListItem, Left, Right, Badge } from 'native-base';


const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log('reducer: ACTION:', action);
    return defaultReducer(state, action);
  };
};

const stateHandler = (prevState, newState, action) => {
  console.log('onStateChange: ACTION:', action);
};

const getSceneStyle = () => ({
  backgroundColor: 'white',
});


const Scenes = () => (
  <Router 
    createReducer={reducerCreate} 
    //onStateChange={stateHandler} 
    sceneStyle={styles.sceneStyle}
    navigationBarStyle={styles.navigationBarStyle}>
    <Overlay key="overlay">
      <Modal key="modal" hideNavBar>
        <Lightbox key="lightbox"  type={ActionConst.RESET}>
          <Stack key="root" titleStyle={{ alignSelf: 'center' }}>
           
            <Scene key="home" initial component={Home} type={ActionConst.RESET} hideNavBar />
            <Scene key="places" component={Places} title="Places" type={ActionConst.RESET} />
            <Scene key="modal_place" component={Place} hideNavBar={false}  />
            <Scene key="modal_gallery" component={Gallery} hideNavBar={false} navigationBarStyle={styles.navigationBarStyleBlack} />
          </Stack>
        </Lightbox>
      </Modal>
    </Overlay>
  </Router>
);

export default Scenes;
