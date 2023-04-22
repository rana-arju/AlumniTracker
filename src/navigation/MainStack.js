import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BottomTab from "./BottomTab";

const MainStack = (Stack) => {
  return <Stack.Screen name="bottom" component={BottomTab} />;
};

export default MainStack;

const styles = StyleSheet.create({});
