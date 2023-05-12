import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Students from "../screens/Students";
import Search from "../screens/Search";
import { COLORS } from "../constants/theme";
import Admin from "../screens/admin/Admin";
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import MakeAdmin from "../screens/admin/MakeAdmin";
import AdminAction from "../screens/admin/AdminAction";
const Tab = createBottomTabNavigator();

const AdminTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Admin"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.tertiary,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 15,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#fff",
          borderRadius: 15,
          height: 80,
          zIndex: 1,
          borderTopColor: "#fff",
          ...styles.shadow,
        },
        headerRight: () => <HeaderProfile />,
      }}
    >
      <Tab.Screen
        name="Admin"
        component={Admin}
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <MaterialCommunityIcons
                name="view-dashboard"
                color={color}
                size={size}
              />
              <Text
                style={{
                  color: focused ? COLORS.tertiary : "#748c94",
                }}
              >
                Dashboard
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Action"
        component={AdminAction}
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <FontAwesome5 name="user-edit" color={color} size={size} />
              <Text
                style={{
                  color: focused ? COLORS.tertiary : "#748c94",
                }}
              >
                Accept
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MakeAdmin"
        component={MakeAdmin}
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <MaterialIcons                name="admin-panel-settings"
                color={color}
                size={size}
              />
              <Text
                style={{
                  color: focused ? COLORS.tertiary : "#748c94",
                }}
              >
                Make Admin
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AdminTab;

const styles = StyleSheet.create({});
