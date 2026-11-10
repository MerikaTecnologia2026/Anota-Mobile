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

const Campo = ({
  titulo,
  valor,
  alterar,
  icone,
  teclado = "default",
  editando,
}) => (
  <View style={styles.campo}>
    <Text style={styles.label}>{titulo}</Text>

    <View style={[styles.inputContainer, !editando && styles.inputBloqueado]}>
      <Ionicons name={icone} size={20} color={COLORS.gray} />

      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={alterar}
        editable={editando}
        placeholder={`Digite ${titulo.toLowerCase()}`}
        placeholderTextColor="#98A2B3"
        keyboardType={teclado}
        autoCapitalize={teclado === "email-address" ? "none" : "sentences"}
      />

      {!editando && (
        <Ionicons name="lock-closed-outline" size={16} color="#98A2B3" />
      )}
    </View>
  </View>
);

export default function MinhaEmpresaScreen({ navigation }) {
  const [empresa, setEmpresa] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");

  const [editando, setEditando] = useState(false);

  const salvarEmpresa = () => {
    if (!editando) return;

    if (!empresa.trim()) {
      Alert.alert("Atenção", "Informe o nome da empresa.");
      return;
    }

    setEditando(false);

    Alert.alert(
      "Em desenvolvimento",
      "Os dados ainda não foram salvos no banco. A integração com a API será implementada em breve.",
    );
  };

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
          <Text style={styles.headerTitle}>Minha Empresa</Text>

          <Text style={styles.headerSubtitle}>
            Gerencie os dados do estabelecimento
          </Text>
        </View>
      </View>

      {/* CONTEÚDO */}
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Dados da empresa</Text>

        <View style={styles.card}>
          <Campo
            titulo="Nome da empresa"
            valor={empresa}
            alterar={setEmpresa}
            icone="business-outline"
            editando={editando}
          />

          <Campo
            titulo="CNPJ"
            valor={cnpj}
            alterar={setCnpj}
            icone="document-text-outline"
            teclado="numeric"
            editando={editando}
          />

          <Campo
            titulo="Telefone comercial"
            valor={telefone}
            alterar={setTelefone}
            icone="call-outline"
            teclado="phone-pad"
            editando={editando}
          />

          <Campo
            titulo="E-mail comercial"
            valor={email}
            alterar={setEmail}
            icone="mail-outline"
            teclado="email-address"
            editando={editando}
          />

          <Campo
            titulo="Endereço"
            valor={endereco}
            alterar={setEndereco}
            icone="location-outline"
            editando={editando}
          />
        </View>

        {/* BOTÕES LADO A LADO */}
        <View style={styles.botoesContainer}>
          <TouchableOpacity
            style={[
              styles.botao,
              styles.botaoEditar,
              editando && styles.botaoDesabilitado,
            ]}
            onPress={() => setEditando(true)}
            disabled={editando}
            activeOpacity={0.7}
          >
            <Ionicons name="create-outline" size={19} color={COLORS.primary} />

            <Text style={styles.textoEditar}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.botao,
              styles.botaoSalvar,
              !editando && styles.botaoDesabilitado,
            ]}
            onPress={salvarEmpresa}
            disabled={!editando}
            activeOpacity={0.7}
          >
            <Ionicons name="save-outline" size={19} color={COLORS.white} />

            <Text style={styles.textoSalvar}>Salvar alterações</Text>
          </TouchableOpacity>
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
    backgroundColor: COLORS.white,
    height: 50,
    gap: 10,
  },

  inputBloqueado: {
    backgroundColor: "#F2F4F7",
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.blue,
  },

  botoesContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },

  botao: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 8,
    gap: 6,
  },

  botaoEditar: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },

  botaoSalvar: {
    backgroundColor: COLORS.primary,
  },

  botaoDesabilitado: {
    opacity: 0.45,
  },

  textoEditar: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "800",
  },

  textoSalvar: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "800",
  },
});
