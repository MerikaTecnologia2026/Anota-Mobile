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
} from "react-native";

import Logo from "../../components/common/Logo";
import { GradientBackground } from "../../components/common";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

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
          {/* LOGO */}
          <Logo variant="login" style={styles.logo} />

          {/* TÍTULO */}
          <Text style={styles.title}>Bem-vindo de volta!</Text>

          <Text style={styles.subtitle}>Acesse sua conta para continuar</Text>

          {/* FORMULÁRIO */}
          <View style={styles.form}>
            <Text style={styles.label}> E-mail</Text>

            <TextInput
              style={styles.input}
              placeholder="Digite seu e-mail"
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

            {/* BOTÃO ENTRAR */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.replace("Home")}
            >
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            {/* LINKS */}
            <View style={styles.linksContainer}>
              <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
                <Text style={styles.linkText}>Não tenho cadastro</Text>
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity onPress={() => console.log("Recuperar senha")}>
                <Text style={styles.linkText}>Esqueci minha senha</Text>
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
    paddingTop: 35,
    paddingBottom: 25,
  },

  logo: {
    width: 230,
    height: 105,
    alignSelf: "center",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 25,
  },

  subtitle: {
    color: "#B8C7D9",
    fontSize: 15,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 35,
  },

  form: {
    width: "100%",
    maxWidth: 380,
    alignSelf: "center",
  },

  label: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 10,
    marginTop: 18,
  },

  input: {
    backgroundColor: "#FFFFFF",
    height: 52,
    width: "100%",
    borderRadius: 12,
    paddingHorizontal: 18,
    fontSize: 15,
    color: "#17243A",
  },

  button: {
    backgroundColor: "#2168F3",
    height: 55,
    width: "100%",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "bold",
  },

  linksContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 30,
    width: "100%",
  },

  linkText: {
    color: "#75B9FF",
    fontSize: 12,
    fontWeight: "500",
  },

  divider: {
    width: 1,
    height: 30,
    backgroundColor: "#B8C7D9",
    marginHorizontal: 8,
  },

  footer: {
    marginTop: 65,
    alignItems: "center",
  },

  footerText: {
    color: "#B8C7D9",
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 3,
    lineHeight: 23,
  },
});
