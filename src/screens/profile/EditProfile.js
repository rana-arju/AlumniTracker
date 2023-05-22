import { Keyboard, RefreshControl, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { COLORS } from "../../constants/theme";
import { ScrollView } from "react-native-gesture-handler";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

import ProfileImage from "../../components/ProfileImage";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { Positions } from "../../utils/data";
import { BASE_URL } from "../otp/helper/Config";

const EditProfile = ({ navigation }) => {
  const [userId, setUserId] = useState("");
  const [storeUser, setStoreUser] = useState({});
  const [department, setDepartment] = useState("");
  const [session, setSession] = useState("");
  const [sessionYears, setSessionYears] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [gender, setGender] = useState("");
  const [imageURI, setImageURI] = useState("");
  const [position, setPosition] = useState("");

  // session generate
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const sessionStartYear = 2004;
    const sessionEndYear = currentYear;
    const years = [];
    for (let i = sessionStartYear; i < sessionEndYear; i++) {
      years.push(`${i}-${i + 1}`);
    }
    setSessionYears(years);
  }, []);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      let userData = await AsyncStorage.getItem("userData");
      if (userData) {
        userData = JSON.parse(userData);
        setUserId(userData);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong",
      });
    }
  };
  useEffect(() => {
    if (!userId) {
      return;
    }
    fetchData();
  }, [userId]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  }, []);

  const options = {
    method: "GET",
    url: `${BASE_URL}/GetSingleUser/${userId?.id}`,
    headers: {
      Authorization: `Bearer ${userId?.token}`,
      "Content-Type": "application/json",
    },
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.request(options);
      if (response) {
        setLoading(false);
        setStoreUser(response.data.user);
        setUser(response.data.user);
        setDepartment(response.data.user.department);
        setSession(response.data.user.session);
        setGender(response.data.user.gender);
        setImageURI(response.data.user.image);
      }
    } catch (error) {
      setLoading(false);
    } finally {
    }
  };

  useEffect(() => {
    if (!userId) {
      return;
    }
    fetchData();
  }, [userId]);
  const initial = {
    email: storeUser.email ? storeUser.email : userId?.email,
    name: storeUser.name ? storeUser.name : userId.name,
    mobile: storeUser.mobile ? storeUser.mobile : "",
    rollNumber: storeUser.singleUser ? storeUser.singleUser : "",
    registrationNumber: storeUser.registrationNumber
      ? storeUser.registrationNumber
      : "",
    fatherName: storeUser.fatherName ? storeUser.fatherName : "",
    motherName: storeUser.motherName ? storeUser.motherName : "",
    companyName: storeUser.companyName ? storeUser.companyName : "",
    jobLocation: storeUser.jobLocation ? storeUser.jobLocation : "",
    jobPosition: storeUser.jobPosition ? storeUser.jobPosition : "",
    session: storeUser.session ? storeUser.session : "",
    department: storeUser.department ? storeUser.department : "",
    position: storeUser.position ? storeUser.position : "",
    gender: storeUser.gender ? storeUser.gender : "",
    image: storeUser.image ? storeUser.image : "",
  };
  const [user, setUser] = useState(initial);
  const [errors, setErrors] = useState({});

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
    if (!user?.email) {
      handleError("Please input email", "email");
      isValid = false;
    }

    if (!user.name) {
      handleError("Please input name", "name");
      isValid = false;
    }

    // if (!user.mobile) {
    //   handleError("Please input mobile number", "mobile");
    //   isValid = false;
    // }

    if (isValid) {
      updateProfile();
    }
  };

  const updateProfile = async () => {
    setLoading(true);

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${BASE_URL}/UpdateUser/${userId?.id}`,
        user,
        {
          headers: {
            Authorization: `Bearer ${userId?.token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (data) {
        setLoading(false);
        setStoreUser(data);
        await AsyncStorage.setItem(
          "userData",
          JSON.stringify({
            name: data?.name,
            image: data?.image,
            email: data?.email,
            status: data?.status,
            role: data?.role,
            isAdmin: data?.isAdmin,
            department: data?.department,
            id: data?.id,
            loggedIn: true,
            token: userId?.token,
          })
        );
        Toast.show({
          type: "success",
          text1: "Profile update Successful!",
          text2: "Continue your contribution 👋",
        });
        navigation.navigate("Home");
      }
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong",
      });
    }
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
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ProfileImage
          imageURI={imageURI}
          setImageURI={setImageURI}
          setUser={setUser}
          user={user}
        />
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
          {user?.role == "student" && (
            <>
              <Input
                onChangeText={(text) => handleOnchange(text, "fatherName")}
                onFocus={() => handleError(null, "fatherName")}
                iconName="account-outline"
                label="Father Name"
                placeholder="Enter your father name"
                error={errors.fatherName}
                value={user.fatherName}
              />
              <Input
                onChangeText={(text) => handleOnchange(text, "motherName")}
                onFocus={() => handleError(null, "motherName")}
                iconName="account-outline"
                label="Mother Name"
                placeholder="Enter your mother name"
                error={errors.motherName}
                value={user.motherName}
              />
            </>
          )}

          <Input
            onChangeText={(text) => handleOnchange(text, "email")}
            onFocus={() => handleError(null, "email")}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
            value={user.email}
            editable={false}
            pointerEvents="none"
          />
          {user?.role == "student" && (
            <>
              <Input
                keyboardType="numeric"
                onChangeText={(text) => handleOnchange(text, "rollNumber")}
                onFocus={() => handleError(null, "rollNumber")}
                iconName="format-list-numbered"
                label="Roll Number"
                placeholder="Enter your roll no"
                error={errors.rollNumber}
                value={user.rollNumber}
              />
              <Input
                keyboardType="numeric"
                onChangeText={(text) =>
                  handleOnchange(text, "registrationNumber")
                }
                onFocus={() => handleError(null, "registrationNumber")}
                iconName="format-list-numbered"
                label="Register Number"
                placeholder="Enter your register no"
                error={errors.registrationNumber}
                value={user.registrationNumber}
              />
            </>
          )}

          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "mobile")}
            onFocus={() => handleError(null, "mobile")}
            iconName="phone-outline"
            label="Phone Number"
            placeholder="Enter your phone no"
            error={errors.mobile}
            value={user?.mobile}
          />
          <Text style={{ color: COLORS.gray, marginBottom: 5 }}>
            Select your gender:
          </Text>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue, itemIndex) => {
              setGender(itemValue);
              handleOnchange(itemValue, "gender");
            }}
            style={styles.selectInput}
          >
            <Picker.Item label="Select your Gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
          {user?.role == "teacher" && (
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

          {user?.role == "student" && (
            <>
              <Text style={{ color: COLORS.gray, marginBottom: 5 }}>
                Select your department:
              </Text>
              <Picker
                selectedValue={department}
                onValueChange={(itemValue, itemIndex) => {
                  setDepartment(itemValue);
                  handleOnchange(itemValue, "department");
                }}
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
                onValueChange={(itemValue, itemIndex) => {
                  setSession(itemValue);
                  handleOnchange(itemValue, "session");
                }}
                style={styles.selectInput}
              >
                <Picker.Item label="Select your Session" value="" />
                {sessionYears.map((year) => (
                  <Picker.Item label={year} value={year} key={year} />
                ))}
              </Picker>
              <Text
                style={{
                  fontSize: 18,
                  color: COLORS.gray,
                  fontStyle: "italic",
                }}
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
                value={user.companyName}
              />
              <Input
                onChangeText={(text) => handleOnchange(text, "jobPosition")}
                onFocus={() => handleError(null, "jobPosition")}
                iconName="briefcase"
                label="Job Position"
                placeholder="Enter your Job position"
                error={errors.jobPosition}
                value={user.jobPosition}
              />
              <Input
                onChangeText={(text) => handleOnchange(text, "jobLocation")}
                onFocus={() => handleError(null, "jobLocation")}
                iconName="location-outline"
                label="Job Location"
                placeholder="Enter your Job Location"
                error={errors.jobLocation}
                value={user.jobLocation}
                location
              />
            </>
          )}

          <Text
            style={{ fontSize: 18, color: COLORS.gray, fontStyle: "italic" }}
          >
            Contact Info:
          </Text>

          <Input
            onChangeText={(text) => handleOnchange(text, "whatsappNumber")}
            onFocus={() => handleError(null, "whatsappNumber")}
            iconName="whatsapp"
            label="WhatsApp Number with country code"
            placeholder="Your whatsApp number"
            error={errors.whatsappNumber}
            value={user.whatsappNumber}
          />
          <Text
            style={{ fontSize: 12, color: COLORS.gray, fontStyle: "italic" }}
          >
            WhatsApp number enter with country code like: +880
          </Text>

          <Input
            onChangeText={(text) => handleOnchange(text, "facebookLink")}
            onFocus={() => handleError(null, "facebookLink")}
            iconName="facebook"
            label="Facebook account URL"
            placeholder="Your facebook account link"
            error={errors.facebookLink}
            value={user.facebookLink}
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
