import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import colors from '../../../colors';
import basicStyles from '../../styles/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  containerItem: {
    //flexDirection: 'row',
    borderBottomColor: colors.grayLight,
    borderBottomWidth: 1,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,

  },
  rowIconText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerBlock: {
    backgroundColor: colors.grayLight,
    marginLeft: 20,
    padding: 5,
    marginBottom: 5,
  },
  iconLeft: {
    marginRight: 5,
  },
  body: {
    paddingRight: 10,
  },
  textOpen: {
    color: colors.open,
  },
  textClosed: {
    color: colors.open,
  },

});
class Item extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,

    };
  }
  onPress = () => {
    this.setState({open: !this.state.open})
  }
  render() {
    const { icon, body, showMore, show, link, style} = this.props;
    const { open } = this.state;
    return (

      <View style={styles.containerItem}>
        <View style={styles.container}>
          <View style={styles.rowIconText}>
          {icon &&
            <Icon name={icon} size={20} color={colors.grayLighter} style={styles.iconLeft}/>
            }
            {body &&
              <Text {...this.props} style={[basicStyles.textNormal, styles.body, style]}>{body}</Text>
            }
          </View>
          { showMore &&
          <TouchableOpacity onPress={this.onPress}>
              <Icon name={!this.state.open ? "md-add" : "md-remove" } size={20} color={colors.grayLighter} />
          </TouchableOpacity>
          }
        </View>
        {showMore && open &&
          show()
       }
      </View>
    );
  }
}
export default class Hours extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,

    };
  }
  openUrl = (url) => {
    console.log('en open url', url)
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        //Linking.openURL(url);
        Actions.modal_webview({url: url});
      } else {
        console.log('Don\'t know how to open URI: ' + url);
      }
    });
  }
  render() {
    const { place} = this.props;
    return (


      <View>
        {place.description &&
          <Item icon="ios-information-circle" body={place.description}  showMore={false}/>
        }
        {place.hours &&
        <View>
          <Item icon="md-clock" body={place.hours.status}  showMore={place.hours.timeframes ? true : false}
            show={()=> {
              return(
                <View>
                  {place.hours.timeframes && place.hours.timeframes.map((time, i) => 
                  <View key={i} style={[styles.container, styles.containerBlock]}>
                    <Text style={basicStyles.textNormal}>{time.days}</Text>
                    {time.open && time.open.map((open, j) =>
                      <Text key={j} style={basicStyles.textNormal}>{open.renderedTime}</Text>
                    )}
                  </View>
                  )}
                </View>
              );
            }}
            style={place.hours.isOpen ? styles.textOpen : styles.textClosed}
          />
        </View>
      }
      {place.url &&
        <Item icon="ios-globe" body={place.url}  showMore={false} onPress={this.openUrl.bind(this, place.url)} style={basicStyles.textLink}/>
      }
      {
        place.contact.formattedPhone && 
        <Item icon="ios-call" body={place.contact.formattedPhone}  showMore={false}/>
      }
      {
        place.contact.twitter && 
        <Item icon="logo-twitter" body={"@" + place.contact.twitter}  showMore={false} onPress={this.openUrl.bind(this, "https://twitter.com/" + place.contact.twitter)} style={basicStyles.textLink}/>
      }
      {
        place.contact.facebook && 
        <Item icon="logo-facebook" body={"@" + place.contact.facebook}  showMore={false} onPress={this.openUrl.bind(this, "https://www.facebook.com/" + place.contact.facebook)} style={basicStyles.textLink}/>
      }
    </View>
    );
  }
}
