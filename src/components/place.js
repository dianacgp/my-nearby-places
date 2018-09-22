import React, { Component } from 'react';
import { StyleSheet, View, FlatList, InteractionManager, ScrollView, Text } from 'react-native';
import { getPlace } from '../reducers/places/actions';
import { connect } from 'react-redux';
import styles from '../styles/styles';
import { Actions } from 'react-native-router-flux';
import { Popup } from 'react-native-map-link';
import call from 'react-native-phone-call';
import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from './common/spinner';
import Categories from './common/categories';
import Attributes from './common/attributes';
import Info from './common/info';
import Photos from './common/photos/photos';
import OpenMap from './common/openMap';


class Place extends Component {

  constructor(props) {
    super(props);
    this.state = {
      place: null,
      spinner: true,
      openMap: false,
      photos: [],
      photosOriginal: [],

    };
  }

  componentDidMount(){
    const { item, getPlace} = this.props;
    this.setState({spinner: true});
    let photos = [];
    let photosOriginal = [];
    InteractionManager.runAfterInteractions(() => {  

      getPlace(item.venue.id)
      .then((response) => {
        let place = response.value.response.venue;

        //Actions.refresh({backTitle: place.name})
        
        if (place.photos.count > 0){
          place.photos.groups.map((group, i)=> {
            group.items.map((item, j)=> {
              item.source = { uri: item.prefix + '300x300' + item.suffix };
              photos.push({ source: { uri: item.prefix + '300x300' + item.suffix }});
              photosOriginal.push({ child: photosOriginal.length,  source: { uri: item.prefix + 'original' + item.suffix }});

            });
          });
          console.log('place', place);
         
        }
        this.setState({spinner: false, place: place, photos: photos, photosOriginal: photosOriginal});
        
      })
      .catch((e) => {
        console.log('e', e)
      });
    });
  }

  openCallNumber = () => {
    const { place } = this.state;

    const args = {
      number: place.contact.formattedPhone, // String value with the number to call
      prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
    }
    call(args).catch('error phone', console.error)
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
    const { place, spinner } = this.state;

    if (spinner){
      return this.renderLoading();
    }
    return (
      <ScrollView style={styles.containerGray}>
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
          <Text style={[styles.textSmall]}>{place.description}</Text>
          <Text style={[styles.textSmall, styles.marginBottomSmall]}>
            {place.location.formattedAddress} 
            <Text style={[styles.textSmall, styles.textBold]} onPress={() => {this.setState({ openMap: true }) }}> (Open in Maps)
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


export default connect(state => ( {}), { getPlace })(Place);