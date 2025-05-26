import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Clipboard,
  Alert,
} from "react-native";

export default function GenerateLinkScreen() {
  const [link, setLink] = useState("");

  useEffect(() => {
    const sampleLink = `starklinkpay://pay?to=0xYourWalletAddress&amount=10`;
    setLink(sampleLink);
  }, []);

  const copyToClipboard = async () => {
    Clipboard.setString(link);
    Alert.alert("Copied", "Payment link copied to clipboard.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Your Payment Link:</Text>
      <View style={styles.linkBox}>
        <Text style={styles.linkText}>{link}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={copyToClipboard}>
        <Text style={styles.buttonText}>Copy Link</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001F3F",
    padding: 24,
    justifyContent: "center",
  },
  label: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 12,
    textAlign: "center",
  },
  linkBox: {
    backgroundColor: "#0A1E3F",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  linkText: {
    color: "#fff",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#FF416C",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
