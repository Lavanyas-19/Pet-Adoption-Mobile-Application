import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* index is your Onboarding/Splash screen */}
      <Stack.Screen name="index" /> 
      {/* This points to the (auth) group */}
      <Stack.Screen name="(auth)/login" />
      {/* This points to the (tabs) group */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}