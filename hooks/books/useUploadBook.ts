import { uploadBook } from "@/services/books";
import { BookData } from "@/types";
import { useState } from "react";
import { Alert } from "react-native";

export const useUploadBook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUploadBook = async (bookData: BookData, imageBase64: string) => {
    try {
      setIsLoading(true);
      const { imageUrl, error } = await uploadBook(bookData, imageBase64);

      if (error) {
        setError(error.message);
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Success", "Your book recommendation has been posted!");
      }

      return imageUrl;
    } catch (err: any) {
      setError(err.message);
      Alert.alert("Post Error", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleUploadBook, isLoading, error };
};
