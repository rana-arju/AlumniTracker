import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { COLORS, FONT, SIZES } from "../constants/theme";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { BASE_URL } from "../helper/Config";

const Search = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const options = {
    method: "GET",
    url: `${BASE_URL}/SearchByName/${searchKeyword}`,
    headers: {
      Authorization: `Bearer ${userId?.token}`,
      "Content-Type": "application/json",
    },
  };
  useEffect(() => {
    (async () => {
      await handleClick(searchKeyword);
      await loadUserData();
    })();
  }, [searchKeyword]);

  const handleClick = async () => {
    try {
      const response = await axios.request(options);
      if (response) {
        setSearchResults(response.data);
      }
    } catch (error) {
    } finally {
    }
  };

  const loadUserData = async () => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      if (userData) {
        userData = JSON.parse(userData);
        setUserId(userData);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong",
      });
    }
  };
  const handleNavigate = (item) => {
    navigation.navigate("studentDetails", {
      id: item._id,
      token: userId?.token,
    });
  };

  const renderListItem = ({ item }) => {
    return (
      <ScrollView>
        <TouchableOpacity
          style={styles.containerItem}
          onPress={() => handleNavigate(item)}
        >
          <TouchableOpacity style={styles.logoContainer}>
            {item?.profile_image ? (
              <Image
                source={{
                  uri: item.profile_image,
                }}
                resizeMode="contain"
                style={styles.logoImage}
              />
            ) : (
              <Image
                source={require("../../assets/images/user-profile.png")}
                resizeMode="contain"
                style={styles.logoImage}
              />
            )}
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={styles.jobName}>
              {item.name.slice(0, 14)}
              {item.name.length > 14 ? ".." : ""}
            </Text>
            <Text style={styles.jobType}>{item.department}</Text>
            <TouchableWithoutFeedback>
              <View>
                <AntDesign
                  style={styles.detailsIcon}
                  name="arrowright"
                  size={24}
                  color={COLORS.gray}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  return (
    <TouchableOpacity style={{ padding: 20, backgroundColor: COLORS.white }}>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchKeyword}
            onChangeText={(input) => setSearchKeyword(input)}
            placeholder="Enter name?"
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={require("../../assets/icons/search.png")}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>
      <View>
        <View>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Your Search Result</Text>
          </View>
        </View>
        <View style={{paddingBottom: 330}}>
          {searchResults.length > 0 ? (
            <FlatList
              style={{ marginTop: 15}}
              data={searchResults}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderListItem}
            />
          ) : (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 15,
              }}
            >
              <Text style={{ fontSize: 20, marginTop: 100 }}>
                Not Found Data
              </Text>
              <Text style={{ fontSize: 20 }}>Please Search</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  userName: {
    // fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.secondary,
  },
  welcomeMessage: {
    // fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 2,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  searchInput: {
    // fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
    borderColor: COLORS.tertiary,
    borderWidth: 1,
    borderRadius: 10,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.white,
  },
  containerItem: {
    // flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: "#FFF",
    // ...SHADOWS.medium,
    shadowColor: COLORS.white,
    marginBottom: 10,
  },
  logoContainer: {
    width: 40,
    height: 35,
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
    flexDirection: "row",
    // padding:10,
    // alignItems:"center",
    // justifyContent:"center",
    // flex: 1,
    // marginHorizontal: SIZES.medium,
    // margin:0,
    // marginLeft:30,
  },
  jobName: {
    flex: 0.5,
    fontSize: SIZES.medium,
    // fontFamily: "DMBold",
    color: COLORS.gray,
    paddingLeft: 10,
  },
  jobType: {
    flex: 0.4,
    fontSize: SIZES.small + 2,
    // fontFamily: "DMRegular",
    color: COLORS.gray,
    marginTop: 3,
    textTransform: "capitalize",
    paddingLeft: 10,
    textTransform: "uppercase",
  },
  detailsIcon: {
    flex: 0.4,
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
});
