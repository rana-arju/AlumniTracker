import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { COLORS } from "../../../constants/theme";
import { width } from "deprecated-react-native-prop-types/DeprecatedImagePropType";

const AdminCard = () => {
  const handleDetails = (id) => {
    console.log(id);
  };
  const users = [
    {
      image: "https://i.ibb.co/3v7BvSV/images-1.jpg",
      name: "shefaitur",
      email: "shefaitur@gmail.com",
      mobile: "01851694920",
      password: "12345678",
      position: "Instructor",
      facebookLink: "https://www.facebook.com/MD.Shefaitur.rahman.nayon/",
      whatsappNumber: "01851694920",
      role: "teacher",
      status: "Approved",
      isAdmin: false,
    },
    {
      image: "https://i.ibb.co/3v7BvSV/images-1.jpg",
      name: "shefaitur",
      email: "shefaitur@gmail.com",
      mobile: "01851694920",
      password: "12345678",
      position: "Instructor",
      facebookLink: "https://www.facebook.com/MD.Shefaitur.rahman.nayon/",
      whatsappNumber: "01851694920",
      role: "teacher",
      status: "Approved",
      isAdmin: false,
    },
    {
      image: "https://i.ibb.co/3v7BvSV/images-1.jpg",
      name: "shefaitur",
      email: "shefaitur@gmail.com",
      mobile: "01851694920",
      password: "12345678",
      position: "Instructor",
      facebookLink: "https://www.facebook.com/MD.Shefaitur.rahman.nayon/",
      whatsappNumber: "01851694920",
      role: "teacher",
      status: "Approved",
      isAdmin: false,
    },
    {
      image: "https://i.ibb.co/3v7BvSV/images-1.jpg",
      name: "shefaitur",
      email: "shefaitur@gmail.com",
      mobile: "01851694920",
      password: "12345678",
      position: "Instructor",
      facebookLink: "https://www.facebook.com/MD.Shefaitur.rahman.nayon/",
      whatsappNumber: "01851694920",
      role: "teacher",
      status: "Approved",
      isAdmin: false,
    },
    {
      image: "https://i.ibb.co/3v7BvSV/images-1.jpg",
      name: "shefaitur",
      email: "shefaitur@gmail.com",
      mobile: "01851694920",
      password: "12345678",
      position: "Instructor",
      facebookLink: "https://www.facebook.com/MD.Shefaitur.rahman.nayon/",
      whatsappNumber: "01851694920",
      role: "teacher",
      status: "Approved",
      isAdmin: false,
    },
    {
      image: "https://i.ibb.co/3v7BvSV/images-1.jpg",
      name: "shefaitur",
      email: "shefaitur@gmail.com",
      mobile: "01851694920",
      password: "12345678",
      position: "Instructor",
      facebookLink: "https://www.facebook.com/MD.Shefaitur.rahman.nayon/",
      whatsappNumber: "01851694920",
      role: "teacher",
      status: "Approved",
      isAdmin: false,
    },
    {
      image: "https://i.ibb.co/3v7BvSV/images-1.jpg",
      name: "shefaitur",
      email: "shefaitur@gmail.com",
      mobile: "01851694920",
      password: "12345678",
      position: "Instructor",
      facebookLink: "https://www.facebook.com/MD.Shefaitur.rahman.nayon/",
      whatsappNumber: "01851694920",
      role: "teacher",
      status: "Approved",
      isAdmin: false,
    },
    {
      image: "https://i.ibb.co/3v7BvSV/images-1.jpg",
      name: "shefaitur",
      email: "shefaitur@gmail.com",
      mobile: "01851694920",
      password: "12345678",
      position: "Instructor",
      facebookLink: "https://www.facebook.com/MD.Shefaitur.rahman.nayon/",
      whatsappNumber: "01851694920",
      role: "teacher",
      status: "Approved",
      isAdmin: false,
    },
    {
      image: "https://i.ibb.co/3v7BvSV/images-1.jpg",
      name: "shefaitur",
      email: "shefaitur@gmail.com",
      mobile: "01851694920",
      password: "12345678",
      position: "Instructor",
      facebookLink: "https://www.facebook.com/MD.Shefaitur.rahman.nayon/",
      whatsappNumber: "01851694920",
      role: "teacher",
      status: "Approved",
      isAdmin: false,
    },
    {
      image: "https://i.ibb.co/3v7BvSV/images-1.jpg",
      name: "shefaitur",
      email: "shefaitur@gmail.com",
      mobile: "01851694920",
      password: "12345678",
      position: "Instructor",
      facebookLink: "https://www.facebook.com/MD.Shefaitur.rahman.nayon/",
      whatsappNumber: "01851694920",
      role: "teacher",
      status: "Approved",
      isAdmin: false,
    },
    {
      name: "Rana Arju rana ar",
      image: "https://i.ibb.co/TKjtLch/avatar2-large-modified.png",
      email: "ranaarju2023rana@gmail.com",
      mobile: "01851694910",
      password: "123456",
      position: "Instructor",
      facebookLink: "https://www.facebook.com/MD.Shefaitur.rahman.nayon/",
      whatsappNumber: "01851694920",
      status: "Request",
      role: "Teacher",
      isAdmin: true,
    },
    {
      name: "Clementine Bauch",
      email: "clementine@gmail.com",
      mobile: "01851694923",
      password: "123456710",
      position: "Junior Instructor",
      facebookLink: "https://www.facebook.com/MD.Shefaitur.rahman.nayon/",
      whatsappNumber: "01851694920",
      image: "https://i.ibb.co/DGXzTZw/Avatar-Profile-Vector-PNG-Clipart.png",
      status: "Request",
      role: "Teacher",
      isAdmin: false,
    },
    {
      name: "Romaguera-Jacobson",
      email: "jacobson@gmail.com",
      mobile: "01851694924",
      password: "123456782",
      position: "Guest Teacher",
      facebookLink: "https://www.facebook.com/MD.Shefaitur.rahman.nayon/",
      whatsappNumber: "01851694920",
      image: "https://i.ibb.co/8NTbvPC/download-2.jpg",
      status: "Request",
      role: "Teacher",
      isAdmin: false,
    },
    {
      name: "Patricia Lebsack",
      email: "patricia@gmail.com",
      mobile: "01851694925",
      password: "12345673",
      image: "https://i.ibb.co/mqLdk0T/download-1-modified.png",
      position: "Craft Instructor",
      facebookLink: "https://www.facebook.com/MD.Shefaitur.rahman.nayon/",
      whatsappNumber: "01851694920",
      status: "Request",
      role: "Teacher",
      isAdmin: false,
    },
    {
      name: "Chelsey Dietrich",
      email: "chelsey@gmail.com",
      mobile: "01851694926",
      password: "12345674",
      image: "https://i.ibb.co/N15hn5H/download.jpg",
      position: "Lab Assistant",
      facebookLink: "https://www.facebook.com/MD.Shefaitur.rahman.nayon/",
      whatsappNumber: "01851694920",
      status: "Request",
      role: "Teacher",
      isAdmin: false,
    },
  ];
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ScrollView style={{ marginBottom: 250 }}>
        {users.map((user, index) => (
          <View key={index} style={styles.table}>
            <Text style={{ fontSize: 10 }}>
              {user.name.length > 12
                ? user.name.substring(0, 12) + "..."
                : user.name}
            </Text>
            <Text style={{ fontSize: 10 }}>
              {user.email > 20 ? user.email.substring(0, 20) : user.email}
            </Text>
            <Text>
              {user.status == "Request" && (
                <MaterialCommunityIcons
                  name="toggle-switch-off"
                  size={24}
                  color={COLORS.tertiary}
                />
              )}
              {user.status == "Approved" && (
                <MaterialCommunityIcons
                  name="toggle-switch"
                  size={24}
                  color={"#00A67E"}
                />
              )}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.iconBox, { marginRight: 10 }]}>
                <MaterialCommunityIcons
                  name="delete-outline"
                  size={22}
                  color={COLORS.red}
                />
              </Text>
              <Text>
                <Feather
                  name="external-link"
                  size={22}
                  color={COLORS.tertiary}
                  onPress={() => handleDetails(user.name)}
                />
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

export default AdminCard;

const styles = StyleSheet.create({
  table: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: COLORS.gray,
    justifyContent: "space-between",
  },
  iconBox: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: COLORS.tertiary,
    padding: 2,
  },
});
