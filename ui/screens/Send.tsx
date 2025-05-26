import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Clipboard,
} from "react-native";
import { uint256, shortString } from "starknet";
import { Provider, Account, Contract } from "starknet";
import paymentAbi from "../utils/abi/payment_abi.json";
import { getWallet } from "../utils/useWallet";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  TransactionSuccess: { amount: string; to: string };
  // Add other screens if needed
};

export default function Send() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [amount, setAmount] = useState("");
  const [to, setTo] = useState("");
  const [account, setAccount] = useState<Account | null>(null);
  const [provider, setProvider] = useState<Provider | null>(null);
  const USDT_CONTRACT = "<USDT_CONTRACT_ADDRESS>"; // Replace

  useEffect(() => {
    (async () => {
      try {
        const { account, provider } = await getWallet();
        setAccount(account);
        setProvider(provider);
      } catch (err) {
        Alert.alert("Wallet Error", "Unable to load wallet credentials");
      }
    })();
  }, []);

  const sendPayment = async () => {
    if (!to || !amount) {
      Alert.alert("Error", "Please fill in both fields.");
      return;
    }

    if (!account || !provider) {
      Alert.alert("Wallet not ready", "Please wait...");
      return;
    }

    try {
      const token = new Contract(paymentAbi.abi, USDT_CONTRACT, account);
      const parsedAmount = uint256.bnToUint256(
        BigInt(Math.floor(Number(amount) * 1e18))
      );
      const res = await token.invoke("transfer", [to, parsedAmount]);
      await provider.waitForTransaction(res.transaction_hash);

      setAmount("");
      setTo("");
      navigation.navigate("TransactionSuccess", { amount, to });
    } catch (err) {
      console.error(err);
      Alert.alert("Transaction Failed", err.message);
    }
  };

  async function pasteFromClipboard() {
    try {
      const address = await Clipboard.getString();
      if (address) {
        setTo(address);
      } else {
        Alert.alert("Clipboard Empty", "No address found in clipboard.");
      }
    } catch (err) {
      Alert.alert("Clipboard Error", "Failed to read from clipboard.");
    }
  }
  function useMax() {
    // For now, hardcode the max balance as shown in the UI (300.00)
    // In a real app, fetch the actual balance from the contract/account
    setAmount("300.00");
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Currency</Text>
      <View style={styles.tokenBox}>
        <Text style={styles.token}>USDT</Text>
        <Text style={styles.balance}>300.00</Text>
      </View>

      <Text style={styles.label}>Enter Amount</Text>
      <View style={styles.rowBox}>
        <TextInput
          style={styles.input}
          placeholder="Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <TouchableOpacity style={styles.actionBtn} onPress={useMax}>
          <Text style={styles.actionText}>MAX</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Enter Address</Text>
      <View style={styles.rowBox}>
        <TextInput
          style={styles.input}
          placeholder="Recipient Address"
          value={to}
          onChangeText={setTo}
        />
        <TouchableOpacity style={styles.actionBtn} onPress={pasteFromClipboard}>
          <Text style={styles.actionText}>PASTE</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.sendButton} onPress={sendPayment}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001F3F",
    padding: 20,
  },
  label: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 6,
  },
  tokenBox: {
    backgroundColor: "#0A1E3F",
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    marginBottom: 16,
  },
  token: {
    color: "#fff",
    fontSize: 16,
  },
  balance: {
    color: "#fff",
    fontWeight: "bold",
  },
  rowBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0A1E3F",
    borderRadius: 10,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    color: "#fff",
    padding: 12,
  },
  actionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#6C4157",
    borderRadius: 8,
    marginRight: 8,
  },
  actionText: {
    color: "#fff",
  },
  sendButton: {
    backgroundColor: "#FF6B6B",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
