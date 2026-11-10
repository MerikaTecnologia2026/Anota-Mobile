import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const menuItems = [
  {
    titulo: "Início",
    icone: "home-outline",
    rota: "Home",
  },
  {
    titulo: "Minha Conta",
    icone: "person-circle-outline",
    rota: "MinhaConta",
  },
  {
    titulo: "Orçamento",
    icone: "document-text-outline",
    rota: "Orcamento",
  },
  {
    titulo: "Funcionário",
    icone: "people-outline",
    rota: "Funcionario",
  },
  {
    titulo: "Categorias",
    icone: "grid-outline",
    rota: "Categorias",
  },
  {
    titulo: "Formas de Pagamento",
    icone: "card-outline",
    rota: "FormasPagamento",
  },
  {
    titulo: "Relatórios",
    icone: "bar-chart-outline",
    rota: "Relatorio",
  },
];

export default function Sidebar({
  visible,
  onClose,
  onNavigate,
  onLogout,
  nomeUsuario = "Usuário",
  nomeEmpresa = "Empresa",
  rotaAtual = "Home",
}) {
  function navegar(rota) {
    onClose?.();
    onNavigate?.(rota);
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      statusBarTranslucent={false}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* CABEÇALHO */}
        <View style={styles.header}>
          <Image
            source={require("../../../../assets/logo-header.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            accessibilityLabel="Fechar menu"
          >
            <Ionicons name="close" size={23} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* PERFIL */}
        <View style={styles.perfil}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={25} color="#FFFFFF" />
          </View>

          <View style={styles.perfilInfo}>
            <Text style={styles.nome} numberOfLines={1}>
              {nomeUsuario}
            </Text>

            <Text style={styles.empresa} numberOfLines={1}>
              Empresa: {nomeEmpresa}
            </Text>
          </View>
        </View>

        {/* MENU */}
        <ScrollView
          style={styles.menu}
          contentContainerStyle={styles.menuContent}
          showsVerticalScrollIndicator={false}
        >
          {menuItems.map((item) => {
            const ativo = rotaAtual === item.rota;

            return (
              <TouchableOpacity
                key={item.rota}
                style={[styles.menuItem, ativo && styles.menuItemAtivo]}
                onPress={() => navegar(item.rota)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={item.icone}
                  size={21}
                  color={ativo ? "#43B5FF" : "#FFFFFF"}
                />

                <Text
                  style={[styles.menuTexto, ativo && styles.menuTextoAtivo]}
                  numberOfLines={1}
                >
                  {item.titulo}
                </Text>

                <Ionicons name="chevron-forward" size={17} color="#D5E4FF" />
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* RODAPÉ */}
        <View style={styles.rodape}>
          <TouchableOpacity style={styles.sair} onPress={onLogout}>
            <Ionicons name="log-out-outline" size={22} color="#FF5274" />

            <Text style={styles.sairTexto}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#041C3C",
    paddingHorizontal: 16,
  },

  header: {
    height: 72,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  logo: {
    width: 130,
    height: 50,
  },

  closeButton: {
    position: "absolute",
    right: 0,
    top: 18,
    padding: 8,
  },

  perfil: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 8,
    marginBottom: 18,
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#1478F8",
    alignItems: "center",
    justifyContent: "center",
  },

  perfilInfo: {
    flex: 1,
  },

  nome: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  empresa: {
    color: "#D5E4FF",
    fontSize: 11,
    marginTop: 4,
  },

  menu: {
    flex: 1,
  },

  menuContent: {
    paddingVertical: 5,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
    height: 49,
    gap: 12,
    marginBottom: 3,
    borderRadius: 10,
  },

  menuItemAtivo: {
    backgroundColor: "#0C3473",
    borderLeftWidth: 3,
    borderLeftColor: "#18B8FF",
  },

  menuTexto: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "500",
  },

  menuTextoAtivo: {
    color: "#43B5FF",
    fontWeight: "700",
  },

  rodape: {
    borderTopWidth: 1,
    borderTopColor: "#17366B",
    paddingVertical: 15,
  },

  sair: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 13,
    paddingVertical: 5,
  },

  sairTexto: {
    color: "#FF5274",
    fontSize: 14,
    fontWeight: "700",
  },
});
