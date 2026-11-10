import React from "react";
import { Animated, View } from "react-native";
import styles from "./styles";

export default function ProgressBar({ progress, style }) {
  const largura = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={[styles.trilho, style]}>
      <Animated.View style={[styles.barra, { width: largura }]} />
    </View>
  );
}
