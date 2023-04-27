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

const Registration = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = useState("");
  const [roleError, setRoleError] = useState(false);

  const [inputs, setInputs] = useState({
    email: "",
    fullname: "",
    phone: "",
    password: "",
    roll: "",
    register: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
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
    if (!inputs.email) {
      handleError("Please input email", "email");
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input a valid email", "email");
      isValid = false;
    }

    if (!inputs.fullname) {
      handleError("Please input fullname", "fullname");
      isValid = false;
    }

    if (selectedRole == "student" ? !inputs.phone : "") {
      handleError("Please input phone number", "phone");
      isValid = false;
    }

    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError("Min password length of 5", "password");
      isValid = false;
    }

    if (isValid) {
      register();
    }
  };
  const register = () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        setLoading(false);
        Toast.show({
          type: "success",
          text1: "Register Successful!",
          text2: "Continue your contribution 👋",
        });
        await AsyncStorage.setItem("userData", JSON.stringify(inputs));
        navigation.navigate("Edit Profile");
      } catch (error) {
        Alert.alert("Error", "");
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Something went wrong",
        });
      }
    }, 3000);
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
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
            onChangeText={(text) => handleOnchange(text, "fullname")}
            onFocus={() => handleError(null, "fullname")}
            iconName="account-outline"
            label="Full Name"
            placeholder="Enter your full name"
            error={errors.fullname}
          />
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
          <Text style={{ color: COLORS.gray, marginBottom: 5 }}>
            Select Role:
          </Text>
          <Picker
            selectedValue={selectedRole}
            onValueChange={(itemValue, itemIndex) => setSelectedRole(itemValue)}
            style={styles.selectInput}
          >
            <Picker.Item label="Select register role" value="" />
            <Picker.Item label="Student" value="student" />
            <Picker.Item label="Teacher" value="teacher" />
          </Picker>
          {selectedRole == "student" ? (
            <>
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
                onChangeText={(text) => handleOnchange(text, "register")}
                onFocus={() => handleError(null, "register")}
                iconName="format-list-numbered"
                label="Register Number"
                placeholder="Enter your register no"
                error={errors.roll}
              />
            </>
          ) : selectedRole == "teacher" ? (
            <Input
              keyboardType="numeric"
              onChangeText={(text) => handleOnchange(text, "phone")}
              onFocus={() => handleError(null, "phone")}
              iconName="phone-outline"
              label="Phone Number"
              placeholder="Enter your phone no"
              error={errors.phone}
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
