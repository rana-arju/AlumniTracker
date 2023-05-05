import { Keyboard, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native";
import { COLORS } from "../../constants/theme";
import { ScrollView } from "react-native-gesture-handler";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { RecoverResetPassRequest } from "../../apiRequests/OtpApiRequest";
import { getEmail, getOTP } from "./helper/SessionHelper";


const CreatePassword = ({navigation}) => {
  let {PasswordRef,ConfirmPasswordRef}=useRef();


  const ResetPass =async () => {
      let Password = PasswordRef.value;
      let ConfirmPassword =  ConfirmPasswordRef.value;
      if(!Password){
          alert("Password Required")
      }
      else if(!ConfirmPassword){
          alert("Confirm Password Required")
      }
      else if(Password !== ConfirmPassword){
          alert("Password & Confirm Password Should be Same")
      }
      else{
          let result= await RecoverResetPassRequest(getEmail(),getOTP(),Password);
          if(result===true){
            navigation.navigate("login");
          }
      }
  }
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
            value={getEmail()}

          />

          <Input
            iconName="lock-outline"
            label="New Password"
            placeholder="Enter your new password"
            ref={(input)=>PasswordRef=input}

          />
          <Input
            iconName="lock-outline"
            label="Confirm Password"
            placeholder="Enter your confirm password"
            ref={(input)=>ConfirmPasswordRef=input}

          />
          <Button title="Save Password" onPress={ResetPass} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default CreatePassword

const styles = StyleSheet.create({})