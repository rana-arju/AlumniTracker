import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./JobStyle";
import { COLORS, SIZES } from "../../constants/theme";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

const JobCard = ({ item, handleCardPress }) => {
  const [selectedJob, setSelectedJob] = useState("");
  return (
    <TouchableOpacity
      style={styles.container(selectedJob, item)}
      onPress={() => handleCardPress(item)}
    >
      <View style={{ marginBottom: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.jobPosition} numberOfLines={2}>
            {item.position}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.jobPosition} numberOfLines={2}>
            {item.company}
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 10
        }}
      >
        <TouchableOpacity style={styles.logoContainer(selectedJob, item)}>
          {item.image ? (
            <Image
              source={{
                uri: item?.image,
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
        <Text style={{ color: COLORS.gray }}>
          - <Text style={{ fontStyle: "italic" }}>Rana Arju</Text>
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.infoContainer}>
          <Text style={styles.deptName(selectedJob, item)}>
            <AntDesign name="calendar" size={14} color={COLORS.black} />

            <Text style={{ color: COLORS.gray, fontSize: SIZES.small }}>
              Deadline:
            </Text>
          </Text>

          <Text style={{ color: COLORS.gray }}>{item.deadline}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.deptName(selectedJob, item)}>
            <FontAwesome name="briefcase" size={14} color={COLORS.black} />

            <Text style={{ color: COLORS.gray, fontSize: SIZES.small }}>
              Experience:
            </Text>
          </Text>

          <Text style={{ color: COLORS.gray, textTransform: "capitalize" }}>
            at least 2 years
          </Text>
        </View>
      </View>
      <View>
        <View style={styles.infoContainer}>
          <Text style={styles.deptName(selectedJob, item)}>
            <FontAwesome name="graduation-cap" size={14} color={COLORS.black} />

            <Text style={{ color: COLORS.gray, fontSize: SIZES.small }}>
              Education:
            </Text>
          </Text>

          <Text style={{ color: COLORS.gray }}>{item.education}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default JobCard;
