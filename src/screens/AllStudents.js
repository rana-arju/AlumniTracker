import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { COLORS, SIZES } from "../constants/theme";
import AllStudentCard from "../components/allstudentCard/StudentCard";

const AllStudents = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState();
  const [error, setError] = useState("");
  const data = require("../../data.json");
  const renderSeparator = () => (
    <View
      style={{
        height: 10,
      }}
    />
  );
  const renderFooter = () => <View style={{ height: 50 }} />;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>All Students</Text>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <AllStudentCard
                item={item}
                selectedStudent={selectedStudent}
                // handleCardPress={handleCardPress}
              />
            )}
            columnWrapperStyle={{
              justifyContent: "space-around",
            }}
            ItemSeparatorComponent={renderSeparator}
            style={styles.allStudent}
            keyExtractor={(item) => item?._id}
            numColumns={2}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={renderFooter}
            ListHeaderComponent={() => (
              <View
                style={{
                  height: 15,
                }}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default AllStudents;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 50
  },

  allStudent: {
    display: "flex",
    marginTop: 10,
  },
  headerTitle: {
    fontSize: SIZES.medium,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: COLORS.gray,
  },
});
