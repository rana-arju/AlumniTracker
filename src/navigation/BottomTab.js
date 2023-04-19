import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { COLORS } from "../constants/theme";
import Login from "../screens/profile/Login";
import AuthStack from "./AuthStack";
import Teachers from "../screens/Teachers";
import Students from "../screens/Students";
import Search from "../screens/Search";
import Home from "../screens/Home";
const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const [login, setLogin] = useState(true);

  return (
    <Tab.Navigator
      initialRouteName="Home"
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
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <MaterialCommunityIcons name="home" color={color} size={size} />
              <Text
                style={{
                  color: focused ? COLORS.tertiary : "#748c94",
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <AntDesign name="search1" color={color} size={size} />
              <Text
                style={{
                  color: focused ? COLORS.tertiary : "#748c94",
                }}
              >
                Search
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Students"
        component={Students}
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <FontAwesome5 name="user-graduate" color={color} size={size} />
              <Text
                style={{
                  color: focused ? COLORS.tertiary : "#748c94",
                }}
              >
                Students
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Teachers"
        component={Teachers}
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <FontAwesome5
                name="chalkboard-teacher"
                color={color}
                size={size}
              />

              <Text
                style={{
                  color: focused ? COLORS.tertiary : "#748c94",
                }}
              >
                Teacher
              </Text>
            </View>
          ),
        }}
      />
      {login ? (
        <Tab.Screen
          name="Account"
          component={AuthStack}
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
                  name="account-reactivate-outline"
                  color={color}
                  size={size}
                />
                <Text
                  style={{
                    color: focused ? COLORS.tertiary : "#748c94",
                  }}
                >
                  Profile
                </Text>
              </View>
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="Login"
          component={Login}
          options={{
            tabBarIcon: ({ color, focused, size }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 10,
                }}
              >
                <MaterialIcons name="login" color={color} size={size} />
                <Text
                  style={{
                    color: focused ? COLORS.tertiary : "#748c94",
                  }}
                >
                  Login
                </Text>
              </View>
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
