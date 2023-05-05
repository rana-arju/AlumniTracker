import { StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native";
import { COLORS } from "../../constants/theme";
import { ScrollView } from "react-native-gesture-handler";

import Button from "../../components/Button";
import CodeInput from "react-native-confirmation-code-input";
import { useState } from "react";
import { getEmail } from "./helper/SessionHelper";
import { RecoverVerifyOTPRequest } from "../../apiRequests/OtpApiRequest";

const VerifyOtp = ({navigation}) => {

  let [otp,SetOTP]=useState("")

  const SubmitOTP = async () => {
      if (otp.length === 6) {
          let result = await RecoverVerifyOTPRequest(getEmail(), otp)
          if (result === true) {
              navigation.navigate("CreatePassword");
          }
      } else {
          ErrorToast("Enter 6 Digit Code")
      }
  }

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: 200,
          paddingHorizontal: 20,
          paddingBottom: 80,
        }}
      >
        <Text style={{ color: COLORS.black, fontSize: 30, fontWeight: "bold" }}>
          Send OTP
        </Text>
        <View style={{ marginVertical: 20 }}>
          <CodeInput
            //  ref="codeInputRef2"
            secureTextEntry
            compareWithCode="AsDW2"
            activeColor="rgba(49, 180, 4, 1)"
            inactiveColor="rgba(49, 180, 4, 1.3)"
            autoFocus={true}
            ignoreCase={true}
            inputPosition="center"
            size={50}
             onFulfill={(isValid) => this._onFinishCheckingCode1(isValid)}
             containerStyle={{ marginTop: 30 }}
             codeInputStyle={{ borderWidth: 1.5 }}
            fields={6}
            onChange={(value)=>SetOTP(value)}
          />


          <Button title="Send OTP" onPress={SubmitOTP}/>
          <Text
            onPress={() => navigation.navigate("createPassword")}
            style={{
              color: COLORS.black,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 14,
              color: COLORS.gray,
            }}
          >
            create password
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerifyOtp;

const styles = StyleSheet.create({});
