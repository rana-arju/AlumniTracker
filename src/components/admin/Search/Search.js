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
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONT, SIZES } from "../../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import axios from "axios";
import { BASE_URL } from "../../../helper/Config";

const Search = ({
  searchKeyword,
  setSearchKeyword,
  userId,
  setSearchResults,
  againLoad,
}) => {
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
    })();
  }, [searchKeyword, againLoad]);

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

  return (
    <ScrollView style={{ backgroundColor: COLORS.white, paddingBottom: 40 }}>
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
            source={require("../../../../assets/icons/search.png")}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
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
});
