import React, { useEffect, useState } from "react";
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
import { Cloudinary } from "cloudinary-core";
import { set } from "react-native-reanimated";
import Toast from "react-native-toast-message";
import Button from "./Button";
import { imageUpload } from "../function/imageUpload";
const UPLOAD_PRESET = "YOUR_UPLOAD_PRESET";
const CLOUD_NAME = "db8l1ulfq";
export default function ProfileImage() {
  const [imageURI, setImageURI] = useState(null);
const token = "lkasdfkas;dfsskalsda;s23qrwklds";
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
        aspect: [4, 4],
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

  const uploadProfileImage = async () => {
    const formData = new FormData();
    formData.append("profile", {
      name: new Date() + "_profile",
      uri: imageURI.uri,
      type: "image/jpg",
    });

    try {
      // const res = await client.post("/upload-profile", formData, {
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "multipart/form-data",
      //     authorization: `Bearer ${token}`,
      //   },
      // });
      if (!imageURI) {
        Toast.show({
          type: "error",
          text1: "Please select an image to upload",
          text2: "Select your profile photo from gallery or take photo",
        });
      } else {
        const data = imageUpload(formData, token);
        // if (data) {
        //   setImageURI(data);
        // }
      }
    } catch (error) {
      console.log(error.message);
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
