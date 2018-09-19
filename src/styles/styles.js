import { StyleSheet } from 'react-native';
import colors from '../../colors';

export default StyleSheet.create({
  buttonPrincipal: {
    backgroundColor: colors.principal,
  },
  containerMenu: {
    flex: 1,
    padding: 20,
  },
  container: {
    backgroundColor: 'white',
    padding: 20,
  },
  itemTable: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  containerTable: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
  },
  value: {
    paddingHorizontal: 5,
    backgroundColor: 'gray',
    color: 'white'
  },
  position: {
    paddingHorizontal: 5,
  },
  row: {
    flexDirection: 'row',
  }
});
