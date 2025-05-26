import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { generateMnemonic } from "../utils/wallet";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  ConfirmWallet: undefined;
};

export default function CreateWallet() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [mnemonicWords, setMnemonicWords] = useState<string[]>([]);

  useEffect(() => {
    try {
      const mnemonic = generateMnemonic();
      const words = mnemonic.trim().split(" ");
      setMnemonicWords(words);
      SecureStore.setItemAsync("mnemonic", mnemonic);
    } catch (err) {
      console.error("Error generating mnemonic:", err);
    }
  }, []);

  const handleContinue = () => {
    navigation.navigate("ConfirmWallet");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Create Wallet</Text>

        {mnemonicWords.length === 0 ? (
          <Text style={styles.loading}>Generating mnemonic...</Text>
        ) : (
          <View style={styles.grid}>
            {mnemonicWords.map((word, index) => (
              <View key={index} style={styles.wordCard}>
                <Text style={styles.wordIndex}>{index + 1}</Text>
                <Text style={styles.wordText}>{word}</Text>
              </View>
            ))}
          </View>
        )}

        <Text style={styles.warning}>Keep These Phrases Safe</Text>

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001F3F",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  back: {
    color: "#FF416C",
    fontSize: 16,
    marginBottom: 12,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  loading: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 20,
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
  warning: {
    color: "#FF416C",
    textAlign: "center",
    marginVertical: 24,
    fontWeight: "500",
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
    letterSpacing: 1,
  },
});
