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
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Positions } from "../../utils/data";
import { BASE_URL } from "../../helper/Config";

const Registration = () => {
  const navigation = useNavigation();
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [roleError, setRoleError] = useState(false);
  const [position, setPosition] = useState("");

  const [user, setUser] = useState({
    email: "",
    name: "",
    mobile: "",
    password: "",
    roll: "",
    registration: "",
    role: "",
    department: "",
    position: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let MobileRegex = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;
    Keyboard.dismiss();
    let isValid = true;
    if (!selectedRole) {
      Toast.show({
        type: "error",
        text1: "Select role",
        text2: "Select Any one role like: student or teacher",
      });
      isValid = false;
    }
    if (!user.email) {
      handleError("Please input email", "email");
      isValid = false;
    } else if (!user.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input a valid email", "email");
      isValid = false;
    }

    if (!user.name) {
      handleError("Please input name", "name");
      isValid = false;
    }

    if (selectedRole == "teacher") {
      if (!user.mobile) {
        handleError("Please input mobile number", "mobile");
        isValid = false;
      } else if (MobileRegex.test(user.mobile) == false) {
        handleError("Please valid mobile number", "mobile");
        isValid = false;
      }
    }
    if (selectedRole == "student") {
      if (!user.roll) {
        handleError("Please enter your roll number", "roll");
        isValid = false;
      }
      if (!user.registration) {
        handleError("Please enter your roll number", "registration");
        isValid = false;
      }
    }

    if (!user.password) {
      handleError("Please input password", "password");
      isValid = false;
    } else if (user.password.length < 8) {
      handleError("Min password length of 8", "password");
      isValid = false;
    } else if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
        user.password
      ) == false
    ) {
      handleError(
        "Enter strong password, mix capital, small, symbol",
        "password"
      );
      isValid = false;
    }
    if (isValid) {
      register();
    }
  };
  const register = async () => {
    setLoading(true);
    // setTimeout(async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${BASE_URL}/Registration`, user, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (data.message == "success") {
        setLoading(false);
        Toast.show({
          type: "success",
          text1: "Register Successful!",
          text2: "Continue your contribution 👋",
        });
        await AsyncStorage.setItem(
          "userData",
          JSON.stringify({ ...data, loggedIn: true })
        );
        navigation.navigate("editProfile");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      const message = error.response.data.message;
      Toast.show({
        type: "error",
        text1: "Error",
        text2: message,
      });
    }
    // }, 3000);
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
          Register
        </Text>
        <Text style={{ color: COLORS.gray, fontSize: 18, paddingVertical: 10 }}>
          Enter your details to register.
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={(text) => handleOnchange(text, "name")}
            onFocus={() => handleError(null, "name")}
            iconName="account-outline"
            label="Full Name"
            placeholder="Enter your full name"
            error={errors.name}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "email")}
            onFocus={() => handleError(null, "email")}
            iconName="email-outline"
            label="Email"
            autoCapitalize="none"
            placeholder="Enter your email address"
            error={errors.email}
            autoCorrect={false}
            autoCompleteType="email"
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
          <Text style={{ color: COLORS.gray, marginBottom: 5 }}>
            Select Role:
          </Text>
          <Picker
            selectedValue={selectedRole}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedRole(itemValue);
              handleOnchange(itemValue, "role");
            }}
            style={styles.selectInput}
          >
            <Picker.Item label="Select register role" value="" />
            <Picker.Item label="Student" value="student" />
            <Picker.Item label="Teacher" value="teacher" />
          </Picker>
          {selectedRole == "teacher" && (
            <>
              <Text style={{ color: COLORS.gray, marginBottom: 5 }}>
                Teacher Position:
              </Text>
              <Picker
                selectedValue={position}
                onValueChange={(itemValue, itemIndex) => {
                  setPosition(itemValue);
                  handleOnchange(itemValue, "position");
                }}
                style={styles.selectInput}
              >
                <Picker.Item label="Select teacher position" value="" />
                {Positions?.map((item, index) => (
                  <Picker.Item
                    label={item.value}
                    value={item.value}
                    key={index}
                  />
                ))}
              </Picker>
            </>
          )}

          {selectedRole == "student" ? (
            <>
              <Text style={{ color: COLORS.gray, marginBottom: 5 }}>
                Select Your Department:
              </Text>
              <Picker
                selectedValue={selectedDepartment}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedDepartment(itemValue);
                  handleOnchange(itemValue, "department");
                }}
                style={styles.selectInput}
              >
                <Picker.Item label="Select Your Department" value="" />
                <Picker.Item label="CMT" value="CMT" />
                <Picker.Item label="CT" value="CT" />
                <Picker.Item label="ET" value="ET" />
                <Picker.Item label="RAC" value="RAC" />
                <Picker.Item label="FT" value="FT" />
                <Picker.Item label="THM" value="THM" />
              </Picker>
              <Input
                keyboardType="numeric"
                onChangeText={(text) => handleOnchange(text, "roll")}
                onFocus={() => handleError(null, "roll")}
                iconName="format-list-numbered"
                label="Roll Number"
                placeholder="Enter your roll no"
                error={errors.roll}
              />
              <Input
                keyboardType="numeric"
                onChangeText={(text) => handleOnchange(text, "registration")}
                onFocus={() => handleError(null, "registration")}
                iconName="format-list-numbered"
                label="Registration Number"
                placeholder="Enter your Registration no"
                error={errors.registration}
              />
            </>
          ) : selectedRole == "teacher" ? (
            <Input
              keyboardType="numeric"
              onChangeText={(text) => handleOnchange(text, "mobile")}
              onFocus={() => handleError(null, "mobile")}
              iconName="phone-outline"
              label="Mobile Number"
              placeholder="Enter your Mobile no"
              error={errors.mobile}
            />
          ) : (
            ""
          )}
          {!selectedRole && (
            <Text style={{ marginTop: 7, color: COLORS.red, fontSize: 12 }}>
              Please select register role.
            </Text>
          )}

          <Button title="Register" onPress={validate} />
          <Text
            onPress={() => navigation.navigate("Login")}
            style={{
              color: COLORS.black,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 14,
              color: COLORS.gray,
            }}
          >
            Already have account ?Login
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Registration;

const styles = StyleSheet.create({
  selectInput: {
    borderWidth: 2,
    borderColor: COLORS.tertiary,
    borderRadius: 15,
    color: COLORS.tertiary,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
