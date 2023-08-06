import { StyleSheet } from 'react-native';

import { Colors } from '../../../consts';
import { Fonts } from '../../../types';

const styles = StyleSheet.create({
  button: {
    width: 326,
    height: 48,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderRadius: 10,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderColor: Colors.Blue.BLUE_500,
    borderWidth: 2,
    borderStyle: 'solid',
    color: Colors.Blue.BLUE_500,
  },
  contained: {
    color: Colors.Fonts.WHITE,
    backgroundColor: Colors.Blue.BLUE_500,
  },
  buttonText: {
    fontFamily: Fonts.OswaldRegular,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 36,
    fontSize: 24,
  },
  disabled: {
    backgroundColor: Colors.Blue.BLUE_200,
  },
});

export default styles;
