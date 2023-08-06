import React, { useEffect } from 'react';
import { Platform } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import { useFeatureFlag } from 'configcat-react';
import * as SecureStore from 'expo-secure-store';

import { Dashboard } from './Authorized';
import { Home } from './Home';
import { Maintenance } from './Maintenance';
import { SignIn } from './SignIn';
import { SwapiCharacter } from './SwapiCharacter';
import { SwapiHome } from './SwapiHome';
import { useAppDispatch, useAppSelector } from '../store';
import { selectUserId, setUser } from '../store/slices/authSlice';
import {
  FeatureFlags,
  RootStackParamList,
  Routes,
  SecureStoreKeys,
} from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Routing() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((store) => selectUserId(store));

  const { value: api } = useFeatureFlag(FeatureFlags.ApiAddress, '');
  const { value: apiAndroid } = useFeatureFlag(
    FeatureFlags.ApiAddressAndroid,
    ''
  );
  const { value: maintenanceValue } = useFeatureFlag(
    FeatureFlags.Maintenance,
    false
  );

  axios.defaults.baseURL = Platform.OS === 'android' ? apiAndroid : api;
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  async function checkIfUserLoggedIn() {
    const savedUser = await SecureStore.getItemAsync(SecureStoreKeys.User);
    if (savedUser) {
      axios.defaults.headers.common['Authorization'] =
        JSON.parse(savedUser).token;
      dispatch(setUser(JSON.parse(savedUser)));
    }
  }

  useEffect(() => {
    checkIfUserLoggedIn();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Routes.Home}>
        {maintenanceValue ? (
          <Stack.Screen name={Routes.Maintenance} component={Maintenance} />
        ) : userId ? (
          <Stack.Screen name={Routes.Dashboard} component={Dashboard} />
        ) : (
          <>
            <Stack.Screen
              name={Routes.Home}
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={Routes.SignIn}
              component={SignIn}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={Routes.Swapi}
              component={SwapiHome}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name={Routes.SwapiCharacter}
              component={SwapiCharacter}
              options={{ headerShown: true }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
