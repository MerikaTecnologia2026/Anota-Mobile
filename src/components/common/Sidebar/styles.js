import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#041C3C",
    paddingHorizontal: 22,
  },

  header: {
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  logo: {
    width: 190,
    height: 75,
  },

  closeButton: {
    position: "absolute",
    right: 0,
    top: 30,
    padding: 8,
  },

  perfil: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    marginTop: 20,
    marginBottom: 30,
  },

  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#1478F8",
    alignItems: "center",
    justifyContent: "center",
  },

  perfilInfo: {
    flex: 1,
  },

  nome: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "800",
  },

  empresa: {
    color: "#D5E4FF",
    fontSize: 15,
    marginTop: 5,
  },

  menu: {
    flex: 1,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    height: 68,
    gap: 20,
    marginBottom: 6,
  },

  menuItemAtivo: {
    backgroundColor: "#0C3473",
    borderLeftWidth: 4,
    borderLeftColor: "#18B8FF",
    borderRadius: 12,
  },

  menuTexto: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "500",
  },

  menuTextoAtivo: {
    color: "#43B5FF",
    fontWeight: "700",
  },

  rodape: {
    borderTopWidth: 1,
    borderTopColor: "#17366B",
    paddingVertical: 25,
  },

  sair: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    paddingHorizontal: 18,
  },

  sairTexto: {
    color: "#FF5274",
    fontSize: 19,
    fontWeight: "700",
  },
});
