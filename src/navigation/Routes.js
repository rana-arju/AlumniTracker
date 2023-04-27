import { Button, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTab from "./BottomTab";
import MyProfile from "../screens/profile/MyProfile";
import CustomDrawer from "./CustomDrawer";
import EditProfile from "../screens/profile/EditProfile";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { COLORS } from "../constants/theme";
import HeaderProfile from "../components/HeaderProfile";
const Drawer = createDrawerNavigator();

const Routes = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: true,
        drawerActiveBackgroundColor: COLORS.tertiary,
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#333",

        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen
        name="Home Page"
        component={BottomTab}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="home" size={22} color={color} />
          ),
          headerTitleAlign: "center",
          headerRight: () => <HeaderProfile />,
          headerTitle: "Alumni",
        }}
      />
      <Drawer.Screen
        name="My Profile"
        component={MyProfile}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Edit Profile"
        component={EditProfile}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-edit-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default Routes;

const styles = StyleSheet.create({});
