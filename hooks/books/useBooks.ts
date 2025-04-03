import { deleteBookApi, getUserBooksApi, uploadBookApi } from "@/services/books";
import { BookData, ProfileBoxProps } from "@/types";
import { useCallback, useState } from "react";
import { Alert } from "react-native";

export const useBooks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllBooks = async () => {};

  const getUserBooks = useCallback(
    async (userId: string): Promise<ProfileBoxProps[] | []> => {
      setIsLoading(true);
      setError(null);

      try {
        const { data } = await getUserBooksApi(userId);
        return data;
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred in getUserBooks");
        Alert.alert("Error", error || "Getting books was unsuccessful");
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    [error]
  );

  const createBook = async (bookData: BookData, imageBase64: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await uploadBookApi(bookData, imageBase64);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred in createBook");
      Alert.alert("Error", error || "Creating a book was unsuccessful");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBook = async (bookId: string, userId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await deleteBookApi(bookId, userId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred in deleteBook");
      Alert.alert("Error", error || "Deleting book was unsuccessful");
    } finally {
      setIsLoading(false);
    }
  };

  return { getAllBooks, getUserBooks, createBook, deleteBook, isLoading, error };
};
