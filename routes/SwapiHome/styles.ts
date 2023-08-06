import { StyleSheet } from 'react-native';

import { Colors } from '../../consts';

export const styles = StyleSheet.create({
  errorText: {
    color: Colors.Red.RED_500,
    fontFamily: 'Oswald-Regular',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 27,
  },
  mainView: {
    width: '100%',
    marginTop: 30,
    gap: 15,
    flex: 1,
  },
  informationText: {
    fontFamily: 'Oswald-Regular',
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 27,
    marginBottom: 10,
  },
  searchText: {
    fontFamily: 'Oswald-Light',
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 27,
  },
  personNameText: {
    fontFamily: 'Oswald-Regular',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 27,
    marginVertical: 10,
  },
  peopleFoundText: {
    fontFamily: 'Oswald-Regular',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  seeMoreText: {
    fontFamily: 'Oswald-Regular',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  personElement: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
