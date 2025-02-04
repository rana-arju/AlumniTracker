import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { COLORS } from "../../../constants/theme";
import { width } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import useFetch from "../../../../hook/useFetch";
import { useCallback, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../../../helper/Config";

const ActionCard = ({
  searchResults,
  setSearchResults,
  setSearchKeyword,
  againLoad,
  setAgainLoad,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);


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
  }, [refreshing, againLoad]);

  const handleStatus = async (id, UserStatus) => {
    let status;
    if (UserStatus == "Request") {
      status = "Approve";
    }
    if (UserStatus == "Approve") {
      status = "Request";
    }

    if (status && userId) {
      try {
        const { data } = await axios.post(
          `${BASE_URL}/UpdateUserStatus/${id}/${status}`,
          { status },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userId?.token}`,
            },
          }
        );
        if (data) {
          setAgainLoad(data);
          Toast.show({
            type: "success",
            text1: `Status ${data.status} Successful!`,
            text2: "Status Change",
          });
        }
      } catch (error) {
        return false;
      } finally {
      }
    }
  };
  const {
    data,
    isLoading: loading,
    error,
    refetch,
  } = useFetch("UserRequestList", userId?.token);
  const navigation = useNavigation();

  const handleCardPress = (id) => {
    navigation.navigate(`studentDetails`, {
      id: id,
      token: userId?.token,
    });
  };
  const handleDelete = async (id) => {
    if (id && userId) {
      try {
        const { data } = await axios.post(
          `${BASE_URL}/DeleteUser/${id}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userId?.token}`,
            },
          }
        );
        if (data.message == "successful") {
          setAgainLoad(data.data);
        }
      } catch (error) {
        return false;
      } finally {
      }
    }
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setSearchResults([]);
    setSearchKeyword("");
    setRefreshing(false);
  }, []);
  useEffect(() => {
    refetch();
  }, [againLoad]);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[COLORS.tertiary]}
        />
      }
    >
      {loading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.tertiary}
          style={{ marginTop: 200 }}
        />
      ) : (
        <ScrollView style={{ marginBottom: 250 }}>
          {searchResults.length > 0
            ? searchResults?.map((user, index) => (
                <View key={index} style={styles.table}>
                  <Text style={{ fontSize: 10 }}>
                    {user.name.length > 12
                      ? user.name.substring(0, 12) + "..."
                      : user.name}
                  </Text>
                  <Text style={{ fontSize: 10 }}>
                    {user.email > 20 ? user.email.substring(0, 20) : user.email}
                  </Text>
                  <Text onPress={() => handleStatus(user?._id, user?.status)}>
                    {user.status == "Request" && (
                      <MaterialCommunityIcons
                        name="toggle-switch-off"
                        size={24}
                        color={COLORS.tertiary}
                      />
                    )}
                    {user.status == "Approve" && (
                      <MaterialCommunityIcons
                        name="toggle-switch"
                        size={24}
                        color={"#00A67E"}
                      />
                    )}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={[styles.iconBox, { marginRight: 10 }]}
                      onPress={() => handleDelete(user._id)}
                    >
                      <MaterialCommunityIcons
                        name="delete-outline"
                        size={22}
                        color={COLORS.red}
                      />
                    </Text>
                    <Text onPress={() => handleCardPress(user?._id)}>
                      <Feather
                        name="external-link"
                        size={22}
                        color={COLORS.tertiary}
                      />
                    </Text>
                  </View>
                </View>
              ))
            : data?.RequestList?.map((user, index) => (
                <View key={index} style={styles.table}>
                  <Text style={{ fontSize: 10 }}>
                    {user.name.length > 12
                      ? user.name.substring(0, 12) + "..."
                      : user.name}
                  </Text>
                  <Text style={{ fontSize: 10 }}>
                    {user.email > 20 ? user.email.substring(0, 20) : user.email}
                  </Text>
                  <Text onPress={() => handleStatus(user?._id, user?.status)}>
                    {user.status == "Request" && (
                      <MaterialCommunityIcons
                        name="toggle-switch-off"
                        size={24}
                        color={COLORS.tertiary}
                      />
                    )}
                    {user.status == "Approve" && (
                      <MaterialCommunityIcons
                        name="toggle-switch"
                        size={24}
                        color={"#00A67E"}
                      />
                    )}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={[styles.iconBox, { marginRight: 10 }]}
                      onPress={() => handleDelete(user._id)}
                    >
                      <MaterialCommunityIcons
                        name="delete-outline"
                        size={22}
                        color={COLORS.red}
                      />
                    </Text>
                    <Text onPress={() => handleCardPress(user?._id)}>
                      <Feather
                        name="external-link"
                        size={22}
                        color={COLORS.tertiary}
                      />
                    </Text>
                  </View>
                </View>
              ))}
        </ScrollView>
      )}
    </ScrollView>
  );
};

export default ActionCard;

const styles = StyleSheet.create({
  table: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: COLORS.gray,
    justifyContent: "space-between",
  },
  iconBox: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: COLORS.tertiary,
    padding: 2,
  },
});
