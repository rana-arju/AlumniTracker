import React, { useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES } from "../../constants/theme";
import SuggestStudentCard from "./SuggestStudentCard";
const SuggestStudents = () => {
  const navigation = useNavigation();
  const data = require("../../../data.json");
const [isLoading, setIsLoading] = useState(false)
const [error, setError] = useState("")
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Suggested Student</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map((student) => (
            <SuggestStudentCard
              key={student._id}
              student={student}
            //   handleNavigate={() =>
            //     router.push(`/job-details/${student.job_id}`)
            //   }
            />
          ))
        )}
      </View>
    </View>
  );
};

export default SuggestStudents;
const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xLarge,
    marginBottom: 120
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SIZES.small,
  },
  headerTitle: {
    fontSize: SIZES.large,
    // fontFamily: FONT.medium,
    color: COLORS.primary,
  },
  headerBtn: {
    fontSize: SIZES.medium,
    // fontFamily: FONT.medium,
    color: COLORS.gray,
  },
  cardsContainer: {
    marginTop: SIZES.medium,
    gap: SIZES.small,
  },
});
