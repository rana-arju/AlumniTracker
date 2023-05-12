import { ScrollView, StyleSheet, Text, View } from "react-native";
import ActionCard from "../../components/admin/AdminActions/ActionCard";
import { COLORS } from "../../constants/theme";
import AdminCard from "../../components/admin/AdminMake/AdminCard";
import Search from "../../components/admin/Search/Search";

const MakeAdmin = () => {
  return (
    <View style={{padding: 10}}>
    <Search />
      <View style={styles.header} horizontal  >
        <Text style={{fontSize: 16, fontWeight: "bold", color: COLORS.tertiary}}>Name</Text>
        <Text style={{fontSize: 16, fontWeight: "bold", color: COLORS.tertiary}}>Email</Text>
        <Text style={{fontSize: 16, fontWeight: "bold", color: COLORS.tertiary}}>Admin</Text>
        <Text style={{fontSize: 16, fontWeight: "bold", color: COLORS.tertiary}}>Actions</Text>
      </View>
      <AdminCard />
    </View>
  );
};

export default MakeAdmin;
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: COLORS.gray,
    
  },
});
