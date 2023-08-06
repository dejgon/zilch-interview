import { StyleSheet } from 'react-native';

import { Colors } from '../../consts';

const styles = StyleSheet.create({
  forgotPassBox: { paddingTop: 16, alignSelf: 'flex-end' },
  forgotPassText: {
    color: Colors.Green.GREEN_400,
    fontFamily: 'Oswald-Regular',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 27,
  },
  errorText: {
    color: Colors.Red.RED_500,
    fontFamily: 'Oswald-Regular',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 27,
  },
});

export default styles;
