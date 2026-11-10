import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Alert,
  Linking,
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

export default function MinhaAssinaturaScreen({ navigation }) {
  // Futuramente esses dados virão da API Flask.
  const assinatura = {
    plano: "ANOTA Completo",
    status: "Não contratada",
    inicio: null,
    vencimento: null,
    proximaCobranca: null,
  };

  function formatarData(data) {
    if (!data) return "Não disponível";

    return new Date(data).toLocaleDateString("pt-BR");
  }

  function gerenciarAssinatura() {
    Alert.alert(
      "Gerenciar assinatura",
      "Você será direcionado para a Google Play, onde poderá consultar e gerenciar suas assinaturas.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Abrir Google Play",
          onPress: async () => {
            try {
              await Linking.openURL(
                "https://play.google.com/store/account/subscriptions",
              );
            } catch (error) {
              Alert.alert("Erro", "Não foi possível abrir a Google Play.");
            }
          },
        },
      ],
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={23} color={COLORS.blue} />
        </TouchableOpacity>

        <View>
          <Text style={styles.title}>Minha Assinatura</Text>

          <Text style={styles.subtitle}>Consulte e gerencie seu plano</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.planIcon}>
            <Ionicons name="diamond-outline" size={30} color={COLORS.primary} />
          </View>

          <Text style={styles.planName}>{assinatura.plano}</Text>

          <View style={styles.statusBadge}>
            <Ionicons
              name="information-circle-outline"
              size={16}
              color="#B54708"
            />

            <Text style={styles.statusText}>{assinatura.status}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Início da assinatura</Text>

            <Text style={styles.infoValue}>
              {formatarData(assinatura.inicio)}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Vencimento</Text>

            <Text style={styles.infoValue}>
              {formatarData(assinatura.vencimento)}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Próxima cobrança</Text>

            <Text style={styles.infoValue}>
              {formatarData(assinatura.proximaCobranca)}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("Plano")}
        >
          <Ionicons name="rocket-outline" size={20} color={COLORS.white} />

          <Text style={styles.primaryButtonText}>Conhecer o plano</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={gerenciarAssinatura}
        >
          <Ionicons name="card-outline" size={20} color={COLORS.primary} />

          <Text style={styles.secondaryButtonText}>
            Gerenciar na Google Play
          </Text>
        </TouchableOpacity>

        <View style={styles.notice}>
          <Ionicons
            name="information-circle-outline"
            size={22}
            color={COLORS.primary}
          />

          <Text style={styles.noticeText}>
            Após a integração com a Google Play, você poderá acompanhar aqui o
            status da assinatura, período gratuito, vencimento e próxima
            cobrança.
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
    padding: 16,
    gap: 12,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.blue,
  },

  subtitle: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 4,
  },

  content: {
    padding: 16,
    paddingBottom: 30,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 20,
    alignItems: "center",
  },

  planIcon: {
    width: 65,
    height: 65,
    borderRadius: 20,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  planName: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.blue,
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFAEB",
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingVertical: 8,
    marginTop: 12,
    gap: 6,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#B54708",
  },

  divider: {
    height: 1,
    width: "100%",
    backgroundColor: COLORS.border,
    marginVertical: 24,
  },

  infoRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },

  infoLabel: {
    fontSize: 12,
    color: COLORS.gray,
    flex: 1,
  },

  infoValue: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.blue,
    textAlign: "right",
    flex: 1,
  },

  primaryButton: {
    height: 52,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 20,
  },

  primaryButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "800",
  },

  secondaryButton: {
    height: 52,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 12,
  },

  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "700",
  },

  notice: {
    flexDirection: "row",
    backgroundColor: "#EAF2FF",
    borderRadius: 12,
    padding: 15,
    gap: 10,
    marginTop: 20,
  },

  noticeText: {
    flex: 1,
    fontSize: 12,
    color: COLORS.blue,
    lineHeight: 19,
  },
});
