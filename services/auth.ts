import { supabase } from "@/lib/supabase";
import { Alert } from "react-native";
import { AVATAR_URL } from "@/constants/constants";

export const signUp = async (username: string, email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: username,
        },
      },
    });

    if (error) {
      Alert.alert(error.message);
      return { data: null, error };
    }

    const userId = data.user?.id;
    if (userId) await createUser(userId, username);

    return { data, error: null }; // Ensure error is explicitly null when successful
  } catch (error: any) {
    Alert.alert(error.message);
    return { data: null, error }; // Ensure return type consistency
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert(error.message);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error: any) {
    Alert.alert("Login Error", error.message);
    return { data: null, error };
  }
};

export const createUser = async (userId: string, username: string) => {
  try {
    const profileImage = `${AVATAR_URL}${username}`;
    const { error } = await supabase
      .from("profiles")
      .insert({ id: userId, username, profileImage });

    if (error) return Alert.alert(error.message);
  } catch (err) {
    Alert.alert("An unexpected error occurred.");
    console.error("signOut error:", err);
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) return Alert.alert(error.message);
  } catch (err) {
    Alert.alert("An unexpected error occurred.");
    console.error("signOut error:", err);
  }
};
