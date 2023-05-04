import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./TeacherStyles";
import { COLORS } from "../../constants/theme";

const TeacherCard = ({ teacher, handleCardPress }) => {
  const [selectedStudent, setSelectedStudent] = useState("");
  return (
    <TouchableOpacity
      style={styles.container(selectedStudent, teacher)}
      onPress={() => handleCardPress(teacher)}
    >
      <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
        <TouchableOpacity
          style={styles.logoContainer(selectedStudent, teacher)}
        >
          {teacher.image ? (
            <Image
              source={{
                uri: teacher.image,
              }}
              resizeMode="contain"
              style={styles.logoImage}
            />
          ) : (
            <Image
              source={require("../../../assets/images/user-profile.png")}
              resizeMode="contain"
              style={styles.logoImage}
            />
          )}
        </TouchableOpacity>
        <Text style={styles.studentName} numberOfLines={1}>
          {teacher.name}
        </Text>
        {teacher?.role == "teacher" && (
          <Image
            source={require("../../../assets/icons/verified.png")}
            style={{
              height: 20,
              width: 20,
              borderRadius: 40,
            }}
          />
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.deptName(selectedStudent, teacher)}>
          Position:
          <Text style={{ color: COLORS.gray }}>{teacher.position}</Text>
        </Text>
        {teacher?.session && (
          <Text style={styles.deptName(selectedStudent, teacher)}>
            session:
            <Text style={{ color: COLORS.gray }}>{teacher.session}</Text>
          </Text>
        )}

        {teacher?.jobPosition && (
          <Text style={styles.job}>
            Job:
            <Text style={{ color: COLORS.gray }}>{teacher.jobPosition}</Text>
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default TeacherCard;
