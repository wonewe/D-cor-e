import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

const palette = {
  primary: '#1F6CAB',
  secondary: '#F2B705',
  background: '#F9F7F3',
  surface: '#FFFFFF',
  accent: '#FF6B6B',
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: palette.primary,
    secondary: palette.secondary,
    background: palette.background,
    surface: palette.surface,
    inversePrimary: palette.accent,
  },
};

export default theme;
