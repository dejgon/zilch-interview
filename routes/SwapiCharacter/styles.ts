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
  },
  personView: {
    flexDirection: 'column',
    gap: 20,
  },
});
