import {
  Keyboard,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import DatePicker from "react-native-neat-date-picker";

import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { Positions } from "../../utils/data";
import { BASE_URL } from "../../helper/Config";
import { COLORS } from "../../constants/theme";
import { Foundation } from "@expo/vector-icons";

const AddJob = ({ navigation }) => {
  const [userId, setUserId] = useState("");
  //   Date Picker
  const [showDatePickerSingle, setShowDatePickerSingle] = useState(false);
  const [date, setDate] = useState("");
  const openDatePickerSingle = () => setShowDatePickerSingle(true);

  const onCancelSingle = () => {
    // You should close the modal in here
    setShowDatePickerSingle(false);
  };
  const onConfirmSingle = (output) => {
    // You should close the modal in here
    setShowDatePickerSingle(false);

    // The parameter 'output' is an object containing date and dateString (for single mode).
    // For range mode, the output contains startDate, startDateString, endDate, and EndDateString
    console.log(output);
    setDate(output.dateString);
  };

  const [storeUser, setStoreUser] = useState({});
  const [employmentStatus, setEmploymentStatus] = useState("");
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
        setEmploymentStatus(response.data.user.department);
        setSession(response.data.user.session);
        setGender(response.data.user.gender);
        setImageURI(response.data.user.image);
        setPosition(response?.data?.user.position);
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
    education: storeUser.education ? storeUser.education : userId?.education,
    name: storeUser.name ? storeUser.name : userId.name,
    salary: storeUser.salary ? storeUser.salary : "",
    vacancy: storeUser.singleUser ? storeUser.singleUser : "",
    registrationNumber: storeUser.registrationNumber
      ? storeUser.registrationNumber
      : "",
    location: storeUser.location ? storeUser.location : "",
    company: storeUser.company ? storeUser.company : "",
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
    let salaryRegex = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;

    if (user.role == "student") {
      if (!employmentStatus) {
        Toast.show({
          type: "error",
          text1: "Select department",
          text2: "Select your department",
        });
        handleError("Select your department", "department");
        isValid = false;
      }
      if (!user.location) {
        handleError("Enter your father name", "location");
        isValid = false;
      }
      if (!user.company) {
        handleError("Enter your mother name", "company");
        isValid = false;
      }
      if (!user.vacancy) {
        handleError("Enter your roll number", "vacancy");
        isValid = false;
      }
      if (!user.registrationNumber) {
        handleError("Enter your registration number", "registrationNumber");
        isValid = false;
      }
      if (!session) {
        handleError("Select your session", "session");
        Toast.show({
          type: "error",
          text1: "Select session",
          text2: "Select your session",
        });
        isValid = false;
      }
    }
    if (!user?.education) {
      handleError("Please input education", "education");
      isValid = false;
    }

    if (!user.name) {
      handleError("Please input name", "name");
      isValid = false;
    }

    if (!user.salary) {
      handleError("Please input salary number", "salary");
      isValid = false;
    } else if (salaryRegex.test(user.salary) == false) {
      handleError("Please valid salary number", "salary");
      isValid = false;
    }
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
            education: data?.education,
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
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={(text) => handleOnchange(text, "position")}
            onFocus={() => handleError(null, "position")}
            iconName="briefcase-outline"
            label="Job Position"
            placeholder="Enter job position"
            error={errors.position}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "company")}
            onFocus={() => handleError(null, "company")}
            iconName="office-building"
            label="Company Name"
            placeholder="Enter company name"
            error={errors.company}
          />

          <Input
            onChangeText={(text) => handleOnchange(text, "location")}
            onFocus={() => handleError(null, "location")}
            iconName="office-building-marker"
            label="Job Location"
            placeholder="Enter job location"
            error={errors.location}
          />

          <Input
            onChangeText={(text) => handleOnchange(text, "education")}
            onFocus={() => handleError(null, "education")}
            iconName="book"
            label="Educational Qualification"
            placeholder="Required Education"
            error={errors.education}
          />

          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "vacancy")}
            onFocus={() => handleError(null, "vacancy")}
            iconName="format-list-numbered"
            label="Job vacancy"
            placeholder="Enter total vacancy"
            error={errors.vacancy}
            value={user.vacancy}
          />

          <TouchableOpacity
            onPress={openDatePickerSingle}
            style={{
              borderWidth: 1,
              borderColor: COLORS.tertiary,
              borderRadius: 10,
              padding: 10,
              fontSize: 14,
              color: COLORS.gray,
              flex: 1,
              gap: 8,
              flexDirection: "row",
              alignItems: "center",
              //   justifyContent:"space-between"
            }}
          >
            <Foundation name="calendar" color={COLORS.tertiary} size={20} />
            <Text style={{ color: COLORS.gray }}>
              {date ? date : "Application Deadline"}
            </Text>
          </TouchableOpacity>

          <DatePicker
            isVisible={showDatePickerSingle}
            mode={"single"}
            onCancel={onCancelSingle}
            onConfirm={onConfirmSingle}
          />

          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "salary")}
            onFocus={() => handleError(null, "salary")}
            iconName=""
            label="Total Salary"
            placeholder="Enter Salary"
            error={errors.salary}
            value={user?.salary}
          />
          <Text style={{ color: COLORS.gray, marginBottom: 5 }}>Job For:</Text>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue, itemIndex) => {
              setGender(itemValue);
              handleOnchange(itemValue, "gender");
            }}
            style={styles.selectInput}
          >
            <Picker.Item label="Job For?" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Both" value="both" />
          </Picker>

          <Text style={{ color: COLORS.gray, marginBottom: 5 }}>
            Select job status:
          </Text>
          <Picker
            selectedValue={employmentStatus}
            onValueChange={(itemValue, itemIndex) => {
              setEmploymentStatus(itemValue);
              handleOnchange(itemValue, "employmentStatus");
            }}
            style={styles.selectInput}
          >
            <Picker.Item label="Select Job Status" value="" />
            <Picker.Item label="Full Time" value="fullTime" />
            <Picker.Item label="Part Time" value="partTime" />
            <Picker.Item label="Remote" value="remote" />
            <Picker.Item label="Hybride" value="hybride" />
          </Picker>
          <View>
            <Text style={{ color: COLORS.gray, marginBottom: 5 }}>
              Requirements:
            </Text>
            <TextInput
              multiline={true}
              numberOfLines={6}
              onChangeText={(text) => handleOnchange(text, "requirements")}
              onFocus={() => handleError(null, "requirements")}
              placeholder="Enter requirements"
              style={{
                height: 200,
                textAlignVertical: "top",
                borderWidth: 1,
                borderColor: COLORS.tertiary,
                borderRadius: 10,
                padding: 5,
              }}
            />
          </View>
          <View>
            <Text style={{ color: COLORS.gray, marginBottom: 5 }}>
              Job Context:
            </Text>
            <TextInput
              multiline={true}
              numberOfLines={6}
              onChangeText={(text) => handleOnchange(text, "jobContext")}
              onFocus={() => handleError(null, "jobContext")}
              placeholder="Enter job context"
              style={{
                height: 200,
                textAlignVertical: "top",
                borderWidth: 1,
                borderColor: COLORS.tertiary,
                borderRadius: 10,
                padding: 5,
              }}
            />
          </View>
          <View>
            <Text style={{ color: COLORS.gray, marginBottom: 5 }}>
              Responsibilities:
            </Text>
            <TextInput
              multiline={true}
              numberOfLines={6}
              onChangeText={(text) => handleOnchange(text, "responsibilities")}
              onFocus={() => handleError(null, "responsibilities")}
              placeholder="Enter responsibilities"
              style={{
                height: 200,
                textAlignVertical: "top",
                borderWidth: 1,
                borderColor: COLORS.tertiary,
                borderRadius: 10,
                padding: 5,
              }}
            />
          </View>

          
          <Button title="JOB POST" onPress={validate} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddJob;

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
