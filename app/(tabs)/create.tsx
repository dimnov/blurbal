import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "@/assets/styles/create.styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/constants/colors";
import { Book, RatingPickerProps } from "@/types";
import { useAuthContext } from "@/context/AuthContext";
import { useImagePicker } from "@/hooks/books/useImagePicker";
import { useBooks } from "@/hooks/books/useBooks";

const initialStateBook = {
  title: "",
  caption: "",
  rating: 3,
  image: "",
  imageBase64: "",
};

function Create() {
  const [book, setBook] = useState<Book>(initialStateBook);
  const [loading, setLoading] = useState(false);

  const { userId } = useAuthContext();
  const { createBook } = useBooks();

  const router = useRouter();

  const { image, imageBase64, pickImage } = useImagePicker();
  const bookInputsEmpty = !book.title || !book.caption || !book.imageBase64;

  const handleSubmit = async () => {
    if (bookInputsEmpty) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!userId) {
      Alert.alert("Error", "User not found. Please log in again.");
      return;
    }

    try {
      setLoading(true);
      await createBook(
        {
          title: book.title,
          caption: book.caption,
          rating: book.rating,
          userId: userId,
        },
        book.imageBase64
      );
      router.push("/");
      Alert.alert("Success", "Your book recommendation has been posted!");
    } catch (error: any) {
      Alert.alert("Error!", error.message);
    } finally {
      setBook(initialStateBook);
      setLoading(false);
    }
  };

  useEffect(() => {
    setBook((prevBook) => ({ ...prevBook, image: image || "", imageBase64: imageBase64 || "" }));
  }, [image, imageBase64]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container} style={styles.scrollViewStyle}>
        <View style={styles.card}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>Add Book Recommendation</Text>
            <Text style={styles.subtitle}>Share your favorite reads with others</Text>
          </View>
          <View style={styles.form}>
            {/* BOOK TITLE */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Book Title</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="book-outline"
                  size={20}
                  color={COLORS.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter book title"
                  placeholderTextColor={COLORS.placeholderText}
                  value={book.title}
                  onChangeText={(title) => setBook((prevBook) => ({ ...prevBook, title }))}
                />
              </View>
            </View>

            {/* RATING */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Your Rating</Text>
              <RatingPickerContainer
                rating={book.rating}
                setRating={(rating) => setBook((prevBook) => ({ ...prevBook, rating }))}
              />
            </View>

            {/* IMAGE */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Book Image</Text>
              <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                {book.image ? (
                  <Image source={{ uri: book.image }} style={styles.previewImage} />
                ) : (
                  <View style={styles.placeholderContainer}>
                    <Ionicons name="image-outline" size={40} color={COLORS.textSecondary} />
                    <Text style={styles.placeholderText}>Tap to select image</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {/* CAPTION */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Caption</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Write your review or thoughts about this book..."
                placeholderTextColor={COLORS.placeholderText}
                value={book.caption}
                onChangeText={(caption) => setBook((prevBook) => ({ ...prevBook, caption }))}
                multiline
              />
            </View>

            <TouchableOpacity
              style={[styles.button, bookInputsEmpty && styles.disabledButton]}
              onPress={handleSubmit}
              disabled={loading || bookInputsEmpty}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <>
                  <Ionicons
                    name="cloud-upload-outline"
                    size={20}
                    color={COLORS.white}
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.buttonText}>Share</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default Create;

function RatingPickerContainer({ rating, setRating, n = 5 }: RatingPickerProps) {
  const stars = [...Array(n)].map((_, i) => i + 1);

  return (
    <View style={styles.ratingContainer}>
      {stars.map((i) => (
        <TouchableOpacity key={i} onPress={() => setRating(i)} style={styles.starButton}>
          <Ionicons
            name={i <= rating ? "star" : "star-outline"}
            size={32}
            color={i <= rating ? "#f4b400" : COLORS.textSecondary}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}
