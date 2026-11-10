import React, { useState } from "react";
import { View, Text, ScrollView, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import Header from "../../components/common/Header/Header";
import BottomNavigation from "../../components/common/BottomNavigation/BottomNavigation";
import FinanceSummary from "../../components/dashboard/FinanceSummary";
import FinanceCharts from "../../components/dashboard/FinanceCharts";
import Sidebar from "../../components/common/Sidebar/Sidebar";
export default function HomeScreen({ navigation }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const hora = new Date().getHours();

  const saudacao =
    hora < 12 ? "Bom dia" : hora < 18 ? "Boa tarde" : "Boa noite";

  const dataHoje = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar barStyle="light-content" backgroundColor="#041C3C" />

      <Header hasNotifications={true} onMenuPress={() => setMenuAberto(true)} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.areaAzul}>
          <View style={styles.usuario}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={45} color="#FFFFFF" />
            </View>

            <View style={styles.usuarioInfo}>
              <Text style={styles.saudacao}>{saudacao},</Text>
              <Text style={styles.nome}>Usuário 👋</Text>
              <Text style={styles.data}>Hoje é {dataHoje}</Text>
            </View>
          </View>

          <FinanceSummary receitas={0} despesas={0} />
        </View>

        <View style={styles.areaGraficos}>
          <FinanceCharts />
        </View>
      </ScrollView>
      <BottomNavigation
        activeRoute="Home"
        onNavigate={(rota) => {
          if (rota === "Home") return;

          if (rota === "Receitas") {
            navigation.navigate("Receitas");
          }

          if (rota === "Despesas") {
            navigation.navigate("Despesas");
          }
        }}
      />
      <Sidebar
        visible={menuAberto}
        onClose={() => setMenuAberto(false)}
        nomeUsuario="Usuário"
        nomeEmpresa="Empresa"
        onNavigate={(rota) => {
          setMenuAberto(false);

          if (rota === "Home") return;

          if (rota === "Funcionario") {
            navigation.navigate("Funcionario");
            return;
          }

          if (rota === "MinhaConta") {
            navigation.navigate("MinhaConta");
            return;
          }

          if (rota === "Categorias") {
            navigation.navigate("Categorias");
            return;
          }

          if (rota === "Orcamento") {
            navigation.navigate("Orcamento");
            return;
          }

          if (rota === "FormasPagamento") {
            navigation.navigate("FormasPagamento");
            return;
          }

          if (rota === "Relatorio") {
            navigation.navigate("Relatorio");
            return;
          }
        }}
        onLogout={() => {
          setMenuAberto(false);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#041C3C",
  },
  scroll: {
    flex: 1,
    backgroundColor: "#041C3C",
  },

  scrollContent: {
    backgroundColor: "#041C3C",
  },

  areaAzul: {
    backgroundColor: "#041C3C",
    paddingTop: 10,
    paddingBottom: 12,
  },

  usuario: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 0,
    gap: 8,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1478F8",
    alignItems: "center",
    justifyContent: "center",
  },

  usuarioInfo: {
    flex: 1,
  },

  saudacao: {
    color: "#D5E4FF",
    fontSize: 10,
  },

  nome: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },

  data: {
    color: "#BBD3FF",
    fontSize: 10,
    marginTop: 2,
  },

  areaGraficos: {
    flex: 1,
    backgroundColor: "#F4F7FB",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingBottom: 16,
    marginTop: -5,
  },
});
