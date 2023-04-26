import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../constants/theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const HeaderProfile = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={{ flexDirection: "row", gap: 10 }}>
      {/* <Text style={{ color: COLORS.gray, marginTop: 5 }}>Rana Arju</Text> */}
      <Image
        source={require("../../assets/icons/cox.jpg")}
        style={{
          height: 32,
          width: 32,
          borderRadius: 40,
          marginBottom: 10,
          marginRight: 10,
        }}
      />
    </TouchableOpacity>
  );
};

export default HeaderProfile;

const styles = StyleSheet.create({});
