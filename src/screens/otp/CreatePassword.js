import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { COLORS } from "../../constants/theme";
import { ScrollView } from "react-native-gesture-handler";
import Input from "../../components/Input";
import Button from "../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RecoverResetPassRequest } from "../../apiRequests/OtpApiRequest";
import Toast from "react-native-toast-message";

const CreatePassword = ({ navigation }) => {

  const [email, SetEmail] = useState("");
  const [otp, SetOtp] = useState("");
  const [password, SetPassword] = useState("");
  const ResetPass = async () => {
    const userEmail = await AsyncStorage.getItem("email");
    if (userEmail) {
      SetEmail(userEmail);
    }
    const userOtp =await AsyncStorage.getItem("otp");
    if (userOtp) {
      SetOtp(userOtp);
    }

    if (!password) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Password Required",
      });
    } else {
      let result = await RecoverResetPassRequest(email, otp, password);
      if (result === true) {
        Toast.show({
          type: "success",
          text1: "Success.",
          text2: "NEW PASSWORD CREATED",
        });
        navigation.navigate("Login");
      }
    }
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: 100,
          paddingHorizontal: 20,
          paddingBottom: 80,
        }}
      >
        <Text style={{ color: COLORS.black, fontSize: 30, fontWeight: "bold" }}>
          SET NEW PASSWORD
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            iconName="email-outline"
            label="Your email address"
            placeholder="Enter your email address"
            readOnly={true}
            value={email}
          />
          <Input
            iconName="lock-outline"
            label="New Password"
            placeholder="Enter your New password"
            onChangeText={(input) => SetPassword(input)}
          />
          <Button title="Save Password" onPress={ResetPass} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreatePassword;

const styles = StyleSheet.create({});
