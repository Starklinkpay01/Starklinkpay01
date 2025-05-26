import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/navigationTypes";

export default function WelcomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcome}>Welcome to</Text>
      <Text style={styles.appName}>StarkLinkPay</Text>

      <Image
        source={require("../assets/logoS.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CreateWallet")}
      >
        <Text style={styles.buttonText}>Create New Wallet</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.outlineButton}
        onPress={() => navigation.navigate("ImportWallet")}
      >
        <Text style={styles.outlineButtonText}>Import Wallet</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001F3F",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  welcome: {
    color: "#ccc",
    fontSize: 16,
  },
  appName: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 16,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 48,
  },
  button: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: "#fff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
  },
  outlineButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
