import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Clipboard,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useNavigation } from "@react-navigation/native";

export default function ReceiveScreen() {
  const navigation = useNavigation();
  const address =
    "ton://transfer/UQDQqQWorZCjABWiCajP6Huhiih1Io42WVWQd3opn1-3-ETxO";

  const handleCopy = () => {
    Clipboard.setString(address);
    alert("Address copied!");
  };

  const tokens = [
    { symbol: "STRK", value: "750.00", bg: "#FF5F5F" },
    { symbol: "USDT", value: "300.00", bg: "#4D9EFF" },
    { symbol: "ETH", value: "0.50", bg: "#5FFFB0" },
  ];

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>Back</Text>
      </TouchableOpacity>

      {/* Tokens */}
      {tokens.map((t, idx) => (
        <View key={idx} style={styles.tokenCard}>
          <View style={[styles.tokenIcon, { backgroundColor: t.bg }]}>
            <Text style={styles.iconLetter}>{t.symbol[0]}</Text>
          </View>
          <Text style={styles.tokenLabel}>{t.symbol}</Text>
          <Text style={styles.tokenValue}>{t.value}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Receive</Text>

      <View style={styles.qrWrapper}>
        <QRCode value={address} size={160} />
      </View>

      <Text style={styles.address}>{address}</Text>

      <TouchableOpacity style={styles.copyBtn} onPress={handleCopy}>
        <Text style={styles.copyText}>Copy Address</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001F3F",
    padding: 20,
  },
  back: {
    color: "#FF416C",
    fontSize: 16,
    marginBottom: 20,
  },
  tokenCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0A214B",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  tokenIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  iconLetter: {
    color: "#fff",
    fontWeight: "bold",
  },
  tokenLabel: {
    color: "#fff",
    fontWeight: "bold",
    flex: 1,
  },
  tokenValue: {
    color: "#fff",
    fontSize: 14,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 20,
  },
  qrWrapper: {
    alignItems: "center",
    marginBottom: 12,
  },
  address: {
    color: "#8DA9FF",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 20,
  },
  copyBtn: {
    backgroundColor: "#FF416C",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  copyText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
