import React from 'react';
import { Image, Linking, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ButtonHighlight } from '../../components';
import { AuthLayout } from '../../layouts';
import { ButtonType, RootStackParamList, Routes } from '../../types';

type Props = NativeStackScreenProps<RootStackParamList, Routes.Home>;

export function Home({ navigation }: Props) {
  function navigateToSignIn() {
    return navigation.navigate(Routes.SignIn);
  }

  function navigateToSignUp() {
    return navigation.navigate(Routes.Swapi);
  }

  async function redirectToMail(link: string) {
    if (await Linking.canOpenURL(link)) {
      await Linking.openURL(link);
    }
  }

  return (
    <AuthLayout
      bottomNavigationTitle="In case of any questions,"
      bottomNavigationButtonTitle="contact me through LinkedIn 😁"
      onBottomNavigationButtonPress={() =>
        redirectToMail('https://www.linkedin.com/in/damian-cop')
      }>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 32,
        }}>
        <Image
          style={{ width: 206, height: 237 }}
          source={require('./man.png')}
        />
        <ButtonHighlight
          onPress={navigateToSignIn}
          text="Sign in"
          type={ButtonType.Contained}
        />
        <ButtonHighlight
          onPress={navigateToSignUp}
          text="SWAPI"
          type={ButtonType.Outlined}
        />
      </View>
    </AuthLayout>
  );
}
