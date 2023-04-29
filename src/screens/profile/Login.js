import { Keyboard, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { COLORS } from "../../constants/theme";
import { ScrollView } from "react-native-gesture-handler";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const Login = ({ navigation }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!user.email) {
      handleError("Please input email", "email");
      isValid = false;
    }

    if (!user.password) {
      handleError("Please input password", "password");
      isValid = false;
    }

    if (isValid) {
      login();
    }
  };
  const login = async () => {
    setLoading(true);
    let userData = await AsyncStorage.getItem("userData");
    if (userData) {
      userData = JSON.parse(userData);
      if (user.email == userData.email && user.password == userData.password) {
        setLoading(true);

        const { data } = await axios.post(
          `https://alumni-tracker.onrender.com/api/v1/Login`,
          user,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        setLoading(false);
        await AsyncStorage.setItem(
          "userData",
          JSON.stringify({ ...data, loggedIn: true })
        );
        navigation.navigate("Home");

        Toast.show({
          type: "success",
          text1: "Login Successful.",
          text2: "Welcome to our app",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Invalid Details",
        });
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "User does not exist",
      });
    }
  };

  const handleOnchange = (text, input) => {
    setUser((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />

      <ScrollView
        contentContainerStyle={{
          paddingTop: 50,
          paddingHorizontal: 20,
          paddingBottom: 80,
        }}
      >
        <Text style={{ color: COLORS.black, fontSize: 30, fontWeight: "bold" }}>
          Login
        </Text>
        <Text style={{ color: COLORS.gray, fontSize: 18, paddingVertical: 10 }}>
          Enter your details to Login.
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={(text) => handleOnchange(text, "email")}
            onFocus={() => handleError(null, "email")}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />

          <Input
            onChangeText={(text) => handleOnchange(text, "password")}
            onFocus={() => handleError(null, "password")}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />
          <Button title="Login" onPress={validate} />
          <Text
            onPress={() => navigation.navigate("Registration")}
            style={{
              color: COLORS.black,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 14,
              color: COLORS.gray,
            }}
          >
            Don't have account ?Register
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
