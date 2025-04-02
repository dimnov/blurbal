import styles from "@/assets/styles/profile.styles";
import COLORS from "@/constants/colors";
import { useAuth } from "@/hooks/auth/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { Alert, Text, TouchableOpacity } from "react-native";

function LogoutButton() {
  const { signOut } = useAuth();

  const handleSignOut = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => signOut(), style: "destructive" },
    ]);
  };

  return (
    <TouchableOpacity onPress={handleSignOut} style={styles.logoutButton}>
      <Ionicons name="log-out-outline" size={20} color={COLORS.white} />
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  );
}

export default LogoutButton;
