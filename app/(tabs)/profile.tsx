import { useGetUserBooks } from "@/hooks/books/useGetUserBooks";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import styles from "@/assets/styles/profile.styles";
import ProfileHeader from "@/components/ProfileHeader";
import LogoutButton from "@/components/LogoutButton";
import { useDeleteBook } from "@/hooks/books/useDeleteBook";
import UserBoxList from "@/components/UserBoxList";
import Loader from "@/components/Loader";
import { sleep } from "@/lib/utils";
import { useAuthContext } from "@/context/AuthContext";

function Profile() {
  const { books, handleGetUserBooks, isLoading } = useGetUserBooks();
  const { handleDeleteBook: deleteBook } = useDeleteBook();
  const [refreshing, setRefreshing] = useState(false);

  const { session, user } = useAuthContext();

  const userId = session?.user.id as string;

  useEffect(() => {
    handleGetUserBooks(userId);
  }, [handleGetUserBooks, userId]);

  const handleDeleteBook = (bookId: string) => {
    Alert.alert("Delete Recommendation", "Are you sure you want to delete this recommendation?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteBook(bookId, userId) },
    ]);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await sleep(500);
    await handleGetUserBooks(userId);
  };

  if ((isLoading && !refreshing) || !user) return <Loader />;

  return (
    <View style={styles.container}>
      <ProfileHeader user={user} />
      <LogoutButton />

      <UserBoxList
        books={books}
        onDeleteBook={handleDeleteBook}
        refreshing={refreshing}
        handleRefresh={handleRefresh}
      />
    </View>
  );
}

export default Profile;
