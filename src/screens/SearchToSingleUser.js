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
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
const SearchToSingleUser = ({ route }) => {
  const { item } = route.params;
  console.log(item);
  const navigation = useNavigation();

  const handleLinkClick = () => {
    const number = item.whatsappNumber;
    const url = `whatsapp://send?phone=${number}&text=${encodeURIComponent(
      `Hello, ${item.name}. How are you?`
    )}`;

    Linking.openURL(url).catch((err) =>
      console.error("An error occurred:", err)
    );
  };
  const handleNavigate = () => {
    navigation.navigate('Search');
  };
  return (
    <View style={styles.aboutContainer}>
        <AntDesign style={{}} name="arrowleft" size={24} onPress={handleNavigate} color="black" />
      <View>
        <Image
          style={styles.imgStyle}
          source={{
            uri: item.image,
          }}
        />
      </View>
      <Text style={styles.mainHeader}> {item.name} </Text>
      {item.role == "student" && (
        <>
          <Text style={styles.paraStyle}>
            I am a {item.jobPosition ? item.jobPosition : "Student"}
          </Text>
        </>
      )}
      {item.role == "teacher" && (
        <>
          <Text
            style={[
              styles.paraStyle,
              { textAlign: "center", paddingHorizontal: 10 },
            ]}
          >
            I am a {item.position && item.position} of cox's bazar polytechnic
            institute.
          </Text>
        </>
      )}

      <View style={styles.aboutLayout}>
        <Text style={styles.aboutSubHeader}> About me </Text>

        {item.position && (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Feather name="check-circle" size={20} color={"#fff"} />
            <Text style={[styles.aboutPara]}>Position: {item.position}</Text>
          </View>
        )}
        {item.department && (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Feather name="check-circle" size={20} color={"#fff"} />
            <Text style={[styles.aboutPara]}>
              Department: {item.department}
            </Text>
          </View>
        )}

        {item.session && (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Feather name="check-circle" size={20} color={"#fff"} />
            <Text style={[styles.aboutPara]}>session: {item.session}</Text>
          </View>
        )}
        {item.jobPosition && (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Feather name="check-circle" size={20} color={"#fff"} />
            <Text style={[styles.aboutPara]}>Position: {item.jobPosition}</Text>
          </View>
        )}
        {item.jobLocation && (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Feather name="check-circle" size={20} color={"#fff"} />
            <Text style={[styles.aboutPara]}>
              Job Location: {item.jobLocation}
            </Text>
          </View>
        )}
      </View>

      <Text style={styles.mainHeader}> CONTACT INFO. </Text>

      <View style={styles.menuContainer}>
        {item.facebookLink && (
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() =>
              Linking.openURL(
                item.facebookLink
                  ? item.facebookLink
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
        {item.whatsappNumber && (
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
        {item.mobile && (
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => Linking.openURL(`tel:${item.mobile}`)}
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

export default SearchToSingleUser;

const styles = StyleSheet.create({
  aboutContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 50,
  },

  imgStyle: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  mainHeader: {
    fontSize: 22,
    color: COLORS.gray,
    textTransform: "uppercase",
    fontWeight: "500",
    marginTop: 20,
    marginBottom: 5,
    //   fontFamily: "JosefinSans_700Bold",
  },
  paraStyle: {
    fontSize: 18,
    color: "#7d7d7d",
    paddingBottom: 10,
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

// import { StyleSheet, Text, View, Image  } from 'react-native'

// const SearchToSingleUser = ({ route }) => {
//   const { item } = route.params;
//   console.log(item)
//   alert(item)

//   return (
//     <View style={styles.container}>
//       <Image
//         source={{
//         //   uri: item.profile_image,
//         }}
//         resizeMode="contain"
//         style={styles.logoImage}
//       />
//       <Text style={styles.name}>{item.name}</Text>
//       <Text style={styles.department}>{item.department}</Text>
//       <Text style={styles.email}>{item.email}</Text>
//       <Text style={styles.phone}>{item.phone}</Text>
//     </View>
//   );
// };

// export default SearchToSingleUser;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logoImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 10,
//   },
//   name: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   department: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   email: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   phone: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
// });
