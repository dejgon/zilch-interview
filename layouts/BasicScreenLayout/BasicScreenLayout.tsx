import React from 'react';
import { View, ViewStyle } from 'react-native';

import { AppCommonHeader } from '../../components';
import { Colors } from '../../consts';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function BasicScreenLayout({ children, style }: Props) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.White.PLAIN_WHITE,
        padding: 32,
        ...style,
      }}>
      <AppCommonHeader />
      {children}
    </View>
  );
}
