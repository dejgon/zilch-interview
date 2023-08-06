import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import { Provider } from 'react-redux';

import { SwapiHome } from './SwapiHome';
import { swapiResponse } from '../../mocks';
import { store } from '../../store';
import { RootStackParamList, Routes } from '../../types';
import { SwapiCharacter } from '../SwapiCharacter';

const Stack = createNativeStackNavigator<RootStackParamList>();

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

function setup() {
  return render(
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={Routes.Swapi}>
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
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

describe('SwapiHome.tsx', () => {
  it('renders properly', () => {
    const component = setup();
    expect(component).toMatchSnapshot();
  });

  it('gets the data from API', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: swapiResponse });
    const { getByText, getByTestId, getByDisplayValue } = setup();

    expect(getByText('Search for the character')).toBeDefined();

    const input = getByTestId('input-text-area');

    expect(input).toBeDefined();

    fireEvent.changeText(input, 'Leia');

    expect(getByDisplayValue('Leia')).toBeDefined();

    // Waiting for the debounce to finish and checking if result element exists and is clickable
    await waitFor(
      () => {
        const resultElement = getByTestId('search-result');
        expect(resultElement).toBeDefined();
        fireEvent.press(resultElement);
      },
      {
        timeout: 2000,
      }
    );

    // Confirming navigation changed the screen to the SwapiCharacter route
    await waitFor(() => {
      expect(getByText('Name:')).toBeDefined();
      expect(getByText('Leia Organa')).toBeDefined();
      expect(getByText('Height:')).toBeDefined();
    });
  });

  it('shows error info when request fails to load', async () => {
    mockedAxios.get.mockRejectedValueOnce('Rejected');
    const { getByText, getByTestId, getByDisplayValue } = setup();

    expect(getByText('Search for the character')).toBeDefined();

    const input = getByTestId('input-text-area');

    expect(input).toBeDefined();

    fireEvent.changeText(input, 'Unknown');

    expect(getByDisplayValue('Unknown')).toBeDefined();

    await waitFor(
      () => {
        const errorElement = getByText('Error occurred, please try again');
        expect(errorElement).toBeDefined();
      },
      {
        timeout: 2000,
      }
    );
  });
});
