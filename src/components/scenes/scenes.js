import React from 'react';
import { BackAndroid, Platform, StyleSheet, Text, View, TouchableOpacity, BackHandler, ToastAndroid, Alert } from 'react-native';
import { 
  Scene, 
  Actions, 
  ActionConst, 
  Overlay, 
  Tabs, 
  Modal, 
  Drawer,
  Lightbox,
  Stack
} from 'react-native-router-flux';
import Food from '../suggestions/food';
import Coffee from '../suggestions/coffee';
import Drinks from '../suggestions/drinks';
import Arts from '../suggestions/arts';
import Shops from '../suggestions/shops';
import Search from '../search/search';
import Place from '../place';
import Gallery from '../common/photos/gallery';
import WebView from '../common/webview';
import Location from '../location';
import colors from '../../../colors'
import styles from '../../styles/styles';
import SearchBar from '../common/searchBar';
import TabIcon from './tabIcon';
import Menu from '../menu';
import Icon from 'react-native-vector-icons/Ionicons';

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
const icon_menu = <Icon name="md-menu" size={35} color={colors.principal}/>;

get_scenes = () => {
  return (

    <Overlay key="overlay">
      <Modal key="modal" hideNavBar>
        <Lightbox key="lightbox">
            
          <Stack key="root" hideNavBar titleStyle={{ alignSelf: 'center' }}>
            <Scene key="location" hideNavBar={false} title='My nearby places' component={Location} initial type={ActionConst.RESET}/>
            <Scene key="modal_search" hideNavBar component={Search} onBack={this.back} back={true} />
            <Scene key="modal_place" hideNavBar component={Place} hideNavBar={false} onBack={this.back} back={true}  />
            <Scene key="modal_gallery" component={Gallery} hideNavBar={false} navigationBarStyle={styles.navigationBarStyleBlack} onBack={this.back} back={true} />
            <Scene key="modal_webview" component={WebView} hideNavBar={false} onBack={this.back} back={true} />
     
            <Drawer
              drawerPosition={'left'} 
              hideNavBar
              key="drawer"
              contentComponent={Menu}
              drawerIcon={icon_menu}
              drawerWidth={250}>
              <Scene hideNavBar>
                <Tabs
                  tabBarPosition='bottom'
                  renderTitle={() => this.search()}
                  
                  key="tabbar"
                  routeName="tabbar"
                  backToInitial

                  showLabel={false}
                  tabBarStyle={styles.tabBarStyle}
                  activeBackgroundColor={colors.principal}
                  inactiveBackgroundColor={'white'}
                >
                  <Scene key="food" title="cutlery" icon={TabIcon} initial component={Food}/>
                  <Scene key="coffee" title="coffee" icon={TabIcon}  component={Coffee}/>
                  <Scene key="drinks" title="beer" icon={TabIcon} component={Drinks}/>
                  <Scene key="arts" title="ticket" icon={TabIcon}  component={Arts}/>
                  <Scene key="shops" title="shopping-cart" icon={TabIcon}  component={Shops}/>

                </Tabs>
              </Scene>
            </Drawer>
          </Stack>
        </Lightbox>
      </Modal>
    </Overlay>
  );
}

export default get_scenes;
