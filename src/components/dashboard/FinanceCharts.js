import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Path, Line, Rect, Circle } from "react-native-svg";

export default function FinanceCharts() {
  return (
    <View style={styles.container}>
      {/* Gráfico de linhas */}
      <View style={styles.card}>
        <Text style={styles.title}>Receitas x Despesas</Text>

        <Svg width="100%" height={155} viewBox="0 0 160 130">
          <Line x1="8" y1="112" x2="152" y2="112" stroke="#E7EFF9" />

          <Path
            d="M 10 95 L 45 70 L 80 92 L 115 52 L 150 35"
            stroke="#10A981"
            strokeWidth="3"
            fill="none"
          />

          <Path
            d="M 10 104 L 45 90 L 80 95 L 115 65 L 150 58"
            stroke="#1478F8"
            strokeWidth="3"
            fill="none"
          />

          <Circle cx="45" cy="70" r="3.5" fill="#10A981" />
          <Circle cx="115" cy="52" r="3.5" fill="#10A981" />
          <Circle cx="150" cy="35" r="3.5" fill="#10A981" />

          <Circle cx="80" cy="95" r="3.5" fill="#1478F8" />
          <Circle cx="150" cy="58" r="3.5" fill="#1478F8" />
        </Svg>

        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: "#10A981" }]} />
            <Text style={styles.legendText}>Receitas</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: "#1478F8" }]} />
            <Text style={styles.legendText}>Despesas</Text>
          </View>
        </View>
      </View>

      {/* Gráfico de barras */}
      <View style={styles.card}>
        <Text style={styles.title}>Atividade Financeira</Text>

        <Svg width="100%" height={155} viewBox="0 0 160 130">
          <Line
            x1="8"
            y1="115"
            x2="152"
            y2="115"
            stroke="#D8E6F7"
            strokeWidth="1.5"
          />
          <Line
            x1="8"
            y1="15"
            x2="8"
            y2="115"
            stroke="#D8E6F7"
            strokeWidth="1.5"
          />

          {[35, 45, 62, 76, 95].map((altura, index) => (
            <Rect
              key={index}
              x={25 + index * 25}
              y={115 - altura}
              width="16"
              height={altura}
              rx="3"
              fill="#C8DFFB"
            />
          ))}
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 12,
    paddingTop: 20,
  },
  card: {
    flex: 1,
    minWidth: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 12,
    minHeight: 240,
    justifyContent: "space-between",
  },
  title: {
    color: "#17366B",
    fontSize: 13,
    fontWeight: "700",
  },
  legend: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    color: "#244C7C",
    fontSize: 10,
  },
});
