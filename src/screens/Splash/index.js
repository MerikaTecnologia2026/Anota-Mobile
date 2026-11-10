import React, { useEffect, useRef } from "react";
import { Animated, Easing, StatusBar, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GradientBackground, Logo, ProgressBar } from "../../components/common";
import styles from "./styles";

const DURACAO = 2500;

export default function Splash({ onFinish }) {
  const insets = useSafeAreaInsets();
  const opacidade = useRef(new Animated.Value(0)).current;
  const escala = useRef(new Animated.Value(0.92)).current;
  const progresso = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacidade, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.timing(escala, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    Animated.timing(progresso, {
      toValue: 1,
      duration: DURACAO,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished && onFinish) onFinish();
    });
  }, []);

  return (
    <GradientBackground>
      <StatusBar barStyle="light-content" />

      <View style={styles.centro}>
        <Animated.View
          style={{
            opacity: opacidade,
            transform: [{ scale: escala }],
            alignItems: "center",
          }}
        >
          <Logo variant="splash" />
          <Text style={styles.slogan}>
            GESTÃO INTELIGENTE{"\n"}PARA SEU NEGÓCIO
          </Text>
        </Animated.View>
      </View>

      <View style={[styles.rodape, { bottom: insets.bottom + 56 }]}>
        <ProgressBar progress={progresso} />
      </View>
    </GradientBackground>
  );
}
