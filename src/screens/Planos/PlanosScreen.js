import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
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
  green: "#15966B",
};

const beneficios = [
  "Controle de vendas",
  "Gestão de receitas e despesas",
  "Cadastro de clientes",
  "Cadastro de produtos",
  "Cadastro de funcionários",
  "Orçamentos",
  "Relatórios e gráficos financeiros",
  "Categorias e formas de pagamento",
  "Gestão de funcionários",
];

export default function PlanoScreen({ navigation }) {
  function iniciarTeste() {
    Alert.alert(
      "Em desenvolvimento",
      "A contratação dos 14 dias gratuitos será integrada ao Google Play Billing.",
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={23} color={COLORS.white} />
        </TouchableOpacity>

        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Planos ANOTA</Text>
          <Text style={styles.headerSubtitle}>
            Invista na organização do seu negócio
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.intro}>
          <View style={styles.introIcon}>
            <Ionicons name="diamond-outline" size={30} color={COLORS.primary} />
          </View>

          <Text style={styles.introTitle}>Seu negócio mais organizado</Text>

          <Text style={styles.introDescription}>
            Experimente todas as funcionalidades do ANOTA ERP e tenha mais
            controle sobre suas vendas e finanças.
          </Text>
        </View>

        <View style={styles.planCard}>
          <View style={styles.badge}>
            <Ionicons name="gift-outline" size={15} color={COLORS.green} />
            <Text style={styles.badgeText}>14 dias grátis</Text>
          </View>

          <View style={styles.planHeader}>
            <Text style={styles.planName}>ANOTA Completo</Text>

            <Text style={styles.planDescription}>
              Tudo o que você precisa para gerenciar seu negócio.
            </Text>
          </View>

          <View style={styles.priceBox}>
            <Text style={styles.priceLabel}>Após o período gratuito</Text>

            <Text style={styles.price}>Preço a definir</Text>

            <Text style={styles.pricePeriod}>Assinatura mensal</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>O que está incluído?</Text>

          {beneficios.map((beneficio, index) => (
            <View key={index} style={styles.benefitItem}>
              <Ionicons
                name="checkmark-circle"
                size={21}
                color={COLORS.green}
              />

              <Text style={styles.benefitText}>{beneficio}</Text>
            </View>
          ))}

          <TouchableOpacity
            style={styles.subscribeButton}
            onPress={iniciarTeste}
            activeOpacity={0.8}
          >
            <Ionicons name="rocket-outline" size={21} color={COLORS.white} />

            <Text style={styles.subscribeText}>
              Começar meus 14 dias grátis
            </Text>
          </TouchableOpacity>

          <Text style={styles.paymentInfo}>
            A ativação será realizada pela Google Play. Após o período gratuito,
            a assinatura será cobrada mensalmente, salvo cancelamento. O preço e
            as condições serão apresentados antes da confirmação.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.mySubscriptionButton}
          onPress={() => navigation.navigate("MinhaAssinatura")}
        >
          <Ionicons name="card-outline" size={21} color={COLORS.primary} />

          <Text style={styles.mySubscriptionText}>Minha assinatura</Text>

          <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
        </TouchableOpacity>

        <View style={styles.securityBox}>
          <Ionicons
            name="shield-checkmark-outline"
            size={22}
            color={COLORS.primary}
          />

          <Text style={styles.securityText}>
            Pagamentos gerenciados pela Google Play. Seus dados financeiros do
            ANOTA serão protegidos por autenticação e controle de acesso.
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
    paddingHorizontal: 16,
    paddingVertical: 18,
    gap: 12,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#17366B",
    alignItems: "center",
    justifyContent: "center",
  },

  headerInfo: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 21,
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

  intro: {
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 12,
  },

  introIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  introTitle: {
    fontSize: 21,
    fontWeight: "800",
    color: COLORS.blue,
    textAlign: "center",
  },

  introDescription: {
    fontSize: 13,
    color: COLORS.gray,
    textAlign: "center",
    lineHeight: 21,
    marginTop: 10,
  },

  planCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 20,
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#E8F7F0",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.green,
  },

  planHeader: {
    alignItems: "center",
    marginTop: 18,
  },

  planName: {
    fontSize: 23,
    fontWeight: "800",
    color: COLORS.blue,
  },

  planDescription: {
    fontSize: 13,
    color: COLORS.gray,
    textAlign: "center",
    marginTop: 7,
    lineHeight: 19,
  },

  priceBox: {
    alignItems: "center",
    backgroundColor: "#F4F7FB",
    borderRadius: 12,
    padding: 18,
    marginTop: 20,
  },

  priceLabel: {
    fontSize: 12,
    color: COLORS.gray,
  },

  price: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.blue,
    marginTop: 8,
  },

  pricePeriod: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 4,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 22,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.blue,
    marginBottom: 15,
  },

  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    marginBottom: 15,
  },

  benefitText: {
    flex: 1,
    fontSize: 13,
    color: "#344054",
    lineHeight: 19,
  },

  subscribeButton: {
    height: 54,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 12,
  },

  subscribeText: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.white,
  },

  paymentInfo: {
    fontSize: 11,
    lineHeight: 18,
    color: COLORS.gray,
    textAlign: "center",
    marginTop: 15,
  },

  mySubscriptionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 17,
    marginTop: 18,
    gap: 12,
  },

  mySubscriptionText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.blue,
  },

  securityBox: {
    flexDirection: "row",
    backgroundColor: "#EAF2FF",
    borderRadius: 12,
    padding: 15,
    marginTop: 18,
    gap: 10,
  },

  securityText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 19,
    color: COLORS.blue,
  },
});
