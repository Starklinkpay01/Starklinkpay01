import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/navigationTypes";

export default function ConfirmWallet() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const mnemonic = await SecureStore.getItemAsync("mnemonic");
      if (mnemonic) {
        const wordList = mnemonic.trim().split(" ");
        setWords(wordList);
      }
    })();
  }, []);

  const handleNavigate = () => {
    navigation.navigate("Dashboard");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Confirm Wallet</Text>

      <View style={styles.grid}>
        {words.map((word, index) => (
          <View key={index} style={styles.wordCard}>
            <Text style={styles.wordIndex}>{index + 1}</Text>
            <Text style={styles.wordText}>{word}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.success}>WALLET CREATED SUCCESSFULLY</Text>

      <TouchableOpacity style={styles.button} onPress={handleNavigate}>
        <Text style={styles.buttonText}>Go To Dashboard</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001F3F",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  wordCard: {
    width: "47%",
    backgroundColor: "#162D4D",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    justifyContent: "center",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 12,
  },
  wordIndex: {
    color: "#8899AA",
    fontSize: 12,
    marginBottom: 6,
  },
  wordText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  success: {
    color: "#00FF66",
    textAlign: "center",
    marginVertical: 16,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#FF416C",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
