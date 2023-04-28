import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "../constants/theme";
import { Ionicons } from "@expo/vector-icons";
const Input = ({
  label,
  iconName,
  error,
  password,
  location,
  value,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = useState(password);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.tertiary
              : COLORS.tertiary,
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: error ? "#f9f9f9" : COLORS.light,
          },
        ]}
      >
        {location ? (
          <Ionicons
            name={iconName}
            style={{ color: COLORS.tertiary, fontSize: 22, marginRight: 10 }}
          />
        ) : (
          <Icon
            name={iconName}
            style={{ color: COLORS.tertiary, fontSize: 22, marginRight: 10 }}
          />
        )}

        <TextInput
          autoCorrect={false}
          value={value}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={{ color: COLORS.tertiary, flex: 1 }}
          {...props}
        />

        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            style={{ color: COLORS.tertiary, fontSize: 22 }}
          />
        )}
      </View>
      {error && (
        <Text style={{ marginTop: 7, color: COLORS.red, fontSize: 12 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.gray,
  },
  inputContainer: {
    height: 55,
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 1,
  },
});

export default Input;
