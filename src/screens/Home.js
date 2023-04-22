import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants/theme";

const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerTop}>
        <Image
          source={require("../../assets/home.jpg")}
          style={styles.headerLogo}
          resizeMode="cover"
        />
        <Text style={styles.headerText}>Welcome to</Text>
        <Text style={[styles.headerText, { color: COLORS.tertiary }]}>
          Alumni Tracker
        </Text>
        <Text style={styles.headerDescription}>
          An alumnus or alumna is a former student and most often a graduate of
          an educational institution.
        </Text>
      </View>
      <View style={{ width: "100%" }}>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.tertiary,
            height: 50,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
          }}
          onPress={() => navigation.navigate("My Profile")}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            Go Account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    paddingHorizontal: 20,
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  headerTop: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerLogo: {
    width: "100%",
    height: undefined,
    aspectRatio: 1.5,
    alignItems: "stretch",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  headerDescription: {
    fontSize: 16,
    textAlign: "left",
    color: COLORS.gray,
    marginTop: 30,
    paddingBottom: 50,
    lineHeight: 25,
  },
});
