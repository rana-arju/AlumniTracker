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
import { useEffect, useState } from "react";
import Login from "./src/screens/profile/Login";
import BottomTab from "./src/navigation/BottomTab";
import Toast from "react-native-toast-message";
import Loader from "./src/components/Loader";
import Registration from "./src/screens/profile/Registration";
import Routes from "./src/navigation/Routes";

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRouteName, setInitialRouteName] = useState("");

  useEffect(() => {
    setTimeout(() => {
      authUser();
    }, 2000);
  }, []);

  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      if (userData) {
        userData = JSON.parse(userData);
        if (userData.loggedIn) {
          setInitialRouteName("Home");
        } else {
          setInitialRouteName("Login");
        }
      } else {
        setInitialRouteName("Registration");
      }
    } catch (error) {
      setInitialRouteName("Registration");
    }
  };
  return (
    <>
        {!initialRouteName ? (
          <Loader visible={true} />
        ) : (
          <>
            {/* <Stack.Navigator
              initialRouteName={initialRouteName}
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen
                name="Registration"
                component={Registration}
              />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
            <Stack.Screen name="Registration" component={<Registration />} /> */}
        
          {/* <Routes /> */}
          </>
        )}
      <Toast />
    </>
  );
}
