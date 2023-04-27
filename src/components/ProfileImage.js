import React, { useState } from "react";
import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { COLORS } from "../constants/theme";

export default function ProfileImage() {
  const [imageUri, setImageUri] = useState(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };
  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };
  console.log(imageUri);
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.profileImageContainer}>
            {imageUri ? (
              <>
                <Image source={{ uri: imageUri }} style={styles.profileImage} />
              </>
            ) : (
              <MaterialIcons name="photo-camera" size={40} color="#666" />
            )}
          </View>
        </TouchableOpacity>
        {imageUri && (
          <TouchableOpacity
            onPress={() => setImageUri(null)}
            style={styles.cross}
          >
            <Ionicons
              name="close-circle-outline"
              size={26}
              color={COLORS.red}
            />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity onPress={takePhoto}>
        <MaterialCommunityIcons
          name="camera-plus-outline"
          size={40}
          color={COLORS.tertiary}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginRight: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  cross: {
    position: "absolute",
    right: 20,
    top: -10,
  },
});
