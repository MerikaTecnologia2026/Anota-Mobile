import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import styles from "./styles";

export default function Header({
  onMenuPress,
  onNotificationPress,
  hasNotifications = false,
}) {
  return (
    <View style={styles.container}>
      {/* Menu */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={onMenuPress}
        accessibilityLabel="Abrir menu"
      >
        <Ionicons name="menu" size={30} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Logotipo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../../assets/logo-header.png")}
          style={{ width: 120, height: 55 }}
          resizeMode="contain"
        />
      </View>

      {/* Notificações */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={onNotificationPress}
        accessibilityLabel="Notificações"
      >
        <Ionicons name="notifications-outline" size={27} color="#FFFFFF" />

        {hasNotifications && <View style={styles.notificationBadge} />}
      </TouchableOpacity>
    </View>
  );
}
