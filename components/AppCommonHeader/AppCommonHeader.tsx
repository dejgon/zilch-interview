import React from 'react';
import { Text } from 'react-native';

import styles from './styles';

export const AppCommonHeader = () => {
  const { headerTitle, headerSubtitle } = styles;
  return (
    <>
      <Text style={headerTitle}>Zilch</Text>
      <Text style={headerSubtitle}>Assignment App</Text>
    </>
  );
};
