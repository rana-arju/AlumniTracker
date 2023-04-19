import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "./src/constants/theme";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyProfile from "./src/screens/profile/MyProfile";
import Contact from "./src/screens/Contact";
import Students from "./src/screens/Students";
import Teachers from "./src/screens/Teachers";
import Menu from "./src/components/Menu";
import Home from "./src/screens/Home";
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Search from "./src/screens/Search";
import Account from "./src/screens/profile/Account";
import AuthStack from "./src/navigation/AuthStack";
import { useState } from "react";
import Login from "./src/screens/profile/Login";
import BottomTab from "./src/navigation/BottomTab";


export default function App() {
  const [login, setLogin] = useState(true);
  return (
    <NavigationContainer>
    <BottomTab />
  
      {/* <AuthStack /> */}
    </NavigationContainer>
  );
}


