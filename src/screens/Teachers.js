import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { COLORS, FONT, SIZES } from "../constants/theme";
import StudentCard from "../components/studentCard/StudentCard";
import { useNavigation } from "@react-navigation/native";
import useFetch from "../../hook/useFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";
const data = require("../../data.json");
import Toast from "react-native-toast-message";
import TeacherCard from "../components/teacherCard/TeacherCard";

const Teachers = () => {
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
    data,
    isLoading: teachersLoading,
    error: teachersError,
    refetch,
  } = useFetch("TeacherList", userId?.token);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();

    setRefreshing(false);
  }, []);
  return (
    <ScrollView
      style={{ marginBottom: 100, flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>All Teachers</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("allStudent", {
                endPoint: "TeacherList",
                token: userId?.token,
              })
            }
          >
            {/* <Text style={styles.headerBtn}>Show All</Text> */}
          </TouchableOpacity>
        </View>
        <View style={styles.cardsContainer}>
          {teachersLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : teachersError ? (
            <Text>Something went wrong</Text>
          ) : (
            <View style={{ alignItems: "center", rowGap: 10 }}>
              {data?.TeacherList?.map((teacher) => (
                <TeacherCard
                  key={teacher._id}
                  teacher={teacher}
                  handleCardPress={handleCardPress}
                />
              ))}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Teachers;
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
