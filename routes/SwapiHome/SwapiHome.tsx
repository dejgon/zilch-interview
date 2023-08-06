import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';

import { styles } from './styles';
import { Input } from '../../components';
import { BasicScreenLayout } from '../../layouts';
import { Person, RootStackParamList, Routes } from '../../types';

type Props = NativeStackScreenProps<RootStackParamList, Routes.Swapi>;

export function SwapiHome(props: Props) {
  const { navigation } = props;
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResult, setSearchResult] = useState<Person[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  let debounced: NodeJS.Timeout | number;

  async function searchForPeople(searchValue: string) {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://swapi.dev/api/people?search=${searchValue}`
      );
      setSearchResult(response.data.results as Person[]);
    } catch (e) {
      console.error(e);
      setError('Error occurred, please try again');
    }
    setIsLoading(false);
  }

  const onSearchTextChange = useCallback((text: string) => {
    setSearchValue(text);
    debounce(() => searchForPeople(text));
  }, []);

  function debounce(func: Function) {
    clearTimeout(debounced);
    debounced = setTimeout(func, 1000);
  }

  return (
    <BasicScreenLayout>
      <View style={styles.mainView}>
        <Text style={styles.informationText}>
          Find your favourite Star Wars character
        </Text>
        <Input
          label="Search for the character"
          value={searchValue}
          onChangeText={onSearchTextChange}
        />
        {isLoading ? (
          <ActivityIndicator />
        ) : searchResult && searchResult.length > 0 ? (
          <>
            <Text style={styles.peopleFoundText}>
              People found: {searchResult.length}
            </Text>
            <FlatList
              showsVerticalScrollIndicator
              persistentScrollbar={true}
              data={searchResult}
              renderItem={({ item }) => (
                <TouchableOpacity
                  testID="search-result"
                  style={styles.personElement}
                  key={item.name}
                  onPress={() =>
                    navigation.navigate(Routes.SwapiCharacter, {
                      person: item,
                    })
                  }>
                  <Text style={styles.personNameText}>⚪️ {item.name}</Text>
                  <Text>➡️</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.name}
            />
          </>
        ) : (
          <Text style={styles.searchText}>
            No results, try something else 🔎
          </Text>
        )}
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </BasicScreenLayout>
  );
}
