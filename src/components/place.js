import React, { Component } from 'react';
import { StyleSheet, View, FlatList, InteractionManager, ScrollView, Text } from 'react-native';
import { getPlace } from '../reducers/places/actions';
import { connect } from 'react-redux';
import styles from '../styles/styles';
import { Actions } from 'react-native-router-flux';
import { Popup } from 'react-native-map-link';
import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from './common/spinner';
import Categories from './common/categories';
import Attributes from './common/attributes';
import Info from './common/info';
import Photos from './common/photos/photos';
import OpenMap from './common/openMap';
import Message from './common/message';

var I18n = require('./translations/i18n');

class Place extends Component {

  constructor(props) {
    super(props);
    this.state = {
      place: null,
      spinner: true,
      openMap: false,
      photos: [],
      photosOriginal: [],
      error: true,

    };
  }

  componentDidMount(){
    const { idVenue, getPlace} = this.props;
    this.setState({spinner: true});
    let photos = [];
    let photosOriginal = [];
    InteractionManager.runAfterInteractions(() => {  

      getPlace(idVenue)
      .then((response) => {
        let place = response.value.response.venue;
        
        if (place.photos.count > 0){
          place.photos.groups.map((group, i)=> {
            group.items.map((item, j)=> {
              item.source = { uri: item.prefix + '300x300' + item.suffix };
              photos.push({ source: { uri: item.prefix + '300x300' + item.suffix }});
              photosOriginal.push({ child: photosOriginal.length,  source: { uri: item.prefix + 'original' + item.suffix }});

            });
          });
         
        }
        this.setState({spinner: false, place: place, photos: photos, photosOriginal: photosOriginal, error: false});
        
      })
      .catch((e) => {
        this.setState({error: true, spinner: false});
        
      });
    });
  }

  renderLoading = () => {

    return(
      <Spinner/>
    );
  }
  setOpenMap = (value) => {
    this.setState({ openMap: value });
  }


  render() {
    const { item } = this.props;
    const { place, spinner, error } = this.state;

    if (spinner){
      return this.renderLoading();
    }else{
      if (error){
        return (<Message error={true} reload={this.componentDidMount.bind(this)}/>)

      }else{
    
        return (
          <ScrollView 
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            style={styles.containerGray}
            >
            <OpenMap open={this.state.openMap} place={place} setOpenMap={this.setOpenMap}/>
            {place.photos.count > 0 &&
              <Photos photos={this.state.photos} photosOriginal ={this.state.photosOriginal}/>
            }
            <View style={styles.containerPlace}>
              <View style={styles.containerNamePlace}>
                <View style={[styles.rating, styles.center]}>
                  <Text style={styles.textRating}>{place.rating}</Text>
                </View>
                <Text style={styles.textNameBig}>{place.name}</Text>
              </View>
              <Text style={[styles.textSmall, styles.marginBottomSmall]}>
                {place.location.formattedAddress} 
                <Text style={[styles.textSmall, styles.textBold]} onPress={() => {this.setState({ openMap: true }) }}> ({I18n.t('openInMaps')})
                </Text>
              </Text>
              <Categories place={place}/>
              <Info place={place}/>
            </View>
            <View style={styles.separator}>
              <Text style={[styles.textNormal, styles.textBold]}>SERVICES</Text>
            </View>
            <View style={styles.containerPlace}>
              <Attributes attributes={place.attributes}/>
            </View>
          </ScrollView>
        );
      }
    }
  }
}


export default connect(state => ( {}), { getPlace })(Place);