import React from 'react';

import { render } from '@testing-library/react-native';

import { Input } from './Input';

describe('Input.tsx', () => {
  it('should render basic snapshot', () => {
    const component = render(
      <Input
        value="Basic component"
        label="Email address"
        keyboardType="email-address"
        placeholder="Enter your email address"
        autoCapitalize="none"
        disabled={false}
        autoCorrect={false}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should render error', () => {
    const { getByText } = render(
      <Input
        value="Error component"
        label="Email address"
        keyboardType="email-address"
        placeholder="Enter your email address"
        autoCapitalize="none"
        disabled={false}
        autoCorrect={false}
        isError
        errorMessage="Error message"
      />
    );

    expect(getByText('Error message')).toBeDefined();
  });

  it('should render disabled', () => {
    const { getByTestId } = render(
      <Input
        value="Error component"
        label="Email address"
        keyboardType="email-address"
        placeholder="Enter your email address"
        autoCapitalize="none"
        disabled
        autoCorrect={false}
      />
    );

    expect(getByTestId('input-text-area').props.editable).toBeFalsy();
  });
});
