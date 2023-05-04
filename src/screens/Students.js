import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { COLORS, FONT, SIZES } from "../constants/theme";
import StudentCard from "../components/studentCard/StudentCard";
import { useNavigation } from "@react-navigation/native";
import useFetch from "../../hook/useFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";
const data = require("../../data.json");
import Toast from "react-native-toast-message";

const Students = () => {
  const [selectedStudent, setSelectedStudent] = useState();
  const [userId, setUserId] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      let userData = await AsyncStorage.getItem("userData");
      if (userData) {
        userData = JSON.parse(userData);
        setUserId(userData);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong",
      });
    }
  };
  useEffect(() => {
    loadUserData();
  }, [refreshing]);
  const navigation = useNavigation();
  const handleCardPress = (item) => {
    navigation.navigate(`studentDetails`, {
      id: item._id,
      token: userId?.token,
    });
    // setSelectedJob(item.job_id);
  };
  const {
    data: cmtStudents,
    isLoading: cmtLoading,
    error: cmtError,
    refetch: cmtRefetch,
  } = useFetch("ListByComputerDepartment", userId?.token);
  const {
    data: ctStudents,
    isLoading: ctLoading,
    error: ctError,
    refetch: ctRefetch,
  } = useFetch("ListByCivilDepartment", userId?.token);
  const {
    data: ftStudents,
    isLoading: ftLoading,
    error: ftError,
    refetch: ftRefetch,
  } = useFetch("ListByFoodDepartment", userId?.token);
  const {
    data: racStudents,
    isLoading: racLoading,
    error: racError,
    refetch: racRefetch,
  } = useFetch("ListByRACDepartment", userId?.token);
  const {
    data: etStudents,
    isLoading: etLoading,
    error: etError,
    refetch: etRefetch,
  } = useFetch("ListByElectricalDepartment", userId?.token);
  const {
    data: thmStudents,
    isLoading: thmLoading,
    error: thmError,
    refetch: thmRefetch,
  } = useFetch("ListByTourismDepartment", userId?.token);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    cmtRefetch();
    ctRefetch();
    ftRefetch();
    thmRefetch();
    etRefetch();
    racRefetch();
    setRefreshing(false);
  }, []);
  return (
    <ScrollView
      style={{ marginBottom: 100 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Computer Students</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("allStudent", {
                endPoint: "ListByComputerDepartment",
                token: userId?.token,
              })
            }
          >
            <Text style={styles.headerBtn}>Show All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardsContainer}>
          {cmtLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : cmtError ? (
            <Text>Something went wrong</Text>
          ) : (
            <FlatList
              data={cmtStudents}
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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("allStudent", {
                endPoint: "ListByCivilDepartment",
                token: userId?.token,
              })
            }
          >
            <Text style={styles.headerBtn}>Show All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardsContainer}>
          {ctLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : ctError ? (
            <Text>Something went wrong</Text>
          ) : (
            <FlatList
              data={ctStudents}
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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("allStudent", {
                endPoint: "ListByFoodDepartment",
                token: userId?.token,
              })
            }
          >
            <Text style={styles.headerBtn}>Show All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardsContainer}>
          {ftLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : ftError ? (
            <Text>Something went wrong</Text>
          ) : (
            <FlatList
              data={ftStudents}
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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("allStudent", {
                endPoint: "ListByRACDepartment",
                token: userId?.token,
              })
            }
          >
            <Text style={styles.headerBtn}>Show All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardsContainer}>
          {racLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : racError ? (
            <Text>Something went wrong</Text>
          ) : (
            <FlatList
              data={racStudents}
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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("allStudent", {
                endPoint: "ListByElectricalDepartment",
                token: userId?.token,
              })
            }
          >
            <Text style={styles.headerBtn}>Show All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardsContainer}>
          {etLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : etError ? (
            <Text>Something went wrong</Text>
          ) : (
            <FlatList
              data={etStudents}
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
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>THM Students</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("allStudent", {
                endPoint: "ListByTourismDepartment",
                token: userId?.token,
              })
            }
          >
            <Text style={styles.headerBtn}>Show All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardsContainer}>
          {thmLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : thmError ? (
            <Text>Something went wrong</Text>
          ) : (
            <FlatList
              data={thmStudents}
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
