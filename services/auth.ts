import { supabase } from "@/lib/supabase";
import { Alert } from "react-native";
import { AVATAR_URL } from "@/constants/avatarUrl";

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

    if (error) return Alert.alert(error.message);

    const userId = data.user?.id;

    if (userId) createUser(userId, username);
  } catch (error: any) {
    if (error) Alert.alert(error.message);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return Alert.alert(error.message);
  } catch (error: any) {
    Alert.alert("Login Error", error.message);
  }
};

// export const getUserProfile = async () => {
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (user) {
//     console.log("User Display Name:", user.user_metadata.display_name);
//   }
// };

export const createUser = async (userId: string, username: string) => {
  const profileImage = `${AVATAR_URL}${username}`;
  const { error } = await supabase.from("profiles").insert({ userId, username, profileImage });

  if (error) {
    console.error("Error inserting profile:", error.message);
  } else {
    console.log("Profile created successfully");
  }
};
