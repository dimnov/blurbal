import COLORS from "@/constants/colors";
import { ActivityIndicator, View } from "react-native";

type LoaderProps = {
  size?: "small" | "large";
};

function Loader({ size = "large" }: LoaderProps) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background,
      }}
    >
      <ActivityIndicator size={size} color={COLORS.primary} />
    </View>
  );
}

export default Loader;
