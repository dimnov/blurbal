import { Text, View } from "react-native";
import styles from "@/assets/styles/profile.styles";
import { Image } from "expo-image";
import { formatMemberSince } from "@/lib/utils";
import { Profile } from "@/types";

function ProfileHeader({ user }: { user: Profile }) {
  return (
    <View style={styles.profileHeader}>
      <Image source={{ uri: user.profileImage }} style={styles.profileImage} />

      <View style={styles.profileInfo}>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.memberSince}>Joined {formatMemberSince(user.created_at)}</Text>
      </View>
    </View>
  );
}

export default ProfileHeader;
