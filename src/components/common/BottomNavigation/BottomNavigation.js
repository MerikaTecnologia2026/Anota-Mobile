import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

const itens = [
  { nome: "Início", icone: "home", rota: "Home" },
  { nome: "Receitas", icone: "cash-outline", rota: "Receitas" },
  { nome: "Despesas", icone: "wallet-outline", rota: "Despesas" },
  { nome: "Mais", icone: "ellipsis-horizontal", rota: "Mais" },
];

export default function BottomNavigation({ activeRoute = "Home", onNavigate }) {
  return (
    <View style={styles.container}>
      {itens.map((item) => {
        const ativo = activeRoute === item.rota;

        return (
          <TouchableOpacity
            key={item.rota}
            style={styles.item}
            onPress={() => onNavigate?.(item.rota)}
            accessibilityRole="button"
            accessibilityLabel={item.nome}
          >
            <Ionicons
              name={item.icone}
              size={25}
              color={ativo ? "#1478F8" : "#244C7C"}
            />

            <Text style={[styles.label, ativo && styles.labelAtivo]}>
              {item.nome}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
