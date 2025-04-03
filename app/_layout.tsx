import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import SafeScreen from "@/components/SafeScreen";
import { AuthProvider } from "@/context/AuthContext";
import { useSession } from "@/hooks/auth/useSession";

export default function RootLayout() {
  const segments = useSegments();
  const router = useRouter();
  const { session, isCheckingAuth } = useSession();

  useEffect(() => {
    const isAuthScreen = segments[0] === "(auth)";
    const isSignedIn = session && session.user;

    if (!isAuthScreen && !isSignedIn) router.replace("/(auth)");
    else if (isAuthScreen && isSignedIn) router.replace("/(tabs)");
  }, [router, segments, session, session?.user]);

  if (isCheckingAuth) return null;

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <SafeScreen>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(auth)" />
          </Stack>
        </SafeScreen>
        <StatusBar style="dark" />
      </SafeAreaProvider>
    </AuthProvider>
  );
}
