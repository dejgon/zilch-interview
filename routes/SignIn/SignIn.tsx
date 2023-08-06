import React from 'react';
import { Text, View } from 'react-native';

import { yupResolver } from '@hookform/resolvers/yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';

import { signInSchema } from './signInSchema';
import useStyles from './styles';
import { ButtonHighlight, Input } from '../../components';
import { AuthLayout } from '../../layouts';
import { useAppDispatch, useAppSelector } from '../../store';
import { selectAuthState, signIn } from '../../store/slices/authSlice';
import {
  ButtonType,
  RequestStatus,
  RootStackParamList,
  Routes,
  UserFormFields,
} from '../../types';

type Props = NativeStackScreenProps<RootStackParamList, Routes.SignIn>;

export function SignIn({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const { userId, loading } = useAppSelector((store) => selectAuthState(store));
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormFields>({
    mode: 'onSubmit',
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const isButtonDisabled =
    loading === RequestStatus.Pending ?? errors?.email ?? errors?.password;

  const { forgotPassBox, forgotPassText, errorText } = useStyles;

  async function handleSignIn(data: UserFormFields) {
    dispatch(signIn(data));
  }

  function handleSignUpPress() {
    navigation.navigate(Routes.Swapi);
  }

  function isLoadingFailed() {
    return loading === RequestStatus.Failed;
  }

  return (
    <AuthLayout
      bottomNavigationButtonTitle="Go in!"
      bottomNavigationTitle="Wanna see the other part? 😏"
      onBottomNavigationButtonPress={handleSignUpPress}>
      <View style={{ flexGrow: 1 }} />
      {userId && <Text>{userId}</Text>}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            errorMessage={errors.email?.message}
            isError={!!errors.email}
            keyboardType="email-address"
            label="Email address"
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="Hint: use test@test.com to get mocked response"
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            errorMessage={errors.password?.message}
            isError={!!errors.password}
            keyboardType="default"
            label="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="Enter your password"
            secureTextEntry
            textContentType="password"
            value={value}
          />
        )}
      />
      {isLoadingFailed() && (
        <Text style={errorText}>Invalid credentials, try again!</Text>
      )}
      <View style={{ paddingTop: 16 }}>
        <ButtonHighlight
          isDisabled={isButtonDisabled}
          onPress={handleSubmit(handleSignIn)}
          text="Sign in"
          type={ButtonType.Contained}
        />
      </View>
      <View style={forgotPassBox}>
        <Text style={forgotPassText}>Forgot password?</Text>
      </View>
    </AuthLayout>
  );
}
