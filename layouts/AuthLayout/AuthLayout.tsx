import React, { PropsWithChildren, useRef } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

import useStyles from './styles';
import { AppCommonHeader, BottomAuthNav } from '../../components';

interface Props {
  children: React.ReactFragment | React.ReactNode;
  bottomNavigationTitle?: string;
  bottomNavigationButtonTitle?: string;
  onBottomNavigationButtonPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function AuthLayout(props: PropsWithChildren<Props>) {
  const {
    children,
    bottomNavigationTitle,
    bottomNavigationButtonTitle,
    onBottomNavigationButtonPress,
    style,
  } = props;
  const scrollViewRef = useRef<null | ScrollView>(null);

  const { container, footerText } = useStyles;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          showsVerticalScrollIndicator
          keyboardShouldPersistTaps="handled"
          bounces={false}
          style={container}
          contentContainerStyle={{
            flexGrow: 1,
            width: '100%',
            alignItems: 'center',
            flexDirection: 'column',
          }}
          ref={(ref) => {
            scrollViewRef.current = ref;
          }}
          contentInsetAdjustmentBehavior="always"
          overScrollMode="always">
          <AppCommonHeader />
          <View
            style={[
              {
                flex: 1,
                width: '100%',
                height: '100%',
                alignItems: 'center',
              },
              style,
            ]}>
            {children}
          </View>
          {onBottomNavigationButtonPress && (
            <BottomAuthNav
              text={bottomNavigationTitle ?? ''}
              buttonText={bottomNavigationButtonTitle ?? ''}
              onPress={onBottomNavigationButtonPress}
            />
          )}
          <Text style={footerText}>
            © Happily provided by Damian Cop aka dejgon 💥
          </Text>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
