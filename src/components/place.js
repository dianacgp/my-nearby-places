import React, { Component } from 'react';
import { StyleSheet, View, TextInput, FlatList, InteractionManager } from 'react-native';
import { getPlace } from '../reducers/places/actions';
import { connect } from 'react-redux';
import styles from '../styles/styles';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Item, Input, Icon, Button, Text, Body, ListItem, Left, Right, Content, Card, CardItem, Thumbnail, Separator, Badge} from 'native-base';
import { Popup } from 'react-native-map-link'

class Place extends Component {

  state = {
    place: null,
    spinner: true,
    openMap: false,

  }

  componentDidMount(){
    const { item, getPlace} = this.props;
    this.setState({spinner: true});
    InteractionManager.runAfterInteractions(() => {   
      getPlace(item.venue.id)
      .then((response) => {
        let place = response.value.response.venue;
        this.setState({spinner: false, place: place});
        Actions.refresh({title: place.name})
        console.log('response', response);
      })
      .catch((e) => {
        console.log('e', e)
      });
    });
  }
  render() {
    const { item } = this.props;
    const { place, spinner } = this.state;

    console.log('place', place)
    if (spinner){
      return null;
    }
    return (
      <Container >

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