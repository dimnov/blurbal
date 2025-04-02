import { ActivityIndicator, Text, View } from "react-native";
import styles from "@/assets/styles/profile.styles";
import { Image } from "expo-image";
import { useUser } from "@/hooks/auth/useGetUser";
import { formatMemberSince } from "@/lib/utils";
import { useSession } from "@/hooks/auth/useSession";

function ProfileHeader() {
  const { session } = useSession();
  const userId = session?.user.id;

  const { data: user, loading } = useUser(userId as string);

  if (loading) return <ActivityIndicator size={"large"} />;

  return (
    <View style={styles.profileHeader}>
      <Image source={{ uri: user?.profileImage }} style={styles.profileImage} />

      <View style={styles.profileInfo}>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.memberSince}>Joined {formatMemberSince(user.created_at)}</Text>
      </View>
    </View>
  );
}

export default ProfileHeader;
