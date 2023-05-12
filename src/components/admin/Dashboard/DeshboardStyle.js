import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants/theme";

export default styles = StyleSheet.create({
  header: {
    margin: 10,
  },
  textStyle1: {
    fontSize: 25,
    fontWeight: 600,
    color: "#000",
  },
  textStyle2: {
    fontSize: 20,
    fontWeight: 500,
    color: "#454545",
  },
  card: {
    width: "100%",
    marginHorizontal: 15,
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 10,
    justifyContent: "center"
  },
  cartItem: {
    width: "45%",
    backgroundColor: COLORS.tertiary,
    borderRadius: 7,
    marginRight: 10,
    justifyContent: "center",
  },
});
