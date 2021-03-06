import { StyleSheet, Dimensions } from 'react-native';

import colors from '../../colors';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  containerGray:{
    backgroundColor: colors.grayLighter
  },
  //Scenes
  sceneStyle: {
    backgroundColor: colors.background,
    flex: 1,
  },
  titleStyle: {
    color: colors.principal,
  },
  navigationBarStyle: {
    backgroundColor: 'white',
  },
  navigationBarStyleBlack: {
    backgroundColor: 'black',
    borderBottomWidth: 0,
    borderBottomColor: 'black'
  },
  tabBarStyle: {
    backgroundColor: 'white',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: 'gray',
  },
  //common
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
  minContainerList: {
    minHeight: 300,
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
    borderColor: colors.principal,
    borderWidth: 1,
    margin: 5,
    borderRadius: 5,
  },
  itemSuggestionSmall: {
    flexDirection: 'column',
    width: width / 6,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.principal,
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
  itemSuggestionActive: {
    flexDirection: 'column',
    width: width / 4,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.principal,
    margin: 5,
    borderRadius: 5,
  },
  itemSuggestionActiveSmall: {
    flexDirection: 'column',
    width: width / 6,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.principal,
    margin: 5,
    borderRadius: 5,
  },
  iconSuggestionActive: {
    color: 'white',
  },
  textSuggestionActive: {
    marginTop: 10,
    color: 'white',
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
  textNormal: {
    color: colors.textSecondary,
    fontWeight:'100',
    fontSize: 14,
  },
  textBold: {
    fontWeight:'600',
  },
  textLink: {
    color: colors.principal,
  },
  textCenter: {
    textAlign: 'center' ,
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
    backgroundColor: 'white',
  },
  separator: {
    paddingVertical: 10,
    marginHorizontal: 20,
  },

  containerNamePlace: {
    flexDirection: 'row',
    justifyContent:'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  rating: {
    padding: 10,
    borderRadius: 20,
    width: 40,
    height: 40,
    backgroundColor: colors.principal,
    marginRight: 5,
  },
  textRating: {
    color: 'white',
    fontSize: 12,
  },
  buttonPrincipal: {
    justifyContent: 'center',
    paddingVertical: 10,
  },
  textButtonPrincipal: {
    color: colors.principal,
    fontSize: 18,
  },
  splash: {
    height: height,
    width: width,
  },
  icon: {
    height: 100,
    width: 100,
  },
  //padding and margin 
  marginBottomSmall: {
    marginBottom: 5,
  },
  //menu
  textMenu: {
    color: colors.principal,
    fontSize: 18,
    lineHeight: 18, 
    letterSpacing: 1,
  },

  textItemMenu: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 16, 
    letterSpacing: 1,
  },
  itemMenu: {
    backgroundColor: 'white',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: colors.grayLight,
    borderBottomWidth: 1,
    flex: 0,
  },
  menu: {
    padding: 40,
    flex: 0,
  },
textMoreLess: {
  color: colors.text,
  fontSize: 12,
  lineHeight: 13,
  fontWeight: 'normal',
  textAlign: 'right',
  marginTop: 5,
  marginBottom: 15,
},

});
