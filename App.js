import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "./src/constants/theme";

export default function App() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerTop}>
        <Image
          source={require("./assets/home.jpg")}
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
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    paddingHorizontal: 20,
    flex: 1,
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
    marginTop: 30,
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
