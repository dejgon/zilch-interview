import { StyleSheet } from 'react-native';

import { Colors } from '../../../consts';
import { Fonts, FontWeight } from '../../../types';

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    paddingBottom: 16,
  },
  inputLabel: {
    paddingLeft: 4,
    paddingBottom: 4,
    fontFamily: Fonts.OswaldRegular,
    fontStyle: 'normal',
    fontWeight: FontWeight.Normal,
    lineHeight: 21,
    fontSize: 14,
    color: Colors.Black.LIGHT_BLACK,
  },
  inputBase: {
    height: 48,
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.Black.LIGHT_BLACK,
    color: Colors.Black.LIGHT_BLACK,
    borderRadius: 10,
    fontFamily: Fonts.OswaldRegular,
    fontStyle: 'normal',
    fontWeight: FontWeight.Normal,
    lineHeight: 24,
    fontSize: 16,
    paddingLeft: 8,
  },
  disabledInput: {
    borderColor: Colors.Black.LIGHTER_BLACK,
    color: Colors.Black.LIGHTER_BLACK,
  },
  error: {
    borderColor: Colors.Red.RED_500,
  },
  labelError: {
    color: Colors.Red.RED_500,
  },
});

export default styles;
