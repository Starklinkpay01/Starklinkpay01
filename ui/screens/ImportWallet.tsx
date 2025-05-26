import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import type { RootStackParamList } from "../types/navigationTypes";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function ImportWallet() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [words, setWords] = useState<string[]>(Array(12).fill(""));
  const [success, setSuccess] = useState(false);

  const handleWordChange = (text: string, index: number) => {
    const updated = [...words];
    updated[index] = text.trim();
    setWords(updated);
  };

  const handleImport = async () => {
    const mnemonic = words.join(" ").trim();
    if (mnemonic.split(" ").length === 12) {
      await SecureStore.setItemAsync("mnemonic", mnemonic);
      setSuccess(true);
      navigation.navigate("Dashboard");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Import Wallet</Text>

        <View style={styles.grid}>
          {words.map((word, index) => (
            <View key={index} style={styles.wordBox}>
              <Text style={styles.wordIndex}>{index + 1}</Text>
              <TextInput
                style={styles.input}
                placeholder="Word"
                placeholderTextColor="#8899AA"
                value={word}
                onChangeText={(text) => handleWordChange(text, index)}
              />
            </View>
          ))}
        </View>

        {success && (
          <Text style={styles.success}>WALLET SUCCESSFULLY IMPORTED</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={handleImport}>
          <Text style={styles.buttonText}>Go To Dashboard</Text>
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
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  wordBox: {
    width: "47%",
    backgroundColor: "#162D4D",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  wordIndex: {
    color: "#8899AA",
    fontSize: 12,
    marginBottom: 4,
  },
  input: {
    color: "#fff",
    fontSize: 16,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#8899AA",
  },
  success: {
    color: "#00FF66",
    textAlign: "center",
    marginBottom: 20,
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
