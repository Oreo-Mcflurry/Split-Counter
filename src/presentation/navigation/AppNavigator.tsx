import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SectionEditScreen from '../screens/SectionEditScreen';
import { Section } from '../../core/types';
import { useColorScheme } from '../../hooks/useColorScheme';

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  SectionEdit: { section: Section };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { isDark, colors } = useColorScheme();
  
  const handleSectionLongPress = (section: Section, navigation: any) => {
    navigation.navigate('SectionEdit', { section });
  };

  const theme = isDark 
    ? {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          primary: colors.PRIMARY,
          background: colors.BACKGROUND,
          card: colors.HEADER_BACKGROUND,
          text: colors.TEXT,
          border: colors.BORDER,
        },
      }
    : {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          primary: colors.PRIMARY,
          background: colors.BACKGROUND,
          card: colors.HEADER_BACKGROUND,
          text: colors.TEXT,
          border: colors.BORDER,
        },
      };

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen 
          name="Home" 
          options={({ navigation }) => ({ 
            headerShown: true, 
            title: 'Counter Hero',
            headerRight: () => (
              <TouchableOpacity
                style={{ padding: 8 }}
                onPress={() => navigation.navigate('Settings')}
                accessibilityLabel="설정"
                accessibilityRole="button"
              >
                <Icon name="settings-sharp" size={20} color={colors.ICON} />
              </TouchableOpacity>
            )
          })}
        >
          {(props) => (
            <HomeScreen
              {...props}
              onSectionLongPress={(section) => handleSectionLongPress(section, props.navigation)}
            />
          )}
        </Stack.Screen>
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{ 
            headerShown: true, 
            title: '설정',
            headerBackTitle: ''
          }} 
        />
        <Stack.Group screenOptions={{ 
          presentation: 'containedModal',
          animation: 'slide_from_bottom' 
        }}>
          <Stack.Screen 
            name="SectionEdit" 
            component={SectionEditScreen} 
            options={({ route }) => ({ 
              headerShown: true, 
              title: '섹션 편집',
              headerTitleAlign: 'center'
            })} 
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;