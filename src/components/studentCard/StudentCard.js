import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./StudentStyle";
import { COLORS, SIZES } from "../../constants/theme";

const StudentCard = ({ item, handleCardPress }) => {
  const [selectedStudent, setSelectedStudent] = useState("");
  return (
    <TouchableOpacity
      style={styles.container(selectedStudent, item)}
      onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity style={styles.logoContainer(selectedStudent, item)}>
        {item.image ? (
          <Image
            source={{
              uri: item.image,
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
      <View
        style={{ flexDirection: "row", alignItems: "center", columnGap: 5 }}
      >
        <Text style={styles.studentName} numberOfLines={1}>
          {item.name}
        </Text>
        {item?.isAdmin && (
          <Image
            source={require("../../../assets/icons/verified.png")}
            style={{
              height: 20,
              width: 20,
              borderRadius: 40,
              marginTop: SIZES.small / 1.5,
            }}
          />
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.deptName(selectedStudent, item)}>
          Department:
          <Text style={{ color: COLORS.gray }}>{item.department}</Text>
        </Text>
        {item?.session && (
          <Text style={styles.deptName(selectedStudent, item)}>
            session: <Text style={{ color: COLORS.gray }}>{item.session}</Text>
          </Text>
        )}

        {item?.jobPosition && (
          <Text style={styles.job}>
            Job: <Text style={{ color: COLORS.gray }}>{item.jobPosition}</Text>
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default StudentCard;
