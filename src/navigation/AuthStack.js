import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "../screens/Home";
import MyProfile from "../screens/profile/MyProfile";
import Contact from "../screens/Contact";
import EditProfile from "../screens/profile/EditProfile";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";
import CustomDrawer from "./CustomDrawer";
import BottomTab from "./BottomTab";
import { View } from "react-native";

const Drawer = createDrawerNavigator();

const AuthStack = () => {
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

export default AuthStack;
