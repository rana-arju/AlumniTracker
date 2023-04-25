import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const SuggestStudentCard = ({ student, handleNavigate }) => {
  console.log(student.name);
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={styles.logoContainer}>
        {student?.profile_image ? (
          <Image
            source={{
              uri: student.profile_image
            }}
            resizeMode="contain"
            style={styles.logoImage}
          />
        ) : (
          <Image
            source={
              require("../../../assets/images/user-profile.png")
            }
            resizeMode="contain"
            style={styles.logoImage}
          />
        )}
   
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.jobName}>{student.name}</Text>
        <Text style={styles.jobType}>{student.department}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SuggestStudentCard;
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: "#FFF",
    // ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  logoContainer: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  logoImage: {
    width: "100%",
    height: "100%",
    
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  jobName: {
    fontSize: SIZES.medium,
    // fontFamily: "DMBold",
    color: COLORS.primary,
  },
  jobType: {
    fontSize: SIZES.small + 2,
    // fontFamily: "DMRegular",
    color: COLORS.gray,
    marginTop: 3,
    textTransform: "capitalize",
  },
});
