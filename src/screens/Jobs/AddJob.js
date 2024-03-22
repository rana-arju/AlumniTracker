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

    console.log(output.dateString);
    setDate(output.dateString);
  };

  const [employmentStatus, setEmploymentStatus] = useState("");

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [gender, setGender] = useState("");

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
  }, [userId]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
  }, [userId]);

  const [user, setUser] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (user) {
      if (!employmentStatus) {
        Toast.show({
          type: "error",
          text1: "Select Employment Status",
          text2: "Select Employment Status",
        });
        handleError("Select Employment Status", "employmentStatus");
        isValid = false;
      }
      if (!user.location) {
        handleError("Enter job location", "location");
        isValid = false;
      }
      if (!user.company) {
        handleError("Enter company", "company");
        isValid = false;
      }
      if (!user.vacancy) {
        handleError("Enter total vacancy", "vacancy");
        isValid = false;
      }
      if (!date) {
        handleError("Select deadline", "deadline");
        isValid = false;
      }
    }
    if (!user?.education) {
      handleError("Please input education", "education");
      isValid = false;
    }

    if (!user.position) {
      handleError("Please enter position", "position");
      isValid = false;
    }

    if (!user.salary) {
      handleError("Please input salary", "salary");
      isValid = false;
    }
    if (!user.requirements) {
      handleError("Please enter requirements", "requirements");
      isValid = false;
    }
    if (!user.jobContext) {
      handleError("Please enter job context", "jobContext");
      isValid = false;
    }
    if (!user.responsibilities) {
      handleError("Please enter responsibilities", "responsibilities");
      isValid = false;
    }
    if (isValid) {
      updateProfile();
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
