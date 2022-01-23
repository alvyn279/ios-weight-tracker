import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import HomeScreen from './HomeScreen';

jest.mock('@react-navigation/elements');
jest.mock('@react-navigation/bottom-tabs');

describe('HomeScreen', () => {
  let mockedNavigationScreenProps: any;

  beforeEach(() => {
    mockedNavigationScreenProps = {
      navigation: jest.fn(),
      route: jest.fn(),
    };
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('renders correctly', () => {
    renderer.create(<HomeScreen {...mockedNavigationScreenProps} />);
  });
});
