// check if the user is authenticated

import { supabase } from "@/lib/supabase";
import { BookData } from "@/types";
import { decode } from "base64-arraybuffer";

export const uploadBook = async (bookData: BookData, imageBase64: string) => {
  try {
    if (!imageBase64) throw new Error("No file selected");

    const fileName = `books/${Date.now()}.png`;
    const contentType = "image/png";

    // Upload to Supabase Storage
    const { error } = await supabase.storage
      .from("book-images")
      .upload(fileName, decode(imageBase64), {
        contentType,
      });
    if (error) throw error;
    const { data: publicUrlData } = supabase.storage.from("book-images").getPublicUrl(fileName);
    const imageUrl = publicUrlData.publicUrl;

    // Insert into "books" table
    const { error: insertError } = await supabase
      .from("books")
      .insert([{ ...bookData, image_url: imageUrl }]);

    if (insertError) throw insertError;

    return { imageUrl, error: null };
  } catch (err: any) {
    return { imageUrl: null, error: err.message };
  }
};

export const updateBook = async () => {};

export const deleteBook = async () => {};

export const getBook = async () => {};

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
