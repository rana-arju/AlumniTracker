import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./StudentStyle";
import { COLORS } from "../../constants/theme";

const StudentCard = ({ item }) => {
  const [selectedStudent, setSelectedStudent] = useState("");
  return (
    <TouchableOpacity
      style={styles.container(selectedStudent, item)}
      // onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity style={styles.logoContainer(selectedStudent, item)}>
        <Image
          source={{
            uri: item.profile_image
              ? item.profile_image
              : "../../../assets/images/user-profile.png",
          }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>
        {item.name}
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.deptName(selectedStudent, item)}>
          Dept: <Text style={{ color: COLORS.gray }}>{item.department}</Text>
        </Text>
        <Text style={styles.job}>
          Job: <Text>{item.present_job_details}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default StudentCard;
