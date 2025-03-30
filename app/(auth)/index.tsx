import { Text, View } from "react-native";
import styles from "../../assets/styles/login.styles";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // todo
  const handleLogin = () => {};

  return (
    <View>
      <Text>Login</Text>
    </View>
  );
}

export default Login;
