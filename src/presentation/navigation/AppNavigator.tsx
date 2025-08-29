import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SectionEditScreen from '../screens/SectionEditScreen';
import { Section } from '../../core/types';

type Screen = 'home' | 'settings' | 'sectionEdit';

const AppNavigator: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);

  const handleSectionLongPress = (section: Section) => {
    setSelectedSection(section);
    setCurrentScreen('sectionEdit');
  };

  const handleSettingsPress = () => {
    setCurrentScreen('settings');
  };

  const handleClose = () => {
    setSelectedSection(null);
    setCurrentScreen('home');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen
            onSectionLongPress={handleSectionLongPress}
            onSettingsPress={handleSettingsPress}
          />
        );

      case 'settings':
        return <SettingsScreen onClose={handleClose} />;

      case 'sectionEdit':
        return selectedSection ? (
          <SectionEditScreen
            section={selectedSection}
            onClose={handleClose}
          />
        ) : (
          <HomeScreen
            onSectionLongPress={handleSectionLongPress}
            onSettingsPress={handleSettingsPress}
          />
        );

      default:
        return (
          <HomeScreen
            onSectionLongPress={handleSectionLongPress}
            onSettingsPress={handleSettingsPress}
          />
        );
    }
  };

  return <View style={styles.container}>{renderScreen()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppNavigator;
