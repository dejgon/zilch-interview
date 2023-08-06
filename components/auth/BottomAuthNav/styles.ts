import { StyleSheet } from 'react-native';

import { Colors } from '../../../consts';
import { Fonts } from '../../../types';

const styles = StyleSheet.create({
  mainText: {
    alignItems: 'center',
    display: 'flex',
    fontFamily: Fonts.OswaldRegular,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24,
    textAlign: 'center',
  },
  subText: {
    alignItems: 'center',
    color: Colors.Green.GREEN_500,
    display: 'flex',
    fontFamily: Fonts.OswaldRegular,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 27,
    textAlign: 'center',
  },
});

export default styles;
