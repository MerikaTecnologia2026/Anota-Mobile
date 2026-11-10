import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// DADOS DE DEMONSTRAÇÃO
// Depois serão substituídos pelos dados da API.
const hoje = new Date();

function diasAtras(dias) {
  const data = new Date();
  data.setDate(data.getDate() - dias);
  return data.toISOString();
}

const receitasExemplo = [
  {
    Cliente: "Maria Silva",
    Forma_pagamento: "Pix",
    ValorTotal: 350,
    Data: diasAtras(0),
    Status: "Pago",
  },
  {
    Cliente: "João Santos",
    Forma_pagamento: "Cartão",
    ValorTotal: 780,
    Data: diasAtras(1),
    Status: "Pago",
  },
  {
    Cliente: "Ana Oliveira",
    Forma_pagamento: "Dinheiro",
    ValorTotal: 250,
    Data: diasAtras(3),
    Status: "Pago",
  },
];

const despesasExemplo = [
  {
    CategoriaID: "Fornecedores",
    Descricao: "Compra de mercadorias",
    Valor: 180,
    DataPagamento: diasAtras(0),
    Status: "Pago",
  },
  {
    CategoriaID: "Retirada de Sócio",
    Nome: "Sócio",
    Descricao: "Retirada mensal",
    Valor: 500,
    DataPagamento: diasAtras(1),
    Status: "Pago",
  },
  {
    CategoriaID: "Energia",
    Descricao: "Conta de luz",
    Valor: 210,
    DataPagamento: diasAtras(4),
    Status: "Pago",
  },
];

const formatarMoeda = (valor) =>
  Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

function formatarData(data) {
  if (!data) return "-";

  const dataMovimento = new Date(data);

  if (Number.isNaN(dataMovimento.getTime())) {
    return "-";
  }

  if (dataMovimento.toDateString() === hoje.toDateString()) {
    return "Hoje";
  }

  return dataMovimento.toLocaleDateString("pt-BR");
}

function obterConfiguracao(tipo) {
  switch (tipo) {
    case "entrada":
      return {
        icone: "arrow-down-outline",
        cor: "#15966B",
        fundo: "#E8F7F0",
      };

    case "saida":
      return {
        icone: "arrow-up-outline",
        cor: "#EF4444",
        fundo: "#FEECEC",
      };

    case "retirada":
      return {
        icone: "person-outline",
        cor: "#9333EA",
        fundo: "#F3E8FF",
      };

    default:
      return {
        icone: "cash-outline",
        cor: "#667085",
        fundo: "#F2F4F7",
      };
  }
}

export default function ChartOverview({
  receitas = receitasExemplo,
  despesas = despesasExemplo,
}) {
  const dataAtual = new Date();
  const inicioPeriodo = new Date(dataAtual);
  inicioPeriodo.setDate(inicioPeriodo.getDate() - 7);

  // RECEITAS
  const entradas = receitas.map((receita) => ({
    tipo: "entrada",
    titulo: `Venda | ${receita.Forma_pagamento || "Não informado"}`,
    descricao: receita.Cliente || receita.Descricao || "Receita cadastrada",
    valor: Number(receita.ValorTotal ?? receita.Valor ?? 0),
    data: receita.Data,
  }));

  // DESPESAS E RETIRADAS
  const saidas = despesas.map((despesa) => {
    const retirada = despesa.CategoriaID === "Retirada de Sócio";

    return {
      tipo: retirada ? "retirada" : "saida",
      titulo: retirada
        ? `Retirada | ${despesa.Nome || "Sócio"}`
        : `Despesa | ${despesa.CategoriaID || "Outros"}`,
      descricao: despesa.Descricao || "Sem descrição",
      valor: Number(despesa.Valor || 0),
      data: despesa.DataPagamento || despesa.DataVencimento,
    };
  });

  // ÚLTIMOS 7 DIAS E ATÉ 10 MOVIMENTAÇÕES
  const movimentacoes = [...entradas, ...saidas]
    .filter((item) => {
      if (!item.data) return false;

      const data = new Date(item.data);

      return (
        !Number.isNaN(data.getTime()) &&
        data >= inicioPeriodo &&
        data <= dataAtual
      );
    })
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, 10);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.titulo}>Atividade Financeira</Text>

          <Text style={styles.subtitulo}>Últimos 7 dias</Text>
        </View>

        <View style={styles.iconePrincipal}>
          <Ionicons name="cash-outline" size={23} color="#1769D2" />
        </View>
      </View>

      {movimentacoes.length === 0 ? (
        <View style={styles.vazio}>
          <Ionicons name="receipt-outline" size={34} color="#98A2B3" />

          <Text style={styles.vazioTitulo}>Nenhuma movimentação</Text>

          <Text style={styles.vazioDescricao}>
            Não existem receitas ou despesas registradas nos últimos 7 dias.
          </Text>
        </View>
      ) : (
        <ScrollView
          style={styles.lista}
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
        >
          {movimentacoes.map((item, index) => {
            const config = obterConfiguracao(item.tipo);

            return (
              <View
                key={`${item.tipo}-${index}`}
                style={[
                  styles.movimentacao,
                  index === movimentacoes.length - 1 &&
                    styles.ultimaMovimentacao,
                ]}
              >
                <View
                  style={[
                    styles.iconeMovimento,
                    { backgroundColor: config.fundo },
                  ]}
                >
                  <Ionicons name={config.icone} size={20} color={config.cor} />
                </View>

                <View style={styles.info}>
                  <Text style={styles.movimentoTitulo} numberOfLines={1}>
                    {item.titulo}
                  </Text>

                  <Text style={styles.movimentoDescricao} numberOfLines={2}>
                    {item.descricao}
                  </Text>
                </View>

                <View style={styles.valorContainer}>
                  <Text
                    style={[styles.valor, { color: config.cor }]}
                    numberOfLines={1}
                  >
                    {item.tipo === "entrada" ? "+ " : "- "}
                    {formatarMoeda(item.valor)}
                  </Text>

                  <Text style={styles.data}>{formatarData(item.data)}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}

      <View style={styles.rodape}>
        <Ionicons name="time-outline" size={14} color="#667085" />

        <Text style={styles.rodapeTexto}>
          Exibindo até 10 movimentações recentes
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5EAF2",
    padding: 16,
    marginVertical: 10,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  titulo: {
    fontSize: 17,
    fontWeight: "800",
    color: "#17366B",
  },

  subtitulo: {
    fontSize: 12,
    color: "#667085",
    marginTop: 4,
  },

  iconePrincipal: {
    width: 44,
    height: 44,
    backgroundColor: "#EAF2FF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  lista: {
    maxHeight: 280,
  },

  movimentacao: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#EDF1F7",
    gap: 10,
  },

  ultimaMovimentacao: {
    borderBottomWidth: 0,
  },

  iconeMovimento: {
    width: 39,
    height: 39,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  info: {
    flex: 1,
  },

  movimentoTitulo: {
    fontSize: 13,
    fontWeight: "700",
    color: "#17366B",
  },

  movimentoDescricao: {
    fontSize: 11,
    color: "#667085",
    marginTop: 4,
  },

  valorContainer: {
    alignItems: "flex-end",
    maxWidth: 125,
  },

  valor: {
    fontSize: 12,
    fontWeight: "800",
  },

  data: {
    fontSize: 11,
    color: "#98A2B3",
    marginTop: 5,
  },

  vazio: {
    alignItems: "center",
    paddingVertical: 35,
    gap: 8,
  },

  vazioTitulo: {
    fontSize: 14,
    fontWeight: "700",
    color: "#17366B",
  },

  vazioDescricao: {
    fontSize: 12,
    color: "#667085",
    textAlign: "center",
  },

  rodape: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#EDF1F7",
    marginTop: 10,
  },

  rodapeTexto: {
    fontSize: 11,
    color: "#667085",
  },
});
