import { Keyboard, StyleSheet, Text, View } from "react-native";
import React, { useState, useRef } from "react";
import { SafeAreaView } from "react-native";
import { COLORS } from "../../constants/theme";
import { ScrollView } from "react-native-gesture-handler";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { RecoverVerifyEmailRequest } from "../../apiRequests/OtpApiRequest";
import Toast from "react-native-toast-message";

const OtpSend = ({ navigation }) => {
  let [email, setEmail] = useState("");

  const VerifyOtpSave = async () => {
    if (!email) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Valid Email Address Required !",
      });
    } else {
      let result = await RecoverVerifyEmailRequest(email);
      if (result === true) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Verify E-mail Success.",
        });
        navigation.navigate("verifyOtp");
      }
    }
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      {/* <Loader visible={loading} /> */}

      <ScrollView
        contentContainerStyle={{
          paddingTop: 200,
          paddingHorizontal: 20,
          paddingBottom: 80,
        }}
      >
        <Text style={{ color: COLORS.black, fontSize: 30, fontWeight: "bold" }}>
          Email Address
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            value={email}
            onChangeText={(input) => setEmail(input)}
          />
          <Button title="Verify Email" onPress={VerifyOtpSave} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

         
export default OtpSend;

const styles = StyleSheet.create({});
