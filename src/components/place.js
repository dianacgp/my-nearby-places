import React, { Component } from 'react';
import { StyleSheet, View, TextInput, FlatList, InteractionManager, ScrollView, Image, TouchableOpacity } from 'react-native';
import { getPlace } from '../reducers/places/actions';
import { connect } from 'react-redux';
import styles from '../styles/styles';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Item, Input, Icon, Button, Text, Body, ListItem, Left, Right, Content, Card, CardItem, Thumbnail, Separator, Badge} from 'native-base';
import { Popup } from 'react-native-map-link'
import Spinner from './common/spinner';


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

        Actions.refresh({backTitle: place.name})
        
        if (place.photos.count > 0){
          place.photos.groups.map((group, i)=> {
            group.items.map((item, j)=> {
              item.source = { uri: item.prefix + '300x300' + item.suffix };
              photos.push({ source: { uri: item.prefix + '300x300' + item.suffix }});
              photosOriginal.push({ child: photosOriginal.length,  source: { uri: item.prefix + 'original' + item.suffix }});

            });
          });
          this.setState({spinner: false, place: place, photos: photos, photosOriginal: photosOriginal});
        }
      })
      .catch((e) => {
        console.log('e', e)
      });
    });
  }

  renderImage = () => {
    return(
      <TouchableOpacity>
        <Image  {...this.props}/>

      </TouchableOpacity>
    );
  }

  openGallery = (i) => {

    Actions.modal_gallery({i: i,  photos: this.state.photosOriginal });

  }
  renderLoading = () => {

    return(
      <Spinner/>
    );
  }

  render() {
    const { item } = this.props;
    const { place, spinner, photos } = this.state;

    console.log('spinner', spinner)
    if (spinner){
      return this.renderLoading();
    }
    return (
      <Container >
        <Content>
         <Popup
            isVisible={this.state.openMap}
            onCancelPressed={() => this.setState({ openMap: false })}
            onAppPressed={() => this.setState({ openMap: false })}
            onBackButtonPressed={() => this.setState({ openMap: false })}
            options={{
              latitude: place.location.lat,
              longitude: place.location.lng,
              title: place.name,
              dialogTitle: 'Open in Maps',
              dialogMessage: place.name,
              cancelText: 'Cancel'
            }}
          />

          {place.photos.count > 0 &&
            <ScrollView
              horizontal
              style={styles.containerGallery}
              contentContainerStyle={styles.center}
            >
            { 
              photos.map((photo, i) =>
                <TouchableOpacity 
                  key={i}
                  onPress={this.openGallery.bind(this, i)}
                  >
                  <Image  resizeMode='cover'  style={[ photos.length === 1 ? styles.imageGalleryComplete : styles.imageGallery]} source={photo.source}/>
                </TouchableOpacity>
              )
            }
    
            </ScrollView>

          }
          <ListItem>
            <Body>
              <Text>{place.name}</Text>
              <Text>{place.description}</Text>
              <Text  onPress={() => { 
                this.setState({ openMap: true }) }} note>{place.location.formattedAddress}
              </Text>
            </Body>
          </ListItem>
          <ListItem>
            <Body style={styles.row}>
              { place.categories.map( (category, i) =>
              <View  key={i} style={styles.labels}>
                <Badge primary  style={styles.badge}>
                  <Text>{category.shortName}</Text>
                </Badge>
              </View>
              )} 
            </Body>
            </ListItem>
            {place.attributes.groups.map((group, i) => 
              <ListItem  key={i} icon>
                <Body>
                  <Text>{group.name}</Text>
                </Body>
                <Right>
                  {group.items.map((item, j) => 
                    <Text key={j}>{item.displayValue}</Text>
                  )}
                </Right>
              </ListItem>
            )}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    places_refreshing: state.places.places_refreshing,
    places: state.places.places,
    places_error: state.places.places_error,
  }
}

export default connect(state => ( mapStateToProps), { getPlace })(Place);