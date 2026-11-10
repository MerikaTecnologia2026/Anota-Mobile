import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const periodos = [
  { valor: 1, nome: "Hoje" },
  { valor: 7, nome: "7 dias" },
  { valor: 30, nome: "30 dias" },
  { valor: 90, nome: "3 meses" },
  { valor: 365, nome: "1 ano" },
];

const formatBRL = (valor) =>
  Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

export default function FinanceSummary({
  receitas = 0,
  despesas = 0,
  onPeriodoChange,
}) {
  const [periodo, setPeriodo] = useState(30);
  const [menuAberto, setMenuAberto] = useState(false);

  const saldo = receitas - despesas;

  const cards = [
    {
      titulo: "Entradas",
      descricao: "Total recebido",
      valor: receitas,
      cor: "#009B91",
      icone: "arrow-up",
    },
    {
      titulo: "Saídas",
      descricao: "Total gasto",
      valor: despesas,
      cor: "#ED2457",
      icone: "arrow-down",
    },
    {
      titulo: "Saldo em Caixa",
      descricao: "Saldo atual",
      valor: saldo,
      cor: "#0877F8",
      icone: "trending-up",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <Text style={styles.titulo}>Visão geral do fluxo de caixa</Text>

        <TouchableOpacity
          style={styles.periodoBotao}
          onPress={() => setMenuAberto(!menuAberto)}
        >
          <Text style={styles.periodoTexto}>
            {periodos.find((p) => p.valor === periodo)?.nome}
          </Text>
          <Ionicons name="chevron-down" size={15} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {menuAberto && (
        <View style={styles.periodos}>
          {periodos.map((item) => (
            <TouchableOpacity
              key={item.valor}
              style={styles.periodoItem}
              onPress={() => {
                setPeriodo(item.valor);
                setMenuAberto(false);
                onPeriodoChange?.(item.valor);
              }}
            >
              <Text style={styles.periodoItemTexto}>{item.nome}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.cards}>
        {cards.map((card) => (
          <View
            key={card.titulo}
            style={[styles.card, { backgroundColor: card.cor }]}
          >
            <View style={styles.icone}>
              <Ionicons name={card.icone} size={22} color="#FFFFFF" />
            </View>

            <Text style={styles.cardTitulo}>{card.titulo}</Text>
            <Text style={styles.cardDescricao}>{card.descricao}</Text>
            <Text
              style={styles.cardValor}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.65}
            >
              {formatBRL(card.valor)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#062D70",
    borderRadius: 28,
    padding: 16,
    marginHorizontal: 12,
    marginTop: 20,
  },
  topo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 20,
  },
  titulo: {
    flex: 1,
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  periodoBotao: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1856A5",
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingVertical: 9,
    gap: 5,
  },
  periodoTexto: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  periodos: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
  },
  periodoItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EDF1F7",
  },
  periodoItemTexto: {
    color: "#17366B",
    fontSize: 13,
  },
  cards: {
    flexDirection: "row",
    gap: 8,
  },
  card: {
    flex: 1,
    minWidth: 0,
    borderRadius: 18,
    padding: 10,
    minHeight: 178,
  },
  icone: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.17)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  cardTitulo: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  cardDescricao: {
    color: "#E0EAFF",
    fontSize: 10,
    marginTop: 5,
  },
  cardValor: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
    marginTop: "auto",
    paddingTop: 14,
  },
});
