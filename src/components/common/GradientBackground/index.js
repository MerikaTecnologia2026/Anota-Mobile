import React from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../../theme";
import styles from "./styles";

export default function GradientBackground({ children, style }) {
  return (
    <LinearGradient
      colors={colors.gradienteSplash}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={[styles.base, style]}
    >
      <View style={styles.bandaTopo} />
      <View style={styles.linhaTopo} />
      <View style={styles.bandaBase} />
      <View style={styles.linhaBase} />
      {children}
    </LinearGradient>
  );
}
