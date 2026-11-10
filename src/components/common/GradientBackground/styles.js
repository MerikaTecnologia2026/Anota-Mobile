import { StyleSheet } from "react-native";
import { colors } from "../../../theme";

export default StyleSheet.create({
  base: { flex: 1, overflow: "hidden" },
  bandaTopo: {
    position: "absolute",
    top: -120,
    right: -40,
    width: 170,
    height: 900,
    backgroundColor: colors.bandaClara,
    transform: [{ rotate: "32deg" }],
  },
  linhaTopo: {
    position: "absolute",
    top: -120,
    right: 60,
    width: 3,
    height: 800,
    backgroundColor: colors.linhaClara,
    opacity: 0.5,
    transform: [{ rotate: "32deg" }],
  },
  bandaBase: {
    position: "absolute",
    bottom: -260,
    left: -120,
    width: 190,
    height: 900,
    backgroundColor: colors.bandaClara,
    transform: [{ rotate: "58deg" }],
  },
  linhaBase: {
    position: "absolute",
    bottom: -240,
    left: 60,
    width: 3,
    height: 800,
    backgroundColor: colors.linhaClara,
    opacity: 0.6,
    transform: [{ rotate: "58deg" }],
  },
});
