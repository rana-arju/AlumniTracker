import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "./src/constants/theme";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import About from "./src/screens/About";
import Contact from "./src/screens/Contact";
import Students from "./src/screens/Students";
import Teachers from "./src/screens/Teachers";
import Menu from "./src/components/Menu";
import Home from "./src/screens/Home";
const Stack = createNativeStackNavigator();
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import Search from "./src/screens/Search";
import Account from "./src/screens/profile/Account";

const Tab = createBottomTabNavigator();
const EntryScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerTop}>
        <Image
          source={require("./assets/home.jpg")}
          style={styles.headerLogo}
          resizeMode="cover"
        />
        <Text style={styles.headerText}>Welcome to</Text>
        <Text style={[styles.headerText, { color: COLORS.tertiary }]}>
          Alumni Tracker
        </Text>
        <Text style={styles.headerDescription}>
          An alumnus or alumna is a former student and most often a graduate of
          an educational institution.
        </Text>
      </View>
    </View>
  );
};
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="EntryScreen"
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
            borderTopColor: "#fff",
            ...styles.shadow,
          },
        }}
      >
        <Tab.Screen
          name="EntryScreen"
          component={EntryScreen}
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
        <Tab.Screen
          name="Account"
          component={Account}
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
                  Account
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    paddingHorizontal: 20,
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  headerTop: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerLogo: {
    width: "100%",
    height: undefined,
    aspectRatio: 1.5,
    alignItems: "stretch",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  headerDescription: {
    fontSize: 16,
    textAlign: "left",
    color: COLORS.gray,
    marginTop: 30,
    paddingBottom: 50,
    lineHeight: 25,
  },
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
