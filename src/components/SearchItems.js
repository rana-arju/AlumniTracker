import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SearchItems = ({ item }) => {
  return (
    <View>
      <Text>{item.name}</Text>
    </View>
  );
};

export default SearchItems;

const styles = StyleSheet.create({});
