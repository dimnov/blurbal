import { supabase } from "@/lib/supabase";
import { AVATAR_URL } from "@/constants/constants";

export const signUpApi = async (username: string, email: string, password: string) => {
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

    if (error) throw new Error(error.message);

    const userId = data.user?.id;

    if (userId) await createUser(userId, username, email);
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred during sign up.");
    }
  }
};

export const signInApi = async (email: string, password: string) => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred during sign in.");
    }
  }
};

export const signOutApi = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw new Error(error.message);
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred during sign out.");
    }
  }
};

export const createUser = async (userId: string, username: string, email: string) => {
  try {
    const profileImage = `${AVATAR_URL}${username}`;
    const { error } = await supabase
      .from("profiles")
      .insert({ id: userId, username, profileImage, email });

    if (error) throw new Error(error.message);
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred during sign in.");
    }
  }
};

export const getUserApi = async (userId: string) => {
  try {
    const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();

    if (error) throw new Error(error.message);

    return { user: data };
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred during sign in.");
    }
  }
};
