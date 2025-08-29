import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export const triggerHaptic = (type: 'light' | 'medium' | 'heavy' = 'light') => {
  try {
    switch (type) {
      case 'light':
        ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
        break;
      case 'medium':
        ReactNativeHapticFeedback.trigger('impactMedium', hapticOptions);
        break;
      case 'heavy':
        ReactNativeHapticFeedback.trigger('impactHeavy', hapticOptions);
        break;
      default:
        ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
    }
  } catch (error) {
    console.log('Haptic feedback error:', error);
  }
};

export const triggerSelectionHaptic = () => {
  try {
    ReactNativeHapticFeedback.trigger('selection', hapticOptions);
  } catch (error) {
    console.log('Haptic feedback error:', error);
  }
};

export const triggerNotificationHaptic = (type: 'success' | 'warning' | 'error') => {
  try {
    switch (type) {
      case 'success':
        ReactNativeHapticFeedback.trigger('notificationSuccess', hapticOptions);
        break;
      case 'warning':
        ReactNativeHapticFeedback.trigger('notificationWarning', hapticOptions);
        break;
      case 'error':
        ReactNativeHapticFeedback.trigger('notificationError', hapticOptions);
        break;
    }
  } catch (error) {
    console.log('Haptic feedback error:', error);
  }
};