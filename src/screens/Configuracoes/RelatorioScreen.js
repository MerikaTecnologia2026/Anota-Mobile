import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ChartOverview from "../../components/charts/ChartOverview";
import ChartGrafico from "../../components/charts/ChartGrafico";

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

function formatarData(valor) {
  const numeros = valor.replace(/\D/g, "").slice(0, 8);

  if (numeros.length <= 2) return numeros;
  if (numeros.length <= 4) {
    return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
  }

  return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4)}`;
}

function converterData(valor) {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(valor)) return null;

  const [dia, mes, ano] = valor.split("/").map(Number);
  const data = new Date(ano, mes - 1, dia);

  if (
    data.getFullYear() !== ano ||
    data.getMonth() !== mes - 1 ||
    data.getDate() !== dia
  ) {
    return null;
  }

  return data;
}

export default function RelatorioScreen({ navigation }) {
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  function gerarRelatorio() {
    const inicio = converterData(dataInicio);
    const fim = converterData(dataFim);

    if (!inicio || !fim) {
      Alert.alert(
        "Atenção",
        "Informe as datas inicial e final no formato DD/MM/AAAA.",
      );
      return;
    }

    if (inicio > fim) {
      Alert.alert(
        "Período inválido",
        "A data inicial não pode ser maior que a data final.",
      );
      return;
    }

    // Futuramente esta função buscará os dados na API.
    console.log("Data inicial:", dataInicio);
    console.log("Data final:", dataFim);

    Alert.alert(
      "Período selecionado",
      `De ${dataInicio} até ${dataFim}.\n\nA geração do relatório será conectada à API posteriormente.`,
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

        <View style={styles.headerText}>
          <Text style={styles.title}>Relatórios</Text>
          <Text style={styles.subtitle}>Consulte informações por período</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <ChartGrafico />

        <ChartOverview />
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconBox}>
              <Ionicons
                name="calendar-outline"
                size={23}
                color={COLORS.primary}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Período</Text>
              <Text style={styles.cardSubtitle}>
                Selecione as datas para consultar
              </Text>
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Data inicial</Text>

            <View style={styles.inputContainer}>
              <Ionicons name="calendar-outline" size={19} color={COLORS.gray} />

              <TextInput
                style={styles.input}
                placeholder="DD/MM/AAAA"
                placeholderTextColor="#98A2B3"
                keyboardType="number-pad"
                maxLength={10}
                value={dataInicio}
                onChangeText={(texto) => setDataInicio(formatarData(texto))}
              />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Data final</Text>

            <View style={styles.inputContainer}>
              <Ionicons name="calendar-outline" size={19} color={COLORS.gray} />

              <TextInput
                style={styles.input}
                placeholder="DD/MM/AAAA"
                placeholderTextColor="#98A2B3"
                keyboardType="number-pad"
                maxLength={10}
                value={dataFim}
                onChangeText={(texto) => setDataFim(formatarData(texto))}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.generateButton}
            onPress={gerarRelatorio}
            activeOpacity={0.8}
          >
            <Ionicons
              name="document-text-outline"
              size={20}
              color={COLORS.white}
            />

            <Text style={styles.generateText}>Gerar Relatório</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <Ionicons
            name="information-circle-outline"
            size={22}
            color={COLORS.primary}
          />

          <Text style={styles.infoText}>
            Selecione a data inicial e final para definir o período do
            relatório.
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
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  headerText: {
    flex: 1,
  },

  title: {
    fontSize: 23,
    fontWeight: "800",
    color: COLORS.blue,
  },

  subtitle: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 4,
  },

  content: {
    paddingHorizontal: 14,
    paddingBottom: 30,
  },

  card: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 18,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 25,
  },

  iconBox: {
    width: 45,
    height: 45,
    backgroundColor: "#EAF2FF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.blue,
  },

  cardSubtitle: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 5,
  },

  field: {
    marginBottom: 20,
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#344054",
    marginBottom: 9,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#D8E0EB",
    borderRadius: 10,
    paddingHorizontal: 13,
    gap: 10,
  },

  input: {
    flex: 1,
    height: "100%",
    fontSize: 14,
    color: COLORS.blue,
  },

  generateButton: {
    height: 52,
    backgroundColor: COLORS.primary,
    borderRadius: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 8,
  },

  generateText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "700",
  },

  infoCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#EAF2FF",
    borderRadius: 12,
    padding: 15,
    marginTop: 16,
    gap: 10,
  },

  infoText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 19,
    color: COLORS.blue,
  },
});
