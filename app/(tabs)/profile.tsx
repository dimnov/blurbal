import { useCallback, useEffect, useState } from "react";
import { Alert, View } from "react-native";
import styles from "@/assets/styles/profile.styles";
import ProfileHeader from "@/components/ProfileHeader";
import LogoutButton from "@/components/LogoutButton";
import Loader from "@/components/Loader";
import { sleep } from "@/lib/utils";
import { useAuthContext } from "@/context/AuthContext";
import UserBooksList from "@/components/UserBooksList";
import { useBooks } from "@/hooks/books/useBooks";
import { ProfileBoxProps } from "@/types";

function Profile() {
  const [books, setBooks] = useState<ProfileBoxProps[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const { getUserBooks, deleteBook, isLoading } = useBooks();
  const { user, userId } = useAuthContext();

  const fetchBooks = useCallback(async () => {
    const fetchedBooks = await getUserBooks(userId);
    setBooks(fetchedBooks);
  }, [getUserBooks, userId]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await sleep(500);
      await fetchBooks();
    } catch (err) {
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  };

  const handleDeleteBook = (bookId: string) => {
    Alert.alert("Delete Recommendation", "Are you sure you want to delete this recommendation?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deleteBook(bookId, userId);

          setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
        },
      },
    ]);
  };

  if ((isLoading && !refreshing) || !user) return <Loader />;

  return (
    <View style={styles.container}>
      <ProfileHeader user={user} />
      <LogoutButton />

      <UserBooksList
        books={books}
        onDeleteBook={handleDeleteBook}
        refreshing={refreshing}
        handleRefresh={handleRefresh}
      />
    </View>
  );
}

export default Profile;
