import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";

const meses = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

const dadosExemplo = [
  { mes: "Jan", entradas: 4200, saidas: 2100 },
  { mes: "Fev", entradas: 5100, saidas: 2900 },
  { mes: "Mar", entradas: 4800, saidas: 2500 },
  { mes: "Abr", entradas: 6300, saidas: 3100 },
  { mes: "Mai", entradas: 5900, saidas: 3500 },
  { mes: "Jun", entradas: 7200, saidas: 4000 },
  { mes: "Jul", entradas: 6800, saidas: 3800 },
  { mes: "Ago", entradas: 7900, saidas: 4500 },
  { mes: "Set", entradas: 7500, saidas: 4100 },
  { mes: "Out", entradas: 8800, saidas: 5200 },
  { mes: "Nov", entradas: 9200, saidas: 5500 },
  { mes: "Dez", entradas: 10500, saidas: 6200 },
];

const formatarMoeda = (valor) =>
  Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

export default function ChartGrafico({ dados = dadosExemplo }) {
  const [mostrarReceitas, setMostrarReceitas] = useState(true);
  const [mostrarDespesas, setMostrarDespesas] = useState(true);

  const dadosPorMes = meses.map((mes) => {
    const encontrado = dados.find((item) => item.mes === mes);

    return {
      mes,
      entradas: Number(encontrado?.entradas || 0),
      saidas: Number(encontrado?.saidas || 0),
    };
  });

  const totalReceitas = dadosPorMes.reduce(
    (soma, item) => soma + item.entradas,
    0,
  );

  const totalDespesas = dadosPorMes.reduce(
    (soma, item) => soma + item.saidas,
    0,
  );

  const saldo = totalReceitas - totalDespesas;

  const conjuntos = [];

  if (mostrarReceitas) {
    conjuntos.push({
      data: dadosPorMes.map((item) => item.entradas),
      color: () => "#15966B",
      strokeWidth: 3,
    });
  }

  if (mostrarDespesas) {
    conjuntos.push({
      data: dadosPorMes.map((item) => item.saidas),
      color: () => "#EF4444",
      strokeWidth: 3,
    });
  }

  const larguraGrafico = Math.max(Dimensions.get("window").width - 60, 690);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.titulo}>Receitas x Despesas</Text>

          <Text style={styles.subtitulo}>Comparativo mensal</Text>
        </View>

        <View style={styles.icone}>
          <Ionicons name="stats-chart-outline" size={22} color="#1769D2" />
        </View>
      </View>

      <View style={styles.resumo}>
        <View style={styles.resumoItem}>
          <Text style={styles.resumoLabel}>Receitas</Text>
          <Text style={[styles.resumoValor, { color: "#15966B" }]}>
            {formatarMoeda(totalReceitas)}
          </Text>
        </View>

        <View style={styles.resumoItem}>
          <Text style={styles.resumoLabel}>Despesas</Text>
          <Text style={[styles.resumoValor, { color: "#EF4444" }]}>
            {formatarMoeda(totalDespesas)}
          </Text>
        </View>
      </View>

      <View style={styles.saldoBox}>
        <Text style={styles.saldoLabel}>Saldo do período</Text>

        <Text
          style={[
            styles.saldoValor,
            { color: saldo >= 0 ? "#15966B" : "#EF4444" },
          ]}
        >
          {formatarMoeda(saldo)}
        </Text>
      </View>

      <View style={styles.legenda}>
        <TouchableOpacity
          style={styles.legendaItem}
          onPress={() => setMostrarReceitas(!mostrarReceitas)}
        >
          <View
            style={[
              styles.legendaCor,
              {
                backgroundColor: mostrarReceitas ? "#15966B" : "#D0D5DD",
              },
            ]}
          />
          <Text style={styles.legendaTexto}>Receitas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.legendaItem}
          onPress={() => setMostrarDespesas(!mostrarDespesas)}
        >
          <View
            style={[
              styles.legendaCor,
              {
                backgroundColor: mostrarDespesas ? "#EF4444" : "#D0D5DD",
              },
            ]}
          />
          <Text style={styles.legendaTexto}>Despesas</Text>
        </TouchableOpacity>
      </View>

      {conjuntos.length > 0 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <LineChart
            data={{
              labels: meses,
              datasets: conjuntos,
            }}
            width={larguraGrafico}
            height={270}
            yAxisLabel=""
            yAxisSuffix=""
            fromZero
            withDots
            withShadow={false}
            withInnerLines
            withOuterLines={false}
            withVerticalLines={false}
            segments={4}
            chartConfig={{
              backgroundColor: "#FFFFFF",
              backgroundGradientFrom: "#FFFFFF",
              backgroundGradientTo: "#FFFFFF",
              decimalPlaces: 0,
              color: () => "#17366B",
              labelColor: () => "#667085",
              propsForBackgroundLines: {
                stroke: "#E5EAF2",
                strokeDasharray: "4 4",
              },
              propsForDots: {
                r: "3",
                strokeWidth: "1",
              },
              formatYLabel: (valor) => {
                const numero = Number(valor);

                return numero >= 1000
                  ? `${(numero / 1000).toFixed(0)}k`
                  : String(numero);
              },
            }}
            bezier
            style={styles.grafico}
          />
        </ScrollView>
      ) : (
        <View style={styles.vazio}>
          <Text style={styles.vazioTexto}>
            Selecione Receitas ou Despesas para visualizar.
          </Text>
        </View>
      )}

      <Text style={styles.rodape}>
        Deslize o gráfico para visualizar todos os meses.
      </Text>
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
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  headerText: {
    flex: 1,
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

  icone: {
    width: 42,
    height: 42,
    backgroundColor: "#EAF2FF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  resumo: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },

  resumoItem: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 12,
    borderRadius: 10,
  },

  resumoLabel: {
    fontSize: 12,
    color: "#667085",
    marginBottom: 7,
  },

  resumoValor: {
    fontSize: 14,
    fontWeight: "800",
  },

  saldoBox: {
    backgroundColor: "#F4F7FB",
    borderRadius: 10,
    padding: 13,
    marginBottom: 18,
  },

  saldoLabel: {
    fontSize: 12,
    color: "#667085",
  },

  saldoValor: {
    fontSize: 19,
    fontWeight: "800",
    marginTop: 5,
  },

  legenda: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 25,
    marginBottom: 15,
  },

  legendaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  legendaCor: {
    width: 11,
    height: 11,
    borderRadius: 6,
  },

  legendaTexto: {
    fontSize: 12,
    color: "#344054",
    fontWeight: "600",
  },

  grafico: {
    borderRadius: 12,
    marginLeft: -10,
  },

  vazio: {
    height: 180,
    justifyContent: "center",
    alignItems: "center",
  },

  vazioTexto: {
    color: "#667085",
    fontSize: 13,
    textAlign: "center",
  },

  rodape: {
    textAlign: "center",
    fontSize: 11,
    color: "#98A2B3",
    marginTop: 12,
  },
});
