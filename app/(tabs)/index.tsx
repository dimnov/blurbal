import { FlatList, RefreshControl, Text, View } from "react-native";
import { Image } from "expo-image";
import styles from "@/assets/styles/home.styles";
import { useGetBooks } from "@/hooks/books/useGetBooks";
import { useEffect, useState } from "react";
import { ItemData } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/constants/colors";
import { formatPublishDate, sleep } from "@/lib/utils";
import Loader from "@/components/Loader";

function Home() {
  // also {error}
  const { books, handleGetBooks, isLoading } = useGetBooks();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    handleGetBooks();
  }, [handleGetBooks]);

  if (isLoading) return <Loader size="large" />;

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={({ item }) => <BookPostCard book={item} />}
        keyExtractor={(book) => book.id?.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            style={{ padding: 12 }}
            refreshing={refreshing}
            onRefresh={async () => {
              await sleep(500);
              handleGetBooks();
            }}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        // onEndReached={handleLoadMore}
        // onEndReachedThreshold={0.1}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Blurbal</Text>
            <Text style={styles.headerSubtitle}>Discover great reads from the community</Text>
          </View>
        }
        // ListFooterComponent={
        //   true && books.length > 0 ? (
        //     <ActivityIndicator style={styles.footerLoader} size="small" color={COLORS.primary} />
        //   ) : null
        // }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="book-outline" size={60} color={COLORS.textSecondary} />
            <Text style={styles.emptyText}>No recommendations yet</Text>
            <Text style={styles.emptySubtext}>Be the first to share a book!</Text>
          </View>
        }
      />
    </View>
  );
}

export default Home;

function BookPostCard({ book }: { book: ItemData }) {
  return (
    <View style={styles.bookCard}>
      <View style={styles.bookHeader}>
        <View style={styles.userInfo}>
          <Image source={{ uri: book.profiles.profileImage }} style={styles.avatar} />
          <Text style={styles.username}>{book.profiles.username}</Text>
        </View>
      </View>

      <View style={styles.bookImageContainer}>
        <Image source={{ uri: book.image_url }} style={styles.bookImage} contentFit="cover" />
      </View>

      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{book.title}</Text>
        <RatingStars rating={book.rating} />
        <Text style={styles.caption}>{book.caption}</Text>
        <Text style={styles.date}>Shared on {formatPublishDate(book.created_at)}</Text>
      </View>
    </View>
  );
}

function RatingStars({ rating, n = 5 }: { rating: number; n?: number }) {
  return (
    <View style={styles.ratingContainer}>
      {Array.from({ length: n }, (_, i) => i + 1).map((i) => (
        <Ionicons
          name={i <= rating ? "star" : "star-outline"}
          key={i}
          size={16}
          color={i <= rating ? "#f4b400" : COLORS.textSecondary}
        />
      ))}
    </View>
  );
}
