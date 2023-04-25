import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
  container: (selectedStudent, item) => ({
    width: 250,
    padding: SIZES.xLarge,
    backgroundColor: selectedStudent === item.job_id ? COLORS.primary : "#FFF",
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    // ...SHADOWS.medium,
    shadowColor: COLORS.white,
  }),
  logoContainer: (selectedStudent, item) => ({
    width: 50,
    height: 50,
    backgroundColor: selectedStudent === item.job_id ? "#FFF" : COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  }),
  logoImage: {
    width: "100%",
    height: "100%",
  },
  companyName: {
    fontSize: SIZES.medium,
    // fontFamily: FONT.regular,
    color: "#B3AEC6",
    marginTop: SIZES.small / 1.5,
  },
  infoContainer: {
    marginTop: SIZES.large,
  },
  deptName: (selectedStudent, item) => ({
    fontSize: SIZES.medium,
    // fontFamily: FONT.medium,
    color: selectedStudent === item.job_id ? COLORS.white : COLORS.primary,
  }),
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  publisher: (selectedStudent) => ({
    fontSize: SIZES.medium - 2,
    // fontFamily: FONT.bold,
    color: selectedStudent === item.job_id ? COLORS.white : COLORS.primary,
  }),
  job: {
    fontSize: SIZES.medium - 2,
    // fontFamily: FONT.regular,
    color: "#B3AEC6",
  },
});

export default styles;
