import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  ReceiveScreen: undefined;
};

export default function Dashboard() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const recentActivities = [
    {
      type: "Payment Received",
      time: "2 hours ago",
      amount: "+300.00",
      color: "#00FF66",
      dot: "green",
    },
    {
      type: "Payment Send",
      time: "2 hours ago",
      amount: "-26.00",
      color: "#FF416C",
      dot: "red",
    },
    {
      type: "Payment Received",
      time: "2 hours ago",
      amount: "+300.00",
      color: "#00FF66",
      dot: "green",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome</Text>

        {/* Wrap profile row in TouchableOpacity */}
        <TouchableOpacity onPress={() => navigation.navigate("ReceiveScreen")}>
          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>P</Text>
            </View>
            <View>
              <Text style={styles.profileName}>Precious</Text>
              <Text style={styles.profileUid}>UID: 93746</Text>
            </View>
            <View style={styles.gearIcon} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Dashboard Value */}
      <Text style={styles.dashboardTitle}>Dashboard</Text>
      <Text style={styles.balance}>$1,250</Text>

      {/* Action Buttons */}
      <View style={styles.actionsRow}>
        {["Send", "Jobs", "Generate\nLink", "Receive"].map((label, i) => (
          <TouchableOpacity key={i} style={styles.iconCircle}>
            <Text style={styles.iconLabel}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recent Activity */}
      <Text style={styles.sectionTitle}>Recent Activity</Text>
      <View style={styles.activityList}>
        {recentActivities.map((item, idx) => (
          <View key={idx} style={styles.activityCard}>
            <View style={styles.activityLeft}>
              <View style={[styles.dot, { backgroundColor: item.dot }]} />
              <View>
                <Text style={styles.activityType}>{item.type}</Text>
                <Text style={styles.activityTime}>{item.time}</Text>
              </View>
            </View>
            <Text style={[styles.amount, { color: item.color }]}>
              {item.amount}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001F3F",
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  welcome: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 10,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FF416C",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontWeight: "bold",
  },
  profileName: {
    color: "#fff",
    fontWeight: "bold",
  },
  profileUid: {
    color: "#aaa",
    fontSize: 12,
  },
  gearIcon: {
    marginLeft: "auto",
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#888",
  },
  dashboardTitle: {
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
  },
  balance: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  iconCircle: {
    backgroundColor: "#0F2C6E",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  iconLabel: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 12,
  },
  activityList: {
    gap: 12,
  },
  activityCard: {
    backgroundColor: "#0A214B",
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  activityLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activityType: {
    color: "#fff",
    fontSize: 14,
  },
  activityTime: {
    color: "#aaa",
    fontSize: 12,
  },
  amount: {
    fontSize: 14,
    fontWeight: "600",
  },
});
