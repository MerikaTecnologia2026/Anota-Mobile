import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    height: 76,
    backgroundColor: "#041C3C",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  iconButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },

  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  notificationBadge: {
    position: "absolute",
    top: 5,
    right: 7,
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: "#FF244D",
    borderWidth: 2,
    borderColor: "#041C3C",
  },
});
