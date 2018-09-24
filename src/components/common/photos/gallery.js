import React, { Component } from 'react';
import { View, InteractionManager, ActivityIndicator } from 'react-native';
import Gallery from 'react-native-image-gallery';
import styles from './styles';
import Spinner from '../spinner';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

export default class ModalGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: true,
    };
  }

  componentDidMount(){
    this.setState({spinner: true});
    InteractionManager.runAfterInteractions(() => {  
      this.setState({spinner: false});
    });
   
  }
  renderLoading = () => {

    return(
      <Spinner  style={styles.gallery}/>
    );
  }

  render() {
    const {i, photos} = this.props;

    if (this.state.spinner){
      return this.renderLoading();
    }
    return (

      <Gallery
        initialPage={i}
        style={styles.gallery}
        images={photos} 
        imageComponent={(data, dimen)=> {

          return (
            <View style={[styles.centerFlex]}>
              <Image
                source={{uri: data.source.uri}}
                indicator={ActivityIndicator} 
                style={{
                  width: 320, 
                  height: 240, 
                }}
              />
            </View>
          );
        }}
      />

    );
  }
}