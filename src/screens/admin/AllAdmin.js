import { ScrollView, StyleSheet, Text, View } from "react-native";
import ActionCard from "../../components/admin/AdminActions/ActionCard";
import { COLORS } from "../../constants/theme";
import AdminCard from "../../components/admin/AdminMake/AdminCard";
import Search from "../../components/admin/Search/Search";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AllAdmin = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [againLoad, setAgainLoad] = useState("");

  const [userId, setUserId] = useState("");
  const loadUserData = async () => {
    try {
      setLoading(true);
      let userData = await AsyncStorage.getItem("userData");
      if (userData) {
        userData = JSON.parse(userData);
        setUserId(userData);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong",
      });
    }
  };
  useEffect(() => {
    loadUserData();
  }, [searchKeyword, againLoad]);
  return (
    <View style={{ padding: 10 }}>
      <Search
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        setSearchResults={setSearchResults}
        userId={userId}
        againLoad={againLoad}
        setAgainLoad={setAgainLoad}
      />
      <View style={styles.header} horizontal>
        <Text
          style={{ fontSize: 16, fontWeight: "bold", color: COLORS.tertiary }}
        >
          Name
        </Text>
        <Text
          style={{ fontSize: 16, fontWeight: "bold", color: COLORS.tertiary }}
        >
          Email
        </Text>
        <Text
          style={{ fontSize: 16, fontWeight: "bold", color: COLORS.tertiary }}
        >
          Admin
        </Text>
        <Text
          style={{ fontSize: 16, fontWeight: "bold", color: COLORS.tertiary }}
        >
          Actions
        </Text>
      </View>
      <AdminCard
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        setSearchKeyword={setSearchKeyword}
        setAgainLoad={setAgainLoad}
        againLoad={againLoad}
        endPoint="AdminList"
      />
    </View>
  );
};

export default AllAdmin;
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: COLORS.gray,
  },
});
