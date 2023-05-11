import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useSatate, useState } from "react";
import styles from "./DeshboardStyle";

import AsyncStorage from "@react-native-async-storage/async-storage";
import useFetch from "../../../hook/useFetch";
import { COLORS } from "../../constants/theme";
import CountCard from "../../components/admin/Dashboard/CountCard/CountCard";

export default function Admin() {
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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

  const {
    data: totalUser,
    isLoading: totalLoading,
    error: totalError,
    refetch: totalRefetch,
  } = useFetch("TotalUserCount", userId?.token);

  const {
    data: requestUser,
    isLoading: requestLoading,
    error: requestError,
    refetch: requestRefetch,
  } = useFetch("UserRequestCount", userId?.token);

  const {
    data: approveUser,
    isLoading: approveLoading,
    error: approveError,
    refetch: approveRefetch,
  } = useFetch("UserApprovedCount", userId?.token);

  const {
    data: studentUser,
    isLoading: studentLoading,
    error: studentError,
    refetch: studentRefetch,
  } = useFetch("StudentCount", userId?.token);

  const {
    data: teacherUser,
    isLoading: teacherLoading,
    error: teacherError,
    refetch: teacherRefetch,
  } = useFetch("TeacherCount", userId?.token);

  const {
    data: cmtStudent,
    isLoading: cmtLoading,
    error: cmtError,
    refetch: cmtRefetch,
  } = useFetch("CountByComputerDepartment", userId?.token);
  const {
    data: ctStudent,
    isLoading: ctLoading,
    error: ctError,
    refetch: ctRefetch,
  } = useFetch("CountByCivilDepartment", userId?.token);
  const {
    data: foodStudent,
    isLoading: foodLoading,
    error: foodError,
    refetch: foodRefetch,
  } = useFetch("CountByFoodDepartment", userId?.token);
  const {
    data: racStudent,
    isLoading: racLoading,
    error: racError,
    refetch: racRefetch,
  } = useFetch("CountByRACDepartment", userId?.token);
  const {
    data: etStudent,
    isLoading: etLoading,
    error: etError,
    refetch: etRefetch,
  } = useFetch("CountByElectricalDepartment", userId?.token);
  const {
    data: thmStudent,
    isLoading: thmLoading,
    error: thmError,
    refetch: thmRefetch,
  } = useFetch("CountByTourismDepartment", userId?.token);

  return (
    <ScrollView style={{ marginBottom: 100 }}>
      <View style={styles.header}>
        <Text style={styles.textStyle1}>Hello, Welcome to,</Text>
        <Text style={styles.textStyle2}>Alumni Dashboard!</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.cartItem}>
          {
            <CountCard
              name="Total User"
              count={totalUser?.count}
              icon="users"
              isLoading={totalLoading}
            />
          }
        </View>
        <View style={styles.cartItem}>
          {
            <CountCard
              name="Students"
              count={studentUser?.StudentCount}
              icon="user-graduate"
              isLoading={studentLoading}
            />
          }
        </View>
        <View style={styles.cartItem}>
          {
            <CountCard
              name="Teachers"
              count={teacherUser?.TeacherCount}
              icon="chalkboard-teacher"
              isLoading={teacherLoading}
            />
          }
        </View>

        <View style={styles.cartItem}>
          {
            <CountCard
              name="Approved"
              count={approveUser?.ApprovedCount}
              icon="check-circle"
              isLoading={approveLoading}
            />
          }
        </View>
        <View style={styles.cartItem}>
          {
            <CountCard
              name="Request"
              count={requestUser?.RequestCount}
              icon="hand-holding-heart"
              isLoading={requestLoading}
            />
          }
        </View>
      </View>
      <Text
        style={{
          textAlign: "center",
          marginTop: 20,
          fontSize: 18,
          textTransform: "uppercase",
          marginBottom: 10,
          color: COLORS.gray,
        }}
      >
        Department wise Student
      </Text>
      <View style={styles.card}>
        <View style={styles.cartItem}>
          {
            <CountCard
              name="computer"
              count={cmtStudent?.Count}
              icon="desktop"
              isLoading={cmtLoading}
            />
          }
        </View>
        <View style={styles.cartItem}>
          {
            <CountCard
              name="civil"
              count={ctStudent?.Count}
              icon="home"
              isLoading={ctLoading}
            />
          }
        </View>
        <View style={styles.cartItem}>
          {
            <CountCard
              name="Food"
              count={foodStudent.Count}
              icon="hamburger"
              isLoading={foodLoading}
            />
          }
        </View>

        <View style={styles.cartItem}>
          {
            <CountCard
              name="Electrical"
              count={etStudent?.Count}
              icon="network-wired"
              isLoading={etLoading}
            />
          }
        </View>
        <View style={styles.cartItem}>
          {
            <CountCard
              name="THM"
              count={thmStudent?.Count}
              icon="hand-holding-heart"
              isLoading={thmLoading}
            />
          }
        </View>
        <View style={styles.cartItem}>
          {
            <CountCard
              name="RAC"
              count={racStudent?.Count}
              icon="hand-holding-heart"
              isLoading={racLoading}
            />
          }
        </View>
      </View>
    </ScrollView>
  );
}
