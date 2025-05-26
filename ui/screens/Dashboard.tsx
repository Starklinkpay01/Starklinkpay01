import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Modal } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getYieldBalance } from "../utils/payment.contract";

type RootStackParamList = {
  ReceiveScreen: undefined;
  JobTab: undefined;
  Send: undefined;
  FreelancerProfile: undefined;
  GenerateLinkScreen: undefined;
};

export default function Dashboard() {
  const [balance, setBalance] = useState<string>("...");
  const [showProfileModal, setShowProfileModal] = useState(true);

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

  useEffect(() => {
    getYieldBalance().then(setBalance).catch(console.error);
  }, []);

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
      <Text style={styles.balance}>${balance}</Text>

      {/* Action Buttons */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.iconCircle}
          onPress={() => navigation.navigate("Send")}
        >
          <Text style={styles.iconLabel}>Send</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconCircle}
          onPress={() => navigation.navigate("JobTab")}
        >
          <Text style={styles.iconLabel}>Jobs</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconCircle}
          onPress={() => navigation.navigate("GenerateLinkScreen")}
        >
          <Text style={styles.iconLabel}>Generate{"\n"}Link</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconCircle}
          onPress={() => navigation.navigate("ReceiveScreen")}
        >
          <Text style={styles.iconLabel}>Receive</Text>
        </TouchableOpacity>
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
      <Modal visible={showProfileModal} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Select Profile</Text>

            <TouchableOpacity
              style={styles.hireBtn}
              onPress={() => {
                setShowProfileModal(false);
                navigation.navigate("JobTab");
              }}
            >
              <Text style={styles.modalBtnText}>I Want To Hire</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.workBtn}
              onPress={() => {
                setShowProfileModal(false);
                navigation.navigate("FreelancerProfile");
              }}
            >
              <Text style={styles.modalBtnText}>I Want To Work</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowProfileModal(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "flex-end",
  },

  modalBox: {
    backgroundColor: "#001F3F",
    padding: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },

  modalTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },

  hireBtn: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 14,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 12,
  },

  workBtn: {
    borderColor: "#fff",
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 12,
  },

  modalBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  closeText: {
    color: "#ccc",
    marginTop: 10,
  },
});
