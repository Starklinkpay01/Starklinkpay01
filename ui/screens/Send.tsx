import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function Send() {
  const [amount, setAmount] = useState('');
  const [to, setTo] = useState('');

  const sendPayment = () => {
    if (!to || !amount) {
      Alert.alert('Error', 'Please fill in both fields.');
      return;
    }
    console.log(`Sending ${amount} STRK to ${to}`);
    Alert.alert('Success', `Sent ${amount} STRK to ${to}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send STRK</Text>

      <TextInput
        style={styles.input}
        placeholder="Recipient Wallet Address"
        placeholderTextColor="#888"
        value={to}
        onChangeText={setTo}
      />

      <TextInput
        style={styles.input}
        placeholder="Amount (STRK)"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <TouchableOpacity style={styles.button} onPress={sendPayment}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001F3F',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#FF416C',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
});
