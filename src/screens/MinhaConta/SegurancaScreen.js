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

function CampoSenha({ titulo, valor, alterar, editando }) {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <View style={styles.campo}>
      <Text style={styles.label}>{titulo}</Text>

      <View style={[styles.inputContainer, !editando && styles.inputBloqueado]}>
        <Ionicons name="lock-closed-outline" size={20} color={COLORS.gray} />

        <TextInput
          style={styles.input}
          value={valor}
          onChangeText={alterar}
          editable={editando}
          secureTextEntry={!mostrarSenha}
          placeholder="Digite sua senha"
          placeholderTextColor="#98A2B3"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TouchableOpacity
          onPress={() => setMostrarSenha(!mostrarSenha)}
          disabled={!editando}
        >
          <Ionicons
            name={mostrarSenha ? "eye-off-outline" : "eye-outline"}
            size={21}
            color={COLORS.gray}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function SegurancaScreen({ navigation }) {
  const [editando, setEditando] = useState(false);

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const salvarSenha = () => {
    if (!editando) return;

    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    if (novaSenha.length < 8) {
      Alert.alert("Atenção", "A nova senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      Alert.alert("Atenção", "As senhas não coincidem.");
      return;
    }

    if (senhaAtual === novaSenha) {
      Alert.alert("Atenção", "A nova senha deve ser diferente da senha atual.");
      return;
    }

    // Futuramente chamar a API Flask para alterar a senha.
    // Nunca armazenar senhas em texto puro.

    Alert.alert(
      "Em desenvolvimento",
      "A alteração de senha ainda não está integrada à API.",
    );

    setSenhaAtual("");
    setNovaSenha("");
    setConfirmarSenha("");
    setEditando(false);
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
          <Text style={styles.headerTitle}>Segurança</Text>

          <Text style={styles.headerSubtitle}>
            Gerencie a segurança da sua conta
          </Text>
        </View>
      </View>

      {/* CONTEÚDO */}
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeader}>
          <Ionicons
            name="shield-checkmark-outline"
            size={23}
            color={COLORS.primary}
          />

          <Text style={styles.sectionTitle}>Alterar senha</Text>
        </View>

        <View style={styles.card}>
          <CampoSenha
            titulo="Senha atual"
            valor={senhaAtual}
            alterar={setSenhaAtual}
            editando={editando}
          />

          <CampoSenha
            titulo="Nova senha"
            valor={novaSenha}
            alterar={setNovaSenha}
            editando={editando}
          />

          <CampoSenha
            titulo="Confirmar nova senha"
            valor={confirmarSenha}
            alterar={setConfirmarSenha}
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
            onPress={salvarSenha}
            disabled={!editando}
          >
            <Ionicons name="save-outline" size={19} color={COLORS.white} />

            <Text style={styles.textoSalvar}>Salvar alterações</Text>
          </TouchableOpacity>
        </View>

        {/* INFORMAÇÕES */}
        <View style={styles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={22}
            color={COLORS.primary}
          />

          <Text style={styles.infoText}>
            Para sua segurança, utilize uma senha forte e não compartilhe suas
            credenciais de acesso.
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

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.blue,
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
