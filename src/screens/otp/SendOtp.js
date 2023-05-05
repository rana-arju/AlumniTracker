import { Keyboard, StyleSheet, Text, View } from "react-native";
import React, { useState, useRef } from "react";
import { SafeAreaView } from "react-native";
import { COLORS } from "../../constants/theme";
import { ScrollView } from "react-native-gesture-handler";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { RecoverVerifyEmailRequest } from "../../apiRequests/OtpApiRequest";
import axios from "axios";
const SendOtp = ({ navigation }) => {
  let [email, setEmail] = useState("sariothossain1011@gmail.com");


  const VerifyOtpSave = async () => {
    if (!email) {
      alert("Valid Email Address Required !");
    } else {
      let result = await RecoverVerifyEmailRequest(email);
      alert(result+"123")
      if (result === true) {
        // alert("success")
        navigation.navigate("sendOtp");
      }else{
        alert("fail")
        
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
          <Text
            onPress={() => navigation.navigate("verifyOtp")}
            style={{
              color: COLORS.black,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 14,
              color: COLORS.gray,
            }}
          >
            Verify Otp
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SendOtp;

const styles = StyleSheet.create({});
