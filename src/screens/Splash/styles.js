import { StyleSheet } from "react-native";
import { colors, fontSize, fontWeight } from "../../theme";

export default StyleSheet.create({
  centro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 60,
  },
  slogan: {
    marginTop: 24,
    textAlign: "center",
    color: colors.textoClaro,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    letterSpacing: 3,
    lineHeight: 22,
  },
  rodape: { position: "absolute", left: 0, right: 0 },
});
