import React from 'react';
import { Text, View } from 'react-native';

interface Props {
  name: string;
  value: string;
}

export function Attribute(props: Props) {
  const { name, value } = props;
  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      <Text style={{ fontWeight: 'bold' }}>{name}: </Text>
      <Text>{value}</Text>
    </View>
  );
}
