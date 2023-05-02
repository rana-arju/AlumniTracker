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
import { useCallback, useEffect, useState } from "react";
import Login from "./src/screens/profile/Login";
import BottomTab from "./src/navigation/BottomTab";
import Toast from "react-native-toast-message";
import Loader from "./src/components/Loader";
import Registration from "./src/screens/profile/Registration";
import Routes from "./src/navigation/Routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import StudentDetails from "./src/screens/StudentDetails";
import AllStudents from "./src/screens/AllStudents";
import EditProfile from "./src/screens/profile/EditProfile";

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRouteName, setInitialRouteName] = useState("");

  useEffect(() => {
    authUser();
  }, [initialRouteName]);

  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem("userData");
console.log("userData", userData);
      if (userData) {
        userData = JSON.parse(userData);
        if (userData.loggedIn) {
          setInitialRouteName("Home");
        } else {
          setInitialRouteName("Login");
        }
      } else {
        setInitialRouteName("Login");
      }
    } catch (error) {
      setInitialRouteName("Login");
    }
  };

  return (
    <NavigationContainer>
      {!initialRouteName ? (
        <Loader visible={true} />
      ) : (
        <>
          <Stack.Navigator
            initialRouteName={initialRouteName}
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Registration" component={Registration} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Routes} />
            {/* studentDetails Screen  */}
            <Stack.Screen
              name="studentDetails"
              component={StudentDetails}
              options={{
                headerTitleStyle: {
                  fontSize: 25,
                },
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="allStudent"
              component={AllStudents}
              options={{
                headerTitleStyle: {
                  fontSize: 25,
                },
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="editProfile"
              component={EditProfile}
              options={{
                headerTitleStyle: {
                  fontSize: 25,
                },
                headerTitleAlign: "center",
              }}
            />
          </Stack.Navigator>
        </>
      )}
      <Toast />
    </NavigationContainer>
  );
}
