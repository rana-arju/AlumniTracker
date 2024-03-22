import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";

import JobCard from "./JobCard";
import { COLORS, SIZES } from "../../constants/theme";
const data = [
  {
    _id: 1,
    position: "Software Engineer (Full Stack Developer)",
    company: "Mercury IT International Limited",
    deadline: "13 Apr 2024",
    vacancy: 10,
    gender: "Male",
    location: "cox's Bazar",
    salary: 3400,
    author: { name: "Rana Arju", photo: "" },
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
  },
  {
    _id: 2,
    position: "Sr. Officer/ Executive - Compost Plant",
    company: "Mercury IT International Limited",
    deadline: "13 Apr 2024",
    vacancy: 10,
    experience: "at least 2 years",
    location: "cox's Bazar",
    published: "01 Apr 2024",
    salary: 3400,
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
  },
  {
    _id: 3,
    position: "SQA Automation Engineer",
    company: "Automation Solutionz Bangladesh",
    deadline: "13 Apr 2024",
    vacancy: 10,
    experience: "at least 2 years",
    location: "cox's Bazar",
    published: "01 Apr 2024",
    salary: 3400,
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
  },
  {
    _id:4,
    position: "Executive-Human Resources",
    company: "Queens Healthcare Ltd QHL",
    deadline: "13 Apr 2024",
    vacancy: 10,
    experience: "at least 2 years",
    location: "cox's Bazar",
    published: "01 Apr 2024",
    salary: 3400,
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
  },
];
const AllJobs = ({ navigation, route }) => {
  // const {  token } = route.params;
  const [selectedJob, setSelectedJob] = useState();
  const handleCardPress = (item) => {
    navigation.navigate(`jobDetails`, {
      id: item._id,
      // token: token,
    });
    setSelectedJob(item.job_id);
  };
  const renderSeparator = () => (
    <View
      style={{
        height: 10,
      }}
    />
  );
  const renderFooter = () => <View style={{ height: 50 }} />;
  //   const {  isLoading, error, refetch } = useFetch(endPoint, token);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerTitle}>All Jobs</Text>
      </View>
      <View style={styles.cardsContainer}>
        {
          // isLoading ? (
          //   <ActivityIndicator size="large" color={COLORS.primary} />
          // ) : error ? (
          //   <Text>Something went wrong</Text>
          // ) :

          <FlatList
            data={data}
            renderItem={({ item }) => (
              <JobCard
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            )}
            // columnWrapperStyle={{
            //   justifyContent: "space-around",
            // }}
            ItemSeparatorComponent={renderSeparator}
            style={styles.allStudent}
            keyExtractor={(item) => item?._id}
            numColumns={1}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={renderFooter}
            ListHeaderComponent={() => (
              <View
                style={{
                  height: 15,
                }}
              />
            )}
          />
        }
      </View>
    </View>
  );
};

export default AllJobs;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 20,
  },

  // allStudent: {
  //   display: "flex",
  //   marginTop: 10,
  // },
  headerTitle: {
    fontSize: SIZES.medium,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: COLORS.gray,
  },
});
