import { StyleSheet, Dimensions } from 'react-native';

import colors from '../../../../colors';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({

  gallery: {
    backgroundColor: 'black',
    flex: 1,
  },
  containerPhotos: {
    backgroundColor: 'black',
    height: 150,
    width: width,
    flexDirection: 'row',
  },
  imageComplete: {
    width: width,
    height: width / 2,
  },
  image: {
    width: width / 2,
    height: width / 2,
    borderColor: 'white',
    borderWidth: 1,
  },
  centerFlex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
