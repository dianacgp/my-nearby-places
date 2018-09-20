import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Scene, Router, Actions, Reducer, ActionConst, Overlay, Tabs, Modal, Drawer, Stack, Lightbox } from 'react-native-router-flux';
import Places from './places';
import Place from './place';
import Recommendations from './recommendations';
import colors from '../../colors'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: 'white',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: 'gray',
  },
  sceneStyle: {
    backgroundColor: colors.background,
  }
});

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
    onStateChange={stateHandler} 
    sceneStyle={styles.sceneStyle}>
    <Overlay key="overlay">
      <Modal key="modal" hideNavBar>
        <Lightbox key="lightbox"  type={ActionConst.RESET}>
          <Stack key="root" titleStyle={{ alignSelf: 'center' }}>
            <Scene key="recommendations" component={Recommendations} initial type={ActionConst.RESET} />
            <Scene key="places" component={Places} title="Places" type={ActionConst.RESET} />
            <Scene key="modal_place" component={Place} hideNavBar={false}  />

          </Stack>
        </Lightbox>
      </Modal>
    </Overlay>
  </Router>
);

export default Scenes;
