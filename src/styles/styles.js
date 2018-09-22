import { StyleSheet, Dimensions } from 'react-native';

import colors from '../../colors';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({

  //Scenes
  sceneStyle: {
    backgroundColor: colors.background,
    flex: 1,
  },
  navigationBarStyle: {
    backgroundColor: 'white'
  },
  navigationBarStyleBlack: {
    backgroundColor: 'black',
    borderBottomWidth: 0,
    borderBottomColor: 'black'
  },
  //Search bar
  inputSearch: {
    backgroundColor: colors.inputSearch,
  },
  textButtonSearch: {
    color: colors.principal,
  },
  //common
  row: {
    flexDirection: 'row',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },

  //suggestions
  containerSuggestions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  itemSuggestion: {
    flexDirection: 'column',
    width: width / 4,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.textSecondary,
    borderWidth: 1,
    margin: 5,
    borderRadius: 5,
  },
  iconSuggestion: {
    color: colors.principal,
    //size: 20,
  },
  textSuggestion: {
    marginTop: 10,
    color: colors.textSecondary,
    fontSize: 12,
  },

  //text

  textVerySmall: {
    color: colors.textSecondary,
    fontWeight:'100',
    fontSize: 10,
  },
  textSmall: {
    color: colors.textSecondary,
    fontWeight:'100',
    fontSize: 12,
  },
  textBold: {
    fontWeight:'600',
  },
  textLink: {
    color: colors.principal,
    marginBottom: 5,
    fontSize: 12,
  },

  //place
  textNameBig: {
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: 5,
    fontSize: 16,
  },
  containerPlace: {
    padding: 20,
  },

  //padding and margin 
  marginBottomSmall: {
    marginBottom: 5,
  }

});
