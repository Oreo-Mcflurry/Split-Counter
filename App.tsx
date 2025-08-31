/**
 * SplitCounter App with Clean Architecture + Reducer Pattern
 */

import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import AppNavigator from './src/presentation/navigation/AppNavigator';
import { initializeSound } from './src/utils/sound';

function App(): React.JSX.Element {
  useEffect(() => {
    // Initialize sound system
    initializeSound();
    
    // Hide splash screen when app is ready
    const timer = setTimeout(() => {
      SplashScreen.hide();
    }, 1500); // 1.5초 후 스플래시 숨김

    return () => clearTimeout(timer);
  }, []);

  return <AppNavigator />;
}

export default App;
