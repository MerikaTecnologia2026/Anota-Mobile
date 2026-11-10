import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 8,

    // Linha discreta na parte superior
    borderTopWidth: 1,
    borderTopColor: "#E5EAF2",
  },

  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 5,
  },

  label: {
    fontSize: 13,
    fontWeight: "500",
    color: "#244C7C",
  },

  labelAtivo: {
    fontWeight: "700",
    color: "#1478F8",
  },
});
