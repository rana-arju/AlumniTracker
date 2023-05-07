import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const Teacher = () => {
  return (
    <TouchableOpacity style={styles.cardView}>
      <Text style={{ textAlign: "center" }}>
        <FontAwesome5 name="chalkboard-teacher" color="#fff" size={25} />
      </Text>
      <Text
        style={{
          textAlign: "center",
          padding: 10,
          color: "#fff",
          fontSize: 20,
        }}
      >
        543
      </Text>
      <Text
        style={{
          textAlign: "center",
          color: "#fff",
          fontSize: 20,
          fontWeight: 600,
        }}
      >
        TEACHER
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardView: {
    padding: 15,
  },
});

export default Teacher;
