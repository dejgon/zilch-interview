import { Person } from './person';

export type RootStackParamList = {
  Home: undefined;
  SignIn: undefined;
  Swapi: undefined;
  SwapiCharacter: {
    person: Person;
  };
  Dashboard: undefined;
  Maintenance: undefined;
};
