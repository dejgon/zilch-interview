import React from 'react';

import { act, fireEvent, render } from '@testing-library/react-native';

import { ButtonHighlight } from './ButtonHighlight';
import { ButtonType } from '../../../types';

describe('ButtonHighlight.tsx', () => {
  let onPress: jest.Mock;

  beforeEach(() => {
    onPress = jest.fn();
  });

  it('renders contained', () => {
    const component = render(
      <ButtonHighlight
        type={ButtonType.Contained}
        text="Contained button"
        onPress={onPress}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('renders outlined', () => {
    const component = render(
      <ButtonHighlight
        type={ButtonType.Outlined}
        text="Outlined button"
        onPress={onPress}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('triggers onPress properly', () => {
    const { getByTestId } = render(
      <ButtonHighlight
        type={ButtonType.Contained}
        text="Contained button"
        onPress={onPress}
      />
    );

    act(() => {
      fireEvent.press(getByTestId('button-highlight'));
    });

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders disabled', () => {
    const { getByTestId } = render(
      <ButtonHighlight
        isDisabled
        type={ButtonType.Contained}
        text="Disabled button"
        onPress={onPress}
      />
    );

    const button = getByTestId('button-highlight');

    act(() => {
      fireEvent.press(button);
    });

    expect(button.props.disabled).toBeFalsy();
    expect(onPress).not.toHaveBeenCalled();
  });
});
