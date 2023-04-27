import { Image, Keyboard, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { COLORS } from "../../constants/theme";
import { ScrollView } from "react-native-gesture-handler";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

import ProfileImage from "../../components/ProfileImage";

const EditProfile = ({ navigation }) => {
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
        showsVerticalScrollIndicator = {false}
      >
        {/* <Button title="Pick Image" onPress={pickImage} /> */}
        <ProfileImage />
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
            onChangeText={(text) => handleOnchange(text, "fatherName")}
            onFocus={() => handleError(null, "fatherName")}
            iconName="account-outline"
            label="Father Name"
            placeholder="Enter your father name"
            error={errors.fatherName}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "motherName")}
            onFocus={() => handleError(null, "motherName")}
            iconName="account-outline"
            label="Mother Name"
            placeholder="Enter your mother name"
            error={errors.motherName}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "email")}
            onFocus={() => handleError(null, "email")}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />
          {/* <Input
            onChangeText={(text) => handleOnchange(text, "password")}
            onFocus={() => handleError(null, "password")}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />
       */}

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

          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "phone")}
            onFocus={() => handleError(null, "phone")}
            iconName="phone-outline"
            label="Phone Number"
            placeholder="Enter your phone no"
            error={errors.phone}
          />
          <Text
            style={{ fontSize: 18, color: COLORS.gray, fontStyle: "italic" }}
          >
            Current Job Details:
          </Text>
          <Input
            onChangeText={(text) => handleOnchange(text, "companyName")}
            onFocus={() => handleError(null, "companyName")}
            iconName="office-building"
            label="Company Name"
            placeholder="Enter your company name"
            error={errors.companyName}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "jobPosition")}
            onFocus={() => handleError(null, "jobPosition")}
            iconName="briefcase"
            label="Job Position"
            placeholder="Enter your Job position"
            error={errors.jobPosition}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "jobLocation")}
            onFocus={() => handleError(null, "jobLocation")}
            iconName="location-outline"
            label="Job Location"
            placeholder="Enter your Job Location"
            error={errors.jobLocation}
            location
          />
          <Button title="Save" onPress={validate} />
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

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
