import React from "react";
import { Image } from "react-native";
import { images } from "../../../constants/images";
import styles from "./styles";

export default function Logo({ variant = "splash", style }) {
  const fonte = {
    splash: images.logoSplash,
    login: images.logoLogin,
    header: images.logoHeader,
  }[variant];

  return (
    <Image
      source={fonte}
      style={[styles[variant], style]}
      resizeMode="contain"
    />
  );
}
