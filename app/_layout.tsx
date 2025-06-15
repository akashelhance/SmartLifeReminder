import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-reanimated';

export const unstable_settings = {
  initialRouteName: 'splash',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Splash screen */}
        <Stack.Screen name="splash" options={{ headerShown: false }} />

        {/* Bottom Tabs layout */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Screens outside tabs */}
        <Stack.Screen name="add-birthday" options={{ title: 'Add Birthday' }} />
        <Stack.Screen name="add-anniversary" options={{ title: 'Add Anniversary' }} />
        <Stack.Screen name="add-health-checkup" options={{ title: 'Add Health Check-up' }} />
        <Stack.Screen name="add-vaccination" options={{ title: 'Add Vaccination' }} />
        <Stack.Screen name="add-medicine" options={{ title: 'Add Medicine Reminder' }} />

        {/* 404 fallback */}
        <Stack.Screen name="+not-found" />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
