import React, { Component } from 'react';
import { ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import basicStyles from '../../../styles/styles';
import styles from './styles';

export default class Photos extends Component {

  openGallery = (i) => {

    Actions.modal_gallery({i: i,  photos: this.props.photosOriginal });

  }

  render() {
    const { photos } = this.props;

    return(
      <ScrollView
        horizontal
        style={styles.containerPhotos}
        contentContainerStyle={basicStyles.center}
      >
      { 
        photos.map((photo, i) =>
          <TouchableOpacity 
            key={i}
            onPress={this.openGallery.bind(this, i)}
            >
            <Image  resizeMode='cover'  style={[ photos.length === 1 ? styles.imageComplete : styles.image]} source={photo.source}/>
          </TouchableOpacity>
        )
      }
      </ScrollView>
    )
  }
}