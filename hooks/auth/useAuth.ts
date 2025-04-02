import { signUpApi, signInApi, signOutApi } from "@/services/auth";
import { useState } from "react";
import { Alert } from "react-native";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUp = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await signUpApi(username, email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred in signUp");
      Alert.alert("Error", error || "Invalid email");
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await signInApi(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred in signIn");
      Alert.alert("Error", error || "Invalid login credentials");
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await signOutApi();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred in signOut");
      Alert.alert("Error", error || "Logout was unsuccessful");
    } finally {
      setIsLoading(false);
    }
  };

  return { signUp, signIn, signOut, isLoading, error };
};
