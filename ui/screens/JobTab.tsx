import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function JobTab() {
  const jobs = [
    {
      title: "Build landing page",
      price: "30 STRK",
      description:
        "Design and develop a responsive landing page for a product.",
    },
    {
      title: "Translate website",
      price: "15 STRK",
      description: "Translate an existing website from English to French.",
    },
  ];

  const handleApply = (title: string) => {
    Alert.alert("Job Applied", `You applied for "${title}"`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Available Jobs</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {jobs.map((job, idx) => (
          <View key={idx} style={styles.jobCard}>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={styles.jobDesc}>{job.description}</Text>
            <Text style={styles.jobPrice}>{job.price}</Text>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => handleApply(job.title)}
            >
              <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001F3F",
    paddingTop: 60,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  jobCard: {
    backgroundColor: "#0A1E3F",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 6,
  },
  jobDesc: {
    color: "#ccc",
    marginBottom: 10,
    fontSize: 14,
  },
  jobPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#00FF66",
    marginBottom: 12,
  },
  applyButton: {
    backgroundColor: "#FF416C",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  applyText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});
