import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import {
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import { COLORS } from "../constants/theme";
const CustomDrawer = (props) => {
  const { navigation } = props;
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#8200d6" }}
      >
        <TouchableOpacity
          style={styles.close}
          onPress={() => navigation.closeDrawer()}
        >
          <AntDesign name="closecircleo" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <ImageBackground
          source={require("../../assets/images/menu-bg.jpeg")}
          style={{ padding: 20 }}
        >
          <Image
            source={require("../../assets/images/user-profile.png")}
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
              marginBottom: 10,
            }}
          />
          <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
            <Text
              style={{
                color: "#fff",
                fontSize: 18,
                marginBottom: 5,
              }}
            >
              Rana Arju
            </Text>
            <Image
              source={require("../../assets/icons/verified.png")}
              style={{
                height: 20,
                width: 20,
                borderRadius: 40,
              }}
            />
          </View>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}
            >
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  close: {
    marginTop: 8,
    alignSelf: "flex-end",
    color: "#fff",
    marginRight: 2,
  },
});
