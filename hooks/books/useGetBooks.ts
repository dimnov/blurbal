import { getAllBooks } from "@/services/books";
import { ItemData } from "@/types";
import { useCallback, useState } from "react";
import { Alert } from "react-native";

export const useGetBooks = () => {
  const [books, setBooks] = useState<ItemData[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetBooks = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await getAllBooks();

      if (error) {
        setError(error);
        Alert.alert("Error", error);
      } else {
        setBooks(data);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        Alert.alert("Fetch Error", err.message);
      } else {
        setError("There was an error getting the books");
        Alert.alert("Fetch Error", "There was an error getting the books");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { books, handleGetBooks, isLoading, error };
};
