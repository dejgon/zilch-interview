import React from 'react';
import { Linking, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Attribute } from './components';
import { styles } from './styles';
import { ButtonHighlight } from '../../components';
import { AuthLayout } from '../../layouts';
import { ButtonType, RootStackParamList, Routes } from '../../types';

type Props = NativeStackScreenProps<RootStackParamList, Routes.SwapiCharacter>;

export function SwapiCharacter(props: Props) {
  const {
    route: {
      params: { person },
    },
  } = props;

  const handleLink = async (link: string) => {
    const supported = await Linking.canOpenURL(link);

    if (supported) {
      await Linking.openURL(link);
    }
  };

  return (
    <AuthLayout>
      <View style={styles.mainView}>
        {person && (
          <View style={styles.personView}>
            <Attribute name="Name" value={person.name} />
            <Attribute name="Birth year" value={person.birth_year} />
            <Attribute name="Height" value={person.height} />
            <Attribute name="Hair color" value={person.hair_color} />
            <Attribute name="Skin color" value={person.skin_color} />
            <Attribute name="Eye color" value={person.eye_color} />
            <ButtonHighlight
              text="Check SWAPI documentation"
              type={ButtonType.Contained}
              onPress={() => handleLink(person.url)}
            />
          </View>
        )}
      </View>
    </AuthLayout>
  );
}
