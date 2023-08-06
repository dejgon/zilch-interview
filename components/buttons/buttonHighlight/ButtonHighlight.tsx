import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import useStyles from './styles';
import { Colors } from '../../../consts';
import { ButtonType } from '../../../types';

interface Props {
  text: string;
  type: ButtonType;
  onPress: () => void;
  isDisabled?: boolean;
}

export function ButtonHighlight(props: Props) {
  const { text, type, onPress, isDisabled } = props;

  const { button, buttonText, disabled, contained, outlined } = useStyles;

  const getStyleBasedOnType = () => {
    return type === ButtonType.Outlined ? outlined : contained;
  };

  const getTextColorBasedOnType = () => {
    return type === ButtonType.Outlined
      ? Colors.Green.GREEN_500
      : Colors.Fonts.WHITE;
  };

  return (
    <TouchableOpacity
      testID="button-highlight"
      onPress={onPress}
      style={{
        ...button,
        ...getStyleBasedOnType(),
        ...(isDisabled && disabled),
      }}
      disabled={isDisabled}>
      <Text style={{ ...buttonText, color: getTextColorBasedOnType() }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
