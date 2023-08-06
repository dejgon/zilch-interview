import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

import useStyles from './styles';

interface Props extends TextInputProps {
  disabled?: boolean;
  errorMessage?: string;
  isError?: boolean;
  label?: string;
}

export function Input(props: Props) {
  const { label, isError, errorMessage, disabled, ...rest } = props;

  const {
    disabledInput,
    error,
    inputBase,
    inputContainer,
    inputLabel,
    labelError,
  } = useStyles;

  return (
    <View testID="input-view-container" style={[inputContainer, rest.style]}>
      {label && (
        <Text testID="input-label" style={inputLabel}>
          {label}
        </Text>
      )}
      <TextInput
        {...rest}
        testID="input-text-area"
        style={{
          ...inputBase,
          ...(disabled && disabledInput),
          ...(isError && error),
        }}
        editable={!disabled}
      />
      {isError && (
        <Text style={{ ...inputLabel, ...(isError && labelError) }}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
}
