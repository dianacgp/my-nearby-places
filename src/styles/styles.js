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
  //Search bar
  inputSearch: {
    backgroundColor: colors.inputSearch,
  },
  textButtonSearch: {
    color: colors.principal,
  },
 
  row: {
    flexDirection: 'row',
  },

  //place
  imagePlace: {
    borderColor: colors.grayLighter,
    borderWidth: 1,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  labels: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  badge: {
    marginVertical: 5,
    marginRight: 10,
    backgroundColor: colors.badge,
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  textBadge: {
    color: 'white',
    fontSize: 12,
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

  name: {
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: 5,
    fontSize: 14,

  },
  bodyItem: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row', 
  },
  containerItem: {
    padding: 10,
    flexDirection: 'column', 
    borderBottomColor: colors.grayLight,
    borderBottomWidth: 1,
  },
  body: {
    flex: 1,
    flexDirection: 'column',
  },
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
  withoutImage: {
    borderColor: colors.grayLighter,
    borderWidth: 1,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  link: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.link,
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 15,
  }

});
