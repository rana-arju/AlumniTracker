import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import data from "../../data.json";
import { COLORS } from "../constants/theme";
import phone from "../../assets/icons/smartphone.png";
import { Feather } from "@expo/vector-icons";
import Loader from "../components/Loader";
import axios from "axios";
const StudentDetails = ({ navigation, route }) => {
  const { id, token } = route.params;
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://worrisome-lion-necklace.cyclic.app/api/v1/GetSingleUser/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data.user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      alert("There is an error!");
    } finally {
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  const handleLinkClick = () => {
    const number = data?.whatsappNumber;
    const url = `whatsapp://send?phone=${number}&text=${encodeURIComponent(
      `Hello, ${data?.name}. How are you?`
    )}`;

    Linking.openURL(url).catch((err) =>
      console.error("An error occurred:", err)
    );
  };
  return (
    <View style={styles.aboutContainer}>
      <Loader visible={isLoading} />

      <Text style={styles.mainHeader}> {data?.name} </Text>
      {data?.role == "student" && (
        <>
          <Text style={styles.paraStyle}>
            I am a {data?.jobPosition ? data?.jobPosition : "Student"}
          </Text>
        </>
      )}
      {data?.role == "teacher" && (
        <>
          <Text
            style={[
              styles.paraStyle,
              { textAlign: "center", paddingHorizontal: 10 },
            ]}
          >
            I am a {data?.position && data?.position} of cox's bazar polytechnic
            institute.
          </Text>
        </>
      )}

      <View>
        <Image
          style={styles.imgStyle}
          source={{
            uri: data?.image,
          }}
        />
      </View>

      <View style={styles.aboutLayout}>
        <Text style={styles.aboutSubHeader}> About me </Text>

        {data?.position && (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Feather name="check-circle" size={20} color={"#fff"} />
            <Text style={[styles.aboutPara]}>Position: {data?.position}</Text>
          </View>
        )}
        {data?.department && (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Feather name="check-circle" size={20} color={"#fff"} />
            <Text style={[styles.aboutPara]}>
              Department: {data?.department}
            </Text>
          </View>
        )}

        {data?.session && (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Feather name="check-circle" size={20} color={"#fff"} />
            <Text style={[styles.aboutPara]}>session: {data?.session}</Text>
          </View>
        )}
        {data.jobPosition && (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Feather name="check-circle" size={20} color={"#fff"} />
            <Text style={[styles.aboutPara]}>Position: {data.jobPosition}</Text>
          </View>
        )}
        {data?.jobLocation && (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Feather name="check-circle" size={20} color={"#fff"} />
            <Text style={[styles.aboutPara]}>
              Job Location: {data.jobLocation}
            </Text>
          </View>
        )}
      </View>

      <Text style={styles.mainHeader}> CONTACT INFO. </Text>

      <View style={styles.menuContainer}>
        {data?.facebookLink && (
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() =>
              Linking.openURL(
                data?.facebookLink
                  ? data?.facebookLink
                  : "https://www.facebook.com"
              )
            }
          >
            <Image
              style={styles.iconStyle}
              source={require("../../assets/icons/facebook.png")}
            />
          </TouchableOpacity>
        )}
        {data?.whatsappNumber && (
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={handleLinkClick}
          >
            <Image
              style={styles.iconStyle}
              source={require("../../assets/icons/whatsapp.png")}
            />
          </TouchableOpacity>
        )}
        {data.mobile && (
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => Linking.openURL(`tel:${data.mobile}`)}
          >
            <Image
              style={styles.iconStyle}
              source={require("../../assets/icons/smartphone.png")}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  aboutContainer: {
    display: "flex",
    alignItems: "center",
  },

  imgStyle: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  mainHeader: {
    fontSize: 18,
    color: COLORS.gray,
    textTransform: "uppercase",
    fontWeight: "500",
    marginTop: 50,
    marginBottom: 10,
    // fontFamily: "JosefinSans_700Bold",
  },
  paraStyle: {
    fontSize: 18,
    color: "#7d7d7d",
    paddingBottom: 30,
  },
  aboutLayout: {
    backgroundColor: COLORS.tertiary,
    paddingHorizontal: 30,
    marginVertical: 30,
    width: "100%",
    paddingBottom: 20,
    textAlign: "left",
  },
  aboutSubHeader: {
    fontSize: 18,
    color: COLORS.white,
    textTransform: "uppercase",
    fontWeight: "500",
    marginVertical: 15,
    // fontFamily: "JosefinSans_700Bold",
    alignSelf: "center",
  },
  aboutPara: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },
  menuContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  iconStyle: {
    width: 32,
    height: 32,
    aspectRatio: 1,
  },
});

export default StudentDetails;
