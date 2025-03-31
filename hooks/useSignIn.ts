import { useState } from "react";
import { Alert } from "react-native";
import { signIn } from "../services/auth";

export const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await signIn(email, password);

      if (error) {
        setError(error.message);
        Alert.alert("Login Error", error.message);
      } else {
        Alert.alert("Success", "Logged in successfully!");
      }

      return data;
    } catch (err: any) {
      setError(err.message);
      Alert.alert("Login Error", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSignIn, isLoading, error };
};
