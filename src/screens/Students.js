import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONT, SIZES } from "../constants/theme";
import StudentCard from "../components/studentCard/StudentCard";
import { useNavigation } from "@react-navigation/native";
const data = require("../../data.json");

const Students = () => {
  const [selectedStudent, setSelectedStudent] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigation = useNavigation();
  const handleCardPress = (item) => {
    navigation.navigate(`studentDetails`, {
      id: item._id,
    });
    // setSelectedJob(item.job_id);
  };
  return (
    <ScrollView style={{ marginBottom: 100 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>CMT Students</Text>
          <TouchableOpacity onPress={() => navigation.navigate("allStudent")}>
            <Text style={styles.headerBtn}>Show All</Text>
          </TouchableOpacity>
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
                <StudentCard
                  item={item}
                  selectedStudent={selectedStudent}
                  handleCardPress={handleCardPress}
                />
              )}
              keyExtractor={(item) => item?._id}
              contentContainerStyle={{ columnGap: SIZES.medium }}
              horizontal
            />
          )}
        </View>
      </View>
      {/* cmt student end */}
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Civil Students</Text>
          <TouchableOpacity onPress={() => navigation.navigate("allStudent")}>
            <Text style={styles.headerBtn}>Show All</Text>
          </TouchableOpacity>
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
                <StudentCard
                  item={item}
                  selectedStudent={selectedStudent}
                  handleCardPress={handleCardPress}
                />
              )}
              keyExtractor={(item) => item?._id}
              contentContainerStyle={{ columnGap: SIZES.medium }}
              horizontal
            />
          )}
        </View>
      </View>
      {/* Food student end */}
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Food Students</Text>
          <TouchableOpacity onPress={() => navigation.navigate("allStudent")}>
            <Text style={styles.headerBtn}>Show All</Text>
          </TouchableOpacity>
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
                <StudentCard
                  item={item}
                  selectedStudent={selectedStudent}
                  handleCardPress={handleCardPress}
                />
              )}
              keyExtractor={(item) => item?._id}
              contentContainerStyle={{ columnGap: SIZES.medium }}
              horizontal
            />
          )}
        </View>
      </View>
      {/* RAC student end */}
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>RAC Students</Text>
          <TouchableOpacity onPress={() => navigation.navigate("allStudent")}>
            <Text style={styles.headerBtn}>Show All</Text>
          </TouchableOpacity>
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
                <StudentCard
                  item={item}
                  selectedStudent={selectedStudent}
                  handleCardPress={handleCardPress}
                />
              )}
              keyExtractor={(item) => item?._id}
              contentContainerStyle={{ columnGap: SIZES.medium }}
              horizontal
            />
          )}
        </View>
      </View>
      {/* Electrical student end */}
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Electrical Students</Text>
          <TouchableOpacity onPress={() => navigation.navigate("allStudent")}>
            <Text style={styles.headerBtn}>Show All</Text>
          </TouchableOpacity>
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
                <StudentCard
                  item={item}
                  selectedStudent={selectedStudent}
                  handleCardPress={handleCardPress}
                />
              )}
              keyExtractor={(item) => item?._id}
              contentContainerStyle={{ columnGap: SIZES.medium }}
              horizontal
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Students;
const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xLarge,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  },
});
