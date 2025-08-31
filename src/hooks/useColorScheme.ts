import { useColorScheme as useRNColorScheme } from 'react-native';
import { THEME_COLORS } from '../core/constants';

export const useColorScheme = () => {
  const colorScheme = useRNColorScheme();
  const isDark = colorScheme === 'dark';
  
  const colors = isDark ? THEME_COLORS.DARK : THEME_COLORS.LIGHT;
  
  return {
    isDark,
    colorScheme: isDark ? 'dark' : 'light' as const,
    colors,
  };
};