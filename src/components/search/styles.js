import { StyleSheet } from 'react-native';;
import colors from '../../../colors'

export default styles = StyleSheet.create({

  container: {
    backgroundColor: 'white',
    padding: 10,
   
  },
  contentContainerStyle: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1,
  },
  labels: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    paddingVertical: 10,
    borderBottomColor: colors.grayLight,
    borderBottomWidth: 1,
  },
  filterInactive: {
    marginVertical: 5,
    marginRight: 10,
    backgroundColor: colors.grayVeryLight,
    borderRadius: 15,
    padding: 10,
  },
  textFilterInactive: {
    color: colors.text_secondary,
    fontSize: 14,
  },
  filterActive: {
    marginVertical: 5,
    marginRight: 10,
    backgroundColor: colors.principal,
    borderRadius: 15,
    padding: 10,
  },
  textFilterActive: {
    color: 'white',
    fontSize: 14,
  },
  containerFilters: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  sort: {
    flexDirection: 'row',
  },
  iconSort: {
    marginRight: 5,
  },

   
});
