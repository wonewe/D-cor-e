import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from './theme';
import { AppProvider } from './store/AppContext';
import ROUTES from './navigation/routes';
import HomeScreen from './screens/HomeScreen';
import TrendReportScreen from './screens/TrendReportScreen';
import EventCalendarScreen from './screens/EventCalendarScreen';
import PhrasebookScreen from './screens/PhrasebookScreen';

const Stack = createNativeStackNavigator();

export default function RootApp() {
  return (
    <AppProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <StatusBar style="dark" />
          <Stack.Navigator>
            <Stack.Screen
              name={ROUTES.HOME}
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={ROUTES.TREND_REPORT}
              component={TrendReportScreen}
              options={{ title: 'Weekly Trend Decoder' }}
            />
            <Stack.Screen
              name={ROUTES.EVENT_CALENDAR}
              component={EventCalendarScreen}
              options={{ title: 'K-Culture Event Calendar' }}
            />
            <Stack.Screen
              name={ROUTES.PHRASEBOOK}
              component={PhrasebookScreen}
              options={{ title: 'Carnet de phrases' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AppProvider>
  );
}
