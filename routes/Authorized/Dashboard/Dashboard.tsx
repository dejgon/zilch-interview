import React from 'react';
import { Text } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';

import { ButtonHighlight } from '../../../components';
import { BasicScreenLayout } from '../../../layouts';
import { useAppDispatch } from '../../../store';
import { signOut } from '../../../store/slices/authSlice';
import {
  ButtonType,
  RootStackParamList,
  Routes,
  SecureStoreKeys,
} from '../../../types';

type Props = NativeStackScreenProps<RootStackParamList, Routes.Dashboard>;

export function Dashboard(props: Props) {
  const dispatch = useAppDispatch();

  async function handleSignOut() {
    dispatch(signOut());
    await SecureStore.deleteItemAsync(SecureStoreKeys.User);
  }

  return (
    <BasicScreenLayout
      style={{
        alignItems: 'center',
        gap: 10,
        paddingTop: 20,
      }}>
      <Text>Welcome on dashboard!</Text>
      <ButtonHighlight
        text="Sign out"
        type={ButtonType.Contained}
        onPress={handleSignOut}
      />
    </BasicScreenLayout>
  );
}
