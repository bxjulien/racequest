import { fireEvent, render } from '@testing-library/react-native';

import ProgressBar from './progress-bar';
import React from 'react';

describe('ProgressBar', () => {
  test('renders the progress bar correctly', () => {
    const { getByTestId } = render(<ProgressBar progress={50} />);
    const progressBar = getByTestId('progress-bar');
    expect(progressBar).toBeTruthy();
  });

  test('applies the color and height properties correctly', () => {
    const { getByTestId } = render(
      <ProgressBar progress={50} color='#ff5722' height={15} />
    );
    const progressBar = getByTestId('progress-bar');
    expect(progressBar.props.style.backgroundColor).toBe('#ff5722');
    expect(progressBar.props.style.height).toBe('100%');
  });

  test('updates the progress correctly', async () => {
    const { getByTestId, rerender } = render(<ProgressBar progress={25} />);
    let progressBar = getByTestId('progress-bar');
    expect(progressBar.props.style.width).toBe('25%');

    rerender(<ProgressBar progress={75} />);
    progressBar = getByTestId('progress-bar');

    await new Promise((resolve) => setTimeout(resolve, 500));
    expect(progressBar.props.style.width).toBe('75%');
  });
});
