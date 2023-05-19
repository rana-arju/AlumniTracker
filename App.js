import "react-native-gesture-handler";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Search from "./src/screens/Search";
import { useCallback, useEffect, useState } from "react";
import Login from "./src/screens/profile/Login";
import Toast from "react-native-toast-message";
import Loader from "./src/components/Loader";
import Registration from "./src/screens/profile/Registration";
import Routes from "./src/navigation/Routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StudentDetails from "./src/screens/StudentDetails";
import AllStudents from "./src/screens/AllStudents";
import EditProfile from "./src/screens/profile/EditProfile";
import OtpVerify from "./src/screens/otp/OtpVerify";
import CreatePassword from "./src/screens/otp/CreatePassword";
import OtpSend from "./src/screens/otp/OtpSend";
import SearchToSingleUser from "./src/screens/SearchToSingleUser";

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRouteName, setInitialRouteName] = useState("");

  useEffect(() => {
    authUser();
  }, [initialRouteName]);

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
            <Stack.Screen name="sendOtp" component={OtpSend} />
            <Stack.Screen name="verifyOtp" component={OtpVerify} />
            <Stack.Screen name="createPassword" component={CreatePassword} />
            {/* studentDetails Screen  */}
            <Stack.Screen name="Search" component={Search} />
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
              name="UserDetails"
              component={SearchToSingleUser}
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
      <Toast visibilityTime={2000} />
    </NavigationContainer>
  );
}
