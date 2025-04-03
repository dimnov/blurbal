// check if the user is authenticated

import { supabase } from "@/lib/supabase";
import { BookData } from "@/types";
import { decode } from "base64-arraybuffer";

export const uploadBookApi = async (bookData: BookData, imageBase64: string) => {
  try {
    if (!imageBase64) throw new Error("No file selected");

    const fileName = `books/${Date.now()}.png`;
    const contentType = "image/png";

    const { error } = await supabase.storage
      .from("book-images")
      .upload(fileName, decode(imageBase64), {
        contentType,
      });

    if (error) throw new Error(error.message);

    const { data: publicUrlData } = supabase.storage.from("book-images").getPublicUrl(fileName);
    const imageUrl = publicUrlData.publicUrl;

    const { error: insertError } = await supabase
      .from("books")
      .insert([{ ...bookData, image_url: imageUrl }]);

    if (insertError) throw new Error(insertError.message);
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred during sign up.");
    }
  }
};

export const deleteBookApi = async (bookId: string, userId: string) => {
  try {
    await supabase.from("books").delete().eq("id", bookId).eq("userId", userId);
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred during sign up.");
    }
  }
};

// pagination
export const getAllBooks = async () => {
  try {
    const { data, error } = await supabase
      .from("books")
      .select("*, profiles(username, profileImage)")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return { data, error: null };
  } catch (err: any) {
    return { data: [], error: err.message };
  }
};

export const getUserBooksApi = async (userId: string) => {
  try {
    const { data, error } = await supabase.from("books").select("*").eq("userId", userId);

    if (error) throw new Error(error.message);

    return { data };
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred getting user books.");
    }
  }
};
