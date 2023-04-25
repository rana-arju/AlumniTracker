import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";
const Button = ({ title, onPress = () => {}}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={false}
      style={styles.btn}
    >
      <Text style={{ color: COLORS.white, fontWeight: "bold", fontSize: 18 }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
const styles = StyleSheet.create({
  btn: {
    height: 55,
    width: "100%",
    backgroundColor: COLORS.tertiary,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
