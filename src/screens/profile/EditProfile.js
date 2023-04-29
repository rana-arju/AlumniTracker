import { Image, Keyboard, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { COLORS } from "../../constants/theme";
import { ScrollView } from "react-native-gesture-handler";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { Cloudinary } from "cloudinary-core";

import ProfileImage from "../../components/ProfileImage";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

const EditProfile = ({ navigation }) => {
  const [userId, setUserId] = useState("");
  const [storeUser, setStoreUser] = useState({});
  const [department, setDepartment] = useState("");
  const [session, setSession] = useState("");
  const [sessionYears, setSessionYears] = useState([]);
  const [loading, setLoading] = useState(false);

  // session generate
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const sessionStartYear = 2004;
    const sessionEndYear = currentYear;
    const years = [];
    for (let i = sessionStartYear; i <= sessionEndYear; i++) {
      years.push(`${i}-${i + 1}`);
    }
    setSessionYears(years);
  }, []);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      if (userData) {
        userData = JSON.parse(userData);
        setUserId(userData);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong",
      });
    }
  };
  const singleUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://alumni-tracker.onrender.com/api/v1/User/GetSingleUser/${userId.id}`,
        {
          headers: {
            Authorization: `Bearer ${userId.token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (data) {
        setLoading(false);
        setStoreUser(data);
        console.log("data",data);
        // setUser(data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    singleUser();
  }, []);
  const [errors, setErrors] = useState({});
  const initial = {
    email: storeUser.email || "",
    name: storeUser.name || "",
    mobile: storeUser.mobile || "",
    rollNumber: storeUser.singleUser || "",
    registrationNumber: storeUser.registrationNumber || "",
    fatherName: storeUser.fatherName || "",
    motherName: storeUser.motherName || "",
    companyName: storeUser.companyName || "",
    jobLocation: storeUser.jobLocation || "",
    jobPosition: storeUser.jobPosition || "",
    session: storeUser.session || "",
    department: storeUser.department || "",
  };

  const [user, setUser] = useState(initial);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!department) {
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

    if (department == "student" ? !user.mobile : "") {
      handleError("Please input mobile number", "mobile");
      isValid = false;
    }

    if (isValid) {
      updateProfile();
    }
  };

  const updateProfile = () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        setLoading(true);
        const { data } = await axios.post(
          `https://alumni-tracker.onrender.com/api/v1/Registration`,
          user,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        if (data.message == "success") {
          setLoading(false);

          await AsyncStorage.setItem("userData", JSON.stringify(user));
          navigation.navigate("Home");
          Toast.show({
            type: "success",
            text1: "Register Successful!",
            text2: "Continue your contribution 👋",
          });
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Something went wrong",
        });
      }
    }, 3000);
  };

  const handleOnchange = (text, input) => {
    setUser((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  console.log("userId", storeUser);

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />

      <ScrollView
        contentContainerStyle={{
          paddingTop: 50,
          paddingHorizontal: 20,
          paddingBottom: 80,
        }}
        showsVerticalScrollIndicator={false}
      >
        <ProfileImage />
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={(text) => handleOnchange(text, "name")}
            onFocus={() => handleError(null, "name")}
            iconName="account-outline"
            label="Full Name"
            value={user?.name}
            placeholder="Enter your full name"
            error={errors.name}
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
            value={user?.email}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />

          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "rollNumber")}
            onFocus={() => handleError(null, "rollNumber")}
            iconName="format-list-numbered"
            label="Roll Number"
            placeholder="Enter your roll no"
            error={errors.rollNumber}
          />
          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "registrationNumber")}
            onFocus={() => handleError(null, "registrationNumber")}
            iconName="format-list-numbered"
            label="Register Number"
            placeholder="Enter your register no"
            error={errors.registrationNumber}
          />

          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "mobile")}
            onFocus={() => handleError(null, "mobile")}
            iconName="phone-outline"
            label="Phone Number"
            placeholder="Enter your phone no"
            error={errors.mobile}
          />
          <Text style={{ color: COLORS.gray, marginBottom: 5 }}>
            Select your department:
          </Text>
          <Picker
            selectedValue={department}
            onValueChange={(itemValue, itemIndex) => setDepartment(itemValue)}
            style={styles.selectInput}
          >
            <Picker.Item label="Select your department" value="" />
            <Picker.Item label="CMT" value="CMT" />
            <Picker.Item label="CT" value="CT" />
            <Picker.Item label="ET" value="ET" />
            <Picker.Item label="RAC" value="RAC" />
            <Picker.Item label="FT" value="FT" />
            <Picker.Item label="THM" value="THM" />
          </Picker>
          <Text style={{ color: COLORS.gray, marginBottom: 5 }}>
            Select session:
          </Text>
          <Picker
            selectedValue={session}
            onValueChange={(itemValue, itemIndex) => setSession(itemValue)}
            style={styles.selectInput}
          >
            <Picker.Item label="Select your Session" value="" />
            {sessionYears.map((year) => (
              <Picker.Item label={year} value={year} key={year} />
            ))}
          </Picker>
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
