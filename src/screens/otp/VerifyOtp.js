import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native";
import { COLORS } from "../../constants/theme";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../components/Button";
import CodeInput from "react-native-confirmation-code-input";
import { useState } from "react";

import Toast from "react-native-toast-message";
import { RecoverVerifyOTPRequest } from "../../apiRequests/OtpApiRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";


const VerifyOtp = ({ navigation }) => {
  const [otp, setOTP] = useState("");
  const [email, SetEmail] = useState("");
  const SubmitOTP = async () => {
    const userEmail = await AsyncStorage.getItem("email");
    if (userEmail) {
      SetEmail(userEmail);
    }
    if (!(otp.length === 5)) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Enter 5 Digit Code",
      });
    } else {
      let result = await RecoverVerifyOTPRequest(email, otp);
      if (result === true) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Verify E-mail Success.",
        });
        navigation.navigate("createPassword");
      }
    }
  };

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
            compareWithCode=""
            activeColor="orange"
            inactiveColor="orange"
            autoFocus={false}
            ignoreCase={false}
            inputPosition="center"
            size={50}
            codeLength={5}
            onFulfill={(input) => setOTP(input)}
            containerStyle={{ marginTop: 30 }}
            codeInputStyle={{ borderWidth: 1.5 }}
            clearTextOnFocus={false}
          />
          <Button title="Send OTP" onPress={SubmitOTP} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerifyOtp;

const styles = StyleSheet.create({});
