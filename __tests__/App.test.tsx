/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

// 모듈 모킹
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-native-haptic-feedback', () => ({
  HapticFeedbackTypes: {},
  trigger: jest.fn(),
}));

jest.mock('react-native-sound', () => jest.fn());

test('renders correctly', () => {
  const tree = ReactTestRenderer.create(<App />);
  expect(tree).toBeTruthy();
});
