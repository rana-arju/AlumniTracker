import { Image, Linking, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { COLORS } from "../../constants/theme";
import { SHADOWS } from "../../constants/theme";
import { SIZES } from "../../constants/theme";
import Button from "../../components/Button";
import axios from "axios";
import Toast from "react-native-toast-message";
import Loader from "../../components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const MyProfile = ({ navigation }) => {
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

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
    singleUser();
  }, []);
  const singleUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://alumni-tracker-backend-api.vercel.app/api/v1/User/GetSingleUser/${userId.id}`,
        {
          headers: {
            Authorization: `Bearer ${userId.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (data) {
        setLoading(false);
        setUser(data);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleLinkClick = () => {
    const number = "+8801881220413";
    const url = `whatsapp://send?phone=${number}&text=${encodeURIComponent(
      `Hello, ${user?.name}. How are you?`
    )}`;

    Linking.openURL(url).catch((err) =>
      console.error("An error occurred:", err)
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Loader visible={loading} />

      <View style={{ marginBottom: 20 }}>
        <View style={styles.profile_img_area}>
          <Image
            source={{ uri: user?.image }}
            resizeMode="contain"
            style={styles.profile_img}
          />
          <Text
            style={{ fontSize: 25, fontWeight: "bold", color: COLORS.white }}
          >
            {user?.name}
          </Text>
          {user?.jobPosition && (
            <Text style={{ fontSize: 16, color: COLORS.white }}>
              Profession:
              <Text style={{ color: COLORS.white }}>
                {user?.jobPosition && user?.jobPosition} at
                <Text style={{ fontWeight: "bold" }}>{user?.companyName}</Text>
              </Text>
            </Text>
          )}
        </View>
        <View style={{ padding: 10 }}>
          <View style={styles.infoCard}>
            <Text style={{ fontSize: 16 }}>Registration as a :</Text>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.gray,
                textTransform: "capitalize",
              }}
            >
              {user?.role}
            </Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={{ fontSize: 16 }}>Email:</Text>
            <Text style={{ fontSize: 16, color: COLORS.gray }}>
              {user?.email}
            </Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={{ fontSize: 16 }}>Phone:</Text>
            <Text style={{ fontSize: 16, color: COLORS.gray }}>
              {user?.mobile}
            </Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={{ fontSize: 16 }}>Gender:</Text>
            <Text style={{ fontSize: 16, color: COLORS.gray }}>
              {user?.gender}
            </Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={{ fontSize: 16 }}>Department:</Text>
            <Text style={{ fontSize: 16, color: COLORS.gray }}>
              {user?.department}
            </Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={{ fontSize: 16 }}>Session:</Text>
            <Text style={{ fontSize: 16, color: COLORS.gray }}>
              {user?.session}
            </Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={{ fontSize: 16 }}>Roll:</Text>
            <Text style={{ fontSize: 16, color: COLORS.gray }}>
              {user?.rollNumber}
            </Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={{ fontSize: 16 }}>Registration:</Text>
            <Text style={{ fontSize: 16, color: COLORS.gray }}>
              {user?.registrationNumber}
            </Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={{ fontSize: 16 }}>Father Name:</Text>
            <Text style={{ fontSize: 16, color: COLORS.gray }}>
              {user?.fatherName}
            </Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={{ fontSize: 16 }}>Mother Name:</Text>
            <Text style={{ fontSize: 16, color: COLORS.gray }}>
              {user?.motherName}
            </Text>
          </View>
          <Text style={{ color: COLORS.gray, marginBottom: 5 }}>
            Contact info:
          </Text>
          <View style={styles.infoCard}>
            <Text style={{ fontSize: 16 }}>WhatsApp:</Text>
            <MaterialCommunityIcons
              name="whatsapp"
              size={30}
              color="#25D366"
              onPress={handleLinkClick}
            />
          </View>
          <View style={styles.infoCard}>
            <Text style={{ fontSize: 16 }}>Facebook:</Text>
            <MaterialCommunityIcons
              name="facebook"
              size={30}
              color="#0165E1"
              onPress={() =>
                Linking.openURL(
                  user?.facebookLink
                    ? user?.facebookLink
                    : "https://www.facebook.com"
                )
              }
            />
            {/* <Text style={{ fontSize: 16, color: COLORS.gray }}>
              {user?.facebookLink}
            </Text> */}
          </View>
          {/* <View style={styles.infoCard}>
            <Text style={{ fontSize: 16 }}>Qualification:</Text>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.gray,
                width: "80%",
                textAlign: "center",
              }}
            >
              Diploma in Computer engineering
            </Text>
          </View> */}
          <Button
            title="Edit Profile"
            onPress={() => navigation.navigate("Edit Profile")}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  profile_img_area: {
    height: 180,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.tertiary,
    padding: 20,
  },
  profile_img: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  infoCard: {
    padding: SIZES.large,
    margin: 5,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    ...SHADOWS.small,
  },
});
