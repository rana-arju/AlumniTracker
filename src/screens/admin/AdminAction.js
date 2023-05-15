import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import ActionCard from "../../components/admin/AdminActions/ActionCard";
import { COLORS } from "../../constants/theme";
import Search from "../../components/admin/Search/Search";
import { useEffect, useState } from "react";

const AdminAction = () => {

  return (
    <View style={{ padding: 10 }}>
      <Search />
      <View style={styles.header} horizontal>
        <Text
          style={{ fontSize: 16, fontWeight: "bold", color: COLORS.tertiary }}
        >
          Name
        </Text>
        <Text
          style={{ fontSize: 16, fontWeight: "bold", color: COLORS.tertiary }}
        >
          Email
        </Text>
        <Text
          style={{ fontSize: 16, fontWeight: "bold", color: COLORS.tertiary }}
        >
          Status
        </Text>
        <Text
          style={{ fontSize: 16, fontWeight: "bold", color: COLORS.tertiary }}
        >
          Actions
        </Text>
      </View>
      <ActionCard />
    </View>
  );
};

export default AdminAction;
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: COLORS.gray,
  },
});
