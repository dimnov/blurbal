import styles from "@/assets/styles/profile.styles";
import COLORS from "@/constants/colors";
import { formatPublishDate } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";

function UserBoxList({ books, onDeleteBook, handleRefresh, refreshing }: any) {
  return (
    <>
      <View style={styles.booksHeader}>
        <Text style={styles.bookTitle}>Your Recommendations</Text>
        <Text style={styles.booksCount}>{books.length} books</Text>
      </View>

      <FlatList
        data={books}
        renderItem={({ item }) => <BookItem book={item} onDeleteBook={onDeleteBook} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.booksList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        ListEmptyComponent={<EmptyBooksList />}
      />
    </>
  );
}

export default UserBoxList;

function BookItem({ book, onDeleteBook }: any) {
  return (
    <View style={styles.bookItem}>
      <Image source={book.image_url} style={styles.bookImage} />

      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{book.title}</Text>
        <RatingStars rating={book.rating} />
        <Text style={styles.bookCaption} numberOfLines={2}>
          {book.caption}
        </Text>
        <Text style={styles.bookDate}>{formatPublishDate(book.created_at)}</Text>
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={() => onDeleteBook(book.id)}>
        <Ionicons name="trash-outline" size={20} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
}

function EmptyBooksList() {
  const router = useRouter();

  return (
    <View style={styles.emptyContainer}>
      <Ionicons name="book-outline" size={50} color={COLORS.textSecondary} />
      <Text style={styles.emptyText}>No recommendations yet</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => router.push("/create")}>
        <Text style={styles.addButtonText}>Add Your First Book</Text>
      </TouchableOpacity>
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
