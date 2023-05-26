import { Button, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
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
import Admin from "../screens/admin/Admin";
import AdminTab from "./AdminTab";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Drawer = createDrawerNavigator();

const Routes = ({ route, navigation }) => {
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();

  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      if (userData) {
        userData = JSON.parse(userData);
        setUserData(userData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    authUser();
  }, []);
  const options = {
    method: "GET",
    url: `https://worrisome-lion-necklace.cyclic.app/api/v1/GetSingleUser/${userData?.id}`,
    headers: {
      Authorization: `Bearer ${userData?.token}`,
      "Content-Type": "application/json",
    },
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.request(options);
      if (data) {
        setLoading(false);
        setUser(data.user);
        await AsyncStorage.setItem(
          "userData",
          JSON.stringify({
            name: data?.user?.name,
            image: data?.user?.image,
            email: data?.user?.email,
            status: data?.user?.status,
            role: data?.user?.role,
            isAdmin: data?.user?.isAdmin,
            department: data?.user?.department,
            id: data?.user?.id,
            loggedIn: true,
            token: userData?.token,
          })
        );
      }
    } catch (error) {
      setLoading(false);
    } finally {
    }
  };
  useEffect(() => {
    if (!userData) {
      return;
    }
    fetchData();
  }, [userData]);
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
        name="MyProfile"
        component={MyProfile}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
          headerTitle: "My Profile",
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
      {user?.isAdmin && (
        <Drawer.Screen
          name="Dashboard"
          component={AdminTab}
          options={{
            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="view-dashboard"
                size={24}
                color={color}
              />
            ),
            headerTitleAlign: "center",
            headerRight: () => <HeaderProfile />,
          }}
        />
      )}
    </Drawer.Navigator>
  );
};

export default Routes;

const styles = StyleSheet.create({});
