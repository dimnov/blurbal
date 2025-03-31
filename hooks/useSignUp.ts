import { useState } from "react";
import { Alert } from "react-native";
import { signUp } from "../services/auth";

export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await signUp(username, email, password);

      if (error) setError(error.message);

      return data;
    } catch (err: any) {
      setError(err.message);
      Alert.alert("Sign Up Error", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSignUp, isLoading, error };
};
