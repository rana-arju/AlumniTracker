import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { COLORS } from "../../constants/theme";
import { SHADOWS } from "../../constants/theme";
import { SIZES } from "../../constants/theme";
import Button from "../../components/Button";

const MyProfile = ({navigation}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ marginBottom: 20 }}>
        <View style={styles.profile_img_area}>
          <Image
            source={require("../../../assets/images/ranaarju.jpg")}
            resizeMode="contain"
            style={styles.profile_img}
          />
          <Text
            style={{ fontSize: 25, fontWeight: "bold", color: COLORS.white }}
          >
            Rana Arju
          </Text>
          <Text style={{ fontSize: 16, color: COLORS.white }}>
            Profession:{" "}
            <Text style={{ color: COLORS.white }}>
              Web developer at <Text style={{fontWeight: "bold"}}>Wikiance</Text>{" "}
            </Text>
          </Text>
        </View>
        <View style={{ padding: 10 }}>
          <View style={styles.infoCard}>
            <Text style={{ fontSize: 16 }}>Email:</Text>
            <Text style={{ fontSize: 16, color: COLORS.gray }}>
              arjurana20@gmail.com
            </Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={{ fontSize: 16 }}>Gender:</Text>
            <Text style={{ fontSize: 16, color: COLORS.gray }}>Male</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={{ fontSize: 16 }}>Department:</Text>
            <Text style={{ fontSize: 16, color: COLORS.gray }}>Computer</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={{ fontSize: 16 }}>Session:</Text>
            <Text style={{ fontSize: 16, color: COLORS.gray }}>19-20</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={{ fontSize: 16 }}>Roll:</Text>
            <Text style={{ fontSize: 16, color: COLORS.gray }}>490225</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={{ fontSize: 16 }}>Registration:</Text>
            <Text style={{ fontSize: 16, color: COLORS.gray }}>17690045</Text>
          </View>
          <View style={styles.infoCard}>
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
          </View>
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
    padding: 20
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
    flexDirection:"row",
    justifyContent: "space-between",
    ...SHADOWS.small
  },
});
