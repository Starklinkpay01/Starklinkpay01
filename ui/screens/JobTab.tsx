import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function JobTab() {
  const jobs = [
    { title: 'Build landing page', price: '30 STRK' },
    { title: 'Translate website', price: '15 STRK' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Available Jobs</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {jobs.map((job, idx) => (
          <View key={idx} style={styles.jobCard}>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={styles.jobPrice}>{job.price}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001F3F',
    paddingTop: 60,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  jobCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
    color: '#001F3F',
  },
  jobPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FF416C',
  },
});
