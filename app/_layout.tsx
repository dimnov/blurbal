import SafeScreen from "@/components/SafeScreen";
import { useAuth } from "@/hooks/auth/useAuth";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const segments = useSegments();
  const router = useRouter();
  const session = useAuth();

  useEffect(() => {
    const isAuthScreen = segments[0] === "(auth)";
    const isSignedIn = session && session.user;

    if (!isAuthScreen && !isSignedIn) router.replace("/(auth)");
    else if (isAuthScreen && isSignedIn) router.replace("/(tabs)");
  }, [router, segments, session, session?.user]);

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
