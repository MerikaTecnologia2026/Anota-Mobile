import { StyleSheet } from "react-native";
import { colors, radius } from "../../../theme";

export default StyleSheet.create({
  trilho: {
    width: "45%",
    height: 3,
    alignSelf: "center",
    backgroundColor: "rgba(37,99,235,0.25)",
    borderRadius: radius.pill,
    overflow: "hidden",
  },
  barra: {
    height: "100%",
    backgroundColor: colors.azulProgresso,
    borderRadius: radius.pill,
  },
});
