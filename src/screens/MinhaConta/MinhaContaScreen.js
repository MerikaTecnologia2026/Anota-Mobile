import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const COLORS = {
  navy: "#041C3C",
  blue: "#17366B",
  primary: "#1769D2",
  background: "#F4F7FB",
  white: "#FFFFFF",
  gray: "#667085",
  border: "#E5EAF2",
};

export default function MinhaContaScreen({ navigation }) {
  const mostrarAviso = (titulo) => {
    Alert.alert(titulo, "Essa funcionalidade será implementada em breve.");
  };

  const opcoes = [
    {
      titulo: "Meus dados",
      descricao: "Informações pessoais",
      icone: "person-outline",
      acao: () => navigation.navigate("MeusDados"),
    },
    {
      titulo: "Minha empresa",
      descricao: "Dados do estabelecimento",
      icone: "business-outline",
      acao: () => navigation.navigate("MinhaEmpresa"),
    },
    {
      titulo: "Minha assinatura",
      descricao: "Plano, teste gratuito e pagamentos",
      icone: "card-outline",
      acao: () => navigation.navigate("MinhaAssinatura"),
    },
    {
      titulo: "Segurança",
      descricao: "Senha e proteção da conta",
      icone: "shield-checkmark-outline",
      acao: () => navigation.navigate("Seguranca"),
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      {/* CABEÇALHO */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={23} color={COLORS.white} />
        </TouchableOpacity>

        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Minha Conta</Text>

          <Text style={styles.headerSubtitle}>
            Gerencie seus dados e sua assinatura
          </Text>
        </View>
      </View>

      {/* CONTEÚDO */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Gerenciar conta</Text>

        <View style={styles.menuCard}>
          {opcoes.map((opcao, index) => (
            <React.Fragment key={opcao.titulo}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={opcao.acao}
                activeOpacity={0.7}
              >
                <View style={styles.iconBox}>
                  <Ionicons
                    name={opcao.icone}
                    size={22}
                    color={COLORS.primary}
                  />
                </View>

                <View style={styles.menuInfo}>
                  <Text style={styles.menuTitle}>{opcao.titulo}</Text>

                  <Text style={styles.menuDescription}>{opcao.descricao}</Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={COLORS.gray}
                />
              </TouchableOpacity>

              {index < opcoes.length - 1 && <View style={styles.divider} />}
            </React.Fragment>
          ))}
        </View>

        {/* AVISO */}
        <View style={styles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={22}
            color={COLORS.primary}
          />

          <Text style={styles.infoText}>
            Consulte sua assinatura e mantenha os dados do seu negócio
            atualizados.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.navy,
    padding: 16,
    gap: 12,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: COLORS.blue,
    alignItems: "center",
    justifyContent: "center",
  },

  headerInfo: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.white,
  },

  headerSubtitle: {
    fontSize: 12,
    color: "#D5E4FF",
    marginTop: 4,
  },

  content: {
    padding: 16,
    paddingBottom: 35,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.blue,
    marginTop: 8,
    marginBottom: 14,
  },

  menuCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },

  iconBox: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
  },

  menuInfo: {
    flex: 1,
  },

  menuTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.blue,
  },

  menuDescription: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 4,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginLeft: 73,
  },

  infoBox: {
    flexDirection: "row",
    backgroundColor: "#EAF2FF",
    borderRadius: 12,
    padding: 16,
    gap: 10,
    marginTop: 24,
  },

  infoText: {
    flex: 1,
    fontSize: 12,
    color: COLORS.blue,
    lineHeight: 19,
  },
});
