import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import useStyles from './styles';

interface Props {
  text: string;
  buttonText: string;
  onPress: () => void;
}

export function BottomAuthNav(props: Props) {
  const { text, buttonText, onPress } = props;

  const { mainText, subText } = useStyles;

  return (
    <View style={{ paddingTop: 16 }}>
      <Text style={mainText}>{text}</Text>
      <TouchableOpacity onPress={onPress} style={{ marginBottom: 32 }}>
        <Text style={subText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}
