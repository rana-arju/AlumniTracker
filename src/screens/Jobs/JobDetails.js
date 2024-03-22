import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants/theme";
import Loader from "../../components/Loader";
import { BASE_URL } from "../../helper/Config";
import Button from "../../components/Button";
const data = {
  _id: 1,
  position: "Software Engineer (Full Stack Developer)",
  company: "Mercury IT International Limited",
  deadline: "13 Apr 2024",
  vacancy: 10,
  gender: "Male",
  location: "cox's Bazar",
  salary: 3400,
  author: { name: "Rana Arju" },
  education: "Bachelor of Science (BSc) in Computer Science & Engineering",
  experience:
    "At least 2 years The applicants should have experience in the following business area Software Company",
  requirements:
    "Experience in creating applications using ASP.NET. Proficiency in using MVC. Great understanding of APIs and Web Services.",
  jobContext:
    "Mercury IT International Limited (formerly Jaxara IT) is a USA-based software company, a sister concern of Veradigm (https://veradigm.com). We specialize in developing cloud-based, data-intensive solutions tailored for the US healthcare market. As a Software Engineer, you will join a dynamic development team dedicated to designing, developing, and implementing database solutions that support the company’s diverse and evolving data requirements.",
  responsibilities: [
    "Collaborate with subject matter experts and data architects to analyze and understand business requirements.",
    "Develop tools using .NET technology, adhering to the best patterns and practices.",
  ],
  employmentStatus: "Full Time",
  age: "18-20"
};
const JobDetails = ({ navigation, route }) => {
  const { id, token, isAdmin } = route.params;
  //   const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `${BASE_URL}/GetSingleUser/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.request(options);
  //       setData(response.data.user);
  //       setLoading(false);
  //     } catch (error) {
  //       setLoading(false);
  //       setError(error);
  //       alert("There is an error!");
  //     } finally {
  //     }
  //   };

  //   useEffect(() => {
  //     fetchData();
  //   }, [id]);
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
    <ScrollView style={styles.aboutContainer}>
      <Loader visible={isLoading} />
      <Text style={styles.mainHeader}> {data?.company} </Text>
      <Text style={{ color: COLORS.tertiary, paddingLeft: 5, paddingRight: 5 }}>
        {data?.position}
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.infoContainer}>
          <Text>
            <AntDesign name="calendar" size={14} color={COLORS.black} />
            <Text> </Text>

            <Text style={{ color: COLORS.gray, fontSize: SIZES.small }}>
              Deadline:
            </Text>
          </Text>

          <Text style={{ color: COLORS.gray }}>{data.deadline}</Text>
        </Text>
        <Text style={styles.infoContainer}>
          <Text>
            <FontAwesome name="briefcase" size={14} color={COLORS.black} />
            <Text> </Text>

            <Text style={{ color: COLORS.gray, fontSize: SIZES.small }}>
              salary:
            </Text>
          </Text>

          <Text style={{ color: COLORS.gray, textTransform: "capitalize" }}>
            {data.salary ? data.salary + "৳" : "Negotiable"}
          </Text>
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          // alignItems: "center",
          justifyContent: "flex-start",
          gap: 10,
          marginBottom: 30,
        }}
      >
        {/* <TouchableOpacity>
          {data?.author?.photo ? (
            <Image
              source={{
                uri: data.author.photo,
              }}
              resizeMode="contain"
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Image
              source={require("../../../assets/images/user-profile.png")}
              resizeMode="contain"
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </TouchableOpacity> */}
        <Text style={{ color: COLORS.gray }}>
          Post by -{" "}
          <Text style={{ fontStyle: "italic" }}>{data.author.name}</Text>
        </Text>
      </View>

      <View style={styles.aboutLayout}>
        <Text style={styles.aboutSubHeader}> All Details </Text>

        <View style={{ flexDirection: "row", gap: 5 }}>
          <Feather name="check-circle" size={18} color={"#fff"} />
          <Text style={[styles.aboutPara]}>Vacancy: {data?.vacancy}</Text>
        </View>

        <View style={{ flexDirection: "row", gap: 5 }}>
          <Feather name="check-circle" size={18} color={"#fff"} />
          <Text style={[styles.aboutPara]}>Location: {data?.location}</Text>
        </View>
        <Text style={{ color: "white", fontSize: 18, marginBottom: 5 }}>
          Requirements:
        </Text>
        <Text style={{ color: "white", fontSize: 16, marginBottom: 5 }}>
          Education:
        </Text>
        <Text style={{ color: "white", fontSize: 14, marginBottom: 5 }}>
          • {data.education}
        </Text>
        <Text style={{ color: "white", fontSize: 16, marginBottom: 5 }}>
          Experience:
        </Text>
        <Text style={{ color: "white", fontSize: 14, marginBottom: 5 }}>
          • {data.experience}
        </Text>
        <Text style={{ color: "white", fontSize: 16, marginBottom: 5 }}>
          Additional Requirements:
        </Text>
        <Text style={{ color: "white", fontSize: 14, marginBottom: 5 }}>
          • Age {data.age}
        </Text>
        <Text style={{ color: "white", fontSize: 14, marginBottom: 5 }}>
          • {data.gender}
        </Text>
        <Text style={{ color: "white", fontSize: 18, marginBottom: 5 }}>
          Responsibilities & Context:
        </Text>
        <Text style={{ color: "white", fontSize: 14, marginBottom: 5 }}>
          • {data.responsibilities}
        </Text>
        <Text style={{ color: "white", fontSize: 14, marginBottom: 5 }}>
          • {data.jobContext}
        </Text>
        <Text style={{ color: "white", fontSize: 18, marginBottom: 5 }}>
          Employment Status:
        </Text>
        <Text style={{ color: "white", fontSize: 14, marginBottom: 5 }}>
          {data.employmentStatus}
        </Text>
      </View>
      <Button title="Apply Now" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  aboutContainer: {
    display: "flex",
    // alignItems: "flex-start",
    paddingLeft: 5,
          paddingRight: 5,
    backgroundColor: "white",
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
  infoContainer: {
    marginTop: SIZES.medium,
    flex: 1,
    flexDirection: "row",
  },
  iconStyle: {
    width: 32,
    height: 32,
    aspectRatio: 1,
  },
});

export default JobDetails;
