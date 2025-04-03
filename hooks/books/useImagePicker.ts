import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";

export const useImagePicker = () => {
  const [image, setImage] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  const requestMediaLibraryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need camera roll permissions to upload an image");
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    try {
      if (!(await requestMediaLibraryPermission())) return;

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
        base64: true,
      });

      if (!result.canceled) {
        const selectedImage = result.assets[0];

        const base64 = await FileSystem.readAsStringAsync(selectedImage.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        setImage(selectedImage.uri);
        setImageBase64(base64);
      }
    } catch (error) {
      console.error("Image selection error:", error);
      Alert.alert("Error", "There was a problem selecting your image.");
    }
  };

  return { image, imageBase64, pickImage };
};
