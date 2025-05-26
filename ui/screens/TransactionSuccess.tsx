import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/navigationTypes";

type RouteParams = {
  amount: string;
  to: string;
};

export default function TransactionSuccess() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { amount, to } = route.params as RouteParams;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>Back</Text>
      </TouchableOpacity>

      <Image
        source={require("../assets/logoS.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Transaction Successfully</Text>
      <Text style={styles.sub}>
        You’ve successfully sent ${amount}
        {"\n"}to {to}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Dashboard")}
      >
        <Text style={styles.buttonText}>Dashboard</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001F3F",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  back: {
    color: "#fff",
    alignSelf: "flex-start",
    marginBottom: 20,
    fontSize: 16,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 24,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  sub: {
    color: "#ccc",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
