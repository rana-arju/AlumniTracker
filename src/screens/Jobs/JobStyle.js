import { StyleSheet } from "react-native";
import { COLORS, SIZES, SHADOWS } from "../../constants/theme";

const styles = StyleSheet.create({
  container: (selectedJob, item) => ({
    width: "100%",
    padding: SIZES.small,
    backgroundColor: selectedJob === item.job_id ? COLORS.primary : "#FFF",
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  }),
  logoContainer: (selectedJob, item) => ({
    width: 30,
    height: 30,
    backgroundColor: selectedJob === item.job_id ? "#FFF" : COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  }),
  logoImage: {
    width: "100%",
    height: "100%",
  },
  jobPosition: {
    fontSize: SIZES.medium,
    // fontFamily: FONT.regular,
    color: COLORS.tertiary,
    // marginTop: SIZES.small / 1.5,
  },
  infoContainer: {
    marginTop: SIZES.medium,
  },
  deptName: (selectedJob, item) => ({
    fontSize: SIZES.medium,
    // fontFamily: FONT.medium,
    color: selectedJob === item.job_id ? COLORS.white : COLORS.primary,
    justifyContent: "space-between",
  }),

  job: {
    fontSize: SIZES.medium - 2,
    // fontFamily: FONT.regular,
    color: "#B3AEC6",
  },
});

export default styles;
