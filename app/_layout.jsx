import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootSiblingParent } from 'react-native-root-siblings';
import { DateProvider } from '../services/DateContext';
import { colors } from '../styles/colors';

export default function RootLayout() {
  return (
    <DateProvider>
      <SafeAreaProvider>
        <RootSiblingParent>
          <Stack>
            <Stack.Screen name="index" options={{ title: 'Home', headerShown: false }} />
            <Stack.Screen name="enter-weight" options={{ title: 'Enter Weight', headerShown: true, headerTintColor: colors.textOnBackground, headerStyle: {backgroundColor: colors.cardBackground}  }} />
            <Stack.Screen name="enter-activity" options={{ title: 'Enter Activity', headerShown: true, headerTintColor: colors.textOnBackground, headerStyle: {backgroundColor: colors.cardBackground}  }} />
            <Stack.Screen name="enter-note" options={{ title: 'Enter Note', headerShown: true, headerTintColor: colors.textOnBackground, headerStyle: {backgroundColor: colors.cardBackground}  }} />
            <Stack.Screen name="enter-meal" options={{ title: 'Enter Meal', headerShown: true, headerTintColor: colors.textOnBackground, headerStyle: {backgroundColor: colors.cardBackground}  }} />
            <Stack.Screen name="enter-sleep" options={{ title: 'Enter Sleep', headerShown: true, headerTintColor: colors.textOnBackground, headerStyle: {backgroundColor: colors.cardBackground}  }} />
            <Stack.Screen name="choose-date" options={{ title: 'Choose Date', headerShown: true, headerTintColor: colors.textOnBackground, headerStyle: {backgroundColor: colors.cardBackground}  }} />
          </Stack>
        </RootSiblingParent>
      </SafeAreaProvider>
    </DateProvider>
  );
}
