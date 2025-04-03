import styles from "@/assets/styles/profile.styles";
import COLORS from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

function StarRating({ rating, n = 5 }: { rating: number; n?: number }) {
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

export default StarRating;
