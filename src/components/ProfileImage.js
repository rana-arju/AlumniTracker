import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { COLORS } from "../constants/theme";
import Toast from "react-native-toast-message";
import Button from "./Button";

export default function ProfileImage({ imageURI, setImageURI, setUser,user}) {
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Toast.show({
        type: "error",
        text1: "Sorry, we need camera roll permissions to make this work!",
        text2: "Allow camera permission",
      });
    }
    if (status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setImageURI(result.assets[0].uri);
      }
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
      setImageURI(result.assets[0].uri);
    }
  };

  const imageExtension = imageURI?.split(/(.(?:jpe?g|png|gif|webp))$/)[1];

  const uploadProfileImage = async () => {
    try {
      const formData = new FormData();
      formData.append("file", {
        name: new Date() + "_profile",
        uri: imageURI,
        type: `image/${imageExtension?.split(".")[1]}`,
      });
      formData.append("upload_preset", "alumniTracker");
      formData.append("cloud_name", "db8l1ulfq");

      const data = fetch(
        "https://api.cloudinary.com/v1_1/db8l1ulfq/image/upload",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setImageURI(data.url);
          setUser({ ...user, image: data.url });
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.profileImageContainer}>
            {imageURI ? (
              <>
                <Image source={{ uri: imageURI }} style={styles.profileImage} />
              </>
            ) : (
              <MaterialIcons name="photo-camera" size={40} color="#666" />
            )}
          </View>
        </TouchableOpacity>
        {imageURI && (
          <TouchableOpacity
            onPress={() => setImageURI(null)}
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
      {imageURI && <Button title="Upload Photo" onPress={uploadProfileImage} />}
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
