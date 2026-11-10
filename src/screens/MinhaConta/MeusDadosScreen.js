import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
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

export default function MeusDadosScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");

  const salvarDados = () => {
    if (!nome.trim() || !email.trim()) {
      Alert.alert("Atenção", "Preencha o nome e o e-mail.");
      return;
    }

    Alert.alert(
      "Em desenvolvimento",
      "A integração para salvar seus dados será implementada em breve.",
    );
  };

  const Campo = ({ titulo, valor, alterar, icone, teclado }) => (
    <View style={styles.campo}>
      <Text style={styles.label}>{titulo}</Text>

      <View style={styles.inputContainer}>
        <Ionicons name={icone} size={20} color={COLORS.gray} />

        <TextInput
          style={styles.input}
          value={valor}
          onChangeText={alterar}
          placeholder={`Digite ${titulo.toLowerCase()}`}
          placeholderTextColor="#98A2B3"
          keyboardType={teclado || "default"}
          autoCapitalize={teclado === "email-address" ? "none" : "sentences"}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={23} color={COLORS.white} />
        </TouchableOpacity>

        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Meus Dados</Text>
          <Text style={styles.headerSubtitle}>
            Gerencie suas informações pessoais
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Informações pessoais</Text>

        <View style={styles.card}>
          <Campo
            titulo="Nome completo"
            valor={nome}
            alterar={setNome}
            icone="person-outline"
          />

          <Campo
            titulo="E-mail"
            valor={email}
            alterar={setEmail}
            icone="mail-outline"
            teclado="email-address"
          />

          <Campo
            titulo="Telefone"
            valor={telefone}
            alterar={setTelefone}
            icone="call-outline"
            teclado="phone-pad"
          />

          <Campo
            titulo="CPF"
            valor={cpf}
            alterar={setCpf}
            icone="card-outline"
            teclado="numeric"
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={salvarDados}>
          <Ionicons name="save-outline" size={20} color={COLORS.white} />
          <Text style={styles.saveText}>Salvar alterações</Text>
        </TouchableOpacity>
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
    marginBottom: 14,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
  },
  campo: {
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.blue,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#FAFBFD",
    height: 50,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.blue,
  },
  saveButton: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 24,
  },
  saveText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "800",
  },
});
