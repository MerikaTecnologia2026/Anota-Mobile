import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";

import Logo from "../../components/common/Logo";
import { GradientBackground } from "../../components/common";

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  function handleCadastro() {
    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Atenção", "As senhas não conferem.");
      return;
    }

    Alert.alert(
      "Cadastro",
      "Validação concluída! Vamos conectar à API no próximo passo.",
    );
  }

  return (
    <GradientBackground>
      <StatusBar barStyle="light-content" />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Logo variant="login" style={styles.logo} />

          <Text style={styles.title}>Crie sua conta</Text>

          <Text style={styles.subtitle}>Cadastre seus dados para começar</Text>

          <View style={styles.form}>
            <Text style={styles.label}>Nome completo</Text>

            <TextInput
              style={styles.input}
              placeholder="Digite seu nome"
              placeholderTextColor="#777F90"
              value={nome}
              onChangeText={setNome}
            />

            <Text style={styles.label}>E-mail</Text>

            <TextInput
              style={styles.input}
              placeholder="seuemail@gmail.com"
              placeholderTextColor="#777F90"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>Senha</Text>

            <TextInput
              style={styles.input}
              placeholder="Digite sua senha"
              placeholderTextColor="#777F90"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />

            <Text style={styles.label}>Confirmar senha</Text>

            <TextInput
              style={styles.input}
              placeholder="Digite a senha novamente"
              placeholderTextColor="#777F90"
              secureTextEntry
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
            />

            <TouchableOpacity style={styles.button} onPress={handleCadastro}>
              <Text style={styles.buttonText}>Criar conta</Text>
            </TouchableOpacity>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Já possui uma conta?</Text>

              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginLink}> Entrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 25,
  },

  logo: {
    width: 190,
    height: 85,
    alignSelf: "center",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 15,
  },

  subtitle: {
    color: "#B8C7D9",
    fontSize: 13,
    marginTop: 6,
    marginBottom: 18,
  },

  form: {
    width: "100%",
    maxWidth: 380,
  },

  label: {
    color: "#FFFFFF",
    fontSize: 13,
    marginBottom: 6,
    marginTop: 11,
  },

  input: {
    backgroundColor: "#FFFFFF",
    height: 46,
    borderRadius: 9,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#17243A",
  },

  button: {
    backgroundColor: "#2168F3",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  loginText: {
    color: "#B8C7D9",
    fontSize: 12,
  },

  loginLink: {
    color: "#75B9FF",
    fontSize: 13,
    fontWeight: "bold",
  },

  footer: {
    marginTop: 35,
    alignItems: "center",
  },

  footerText: {
    color: "#B8C7D9",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 3,
    lineHeight: 22,
  },
});
