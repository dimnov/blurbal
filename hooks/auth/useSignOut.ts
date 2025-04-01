import { useState } from "react";
import { Alert } from "react-native";
import { signOut } from "../../services/auth";

export const useSignOut = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);

    try {
      await signOut();
    } catch (error: any) {
      Alert.alert("Sign Out Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSignOut, isLoading };
};
