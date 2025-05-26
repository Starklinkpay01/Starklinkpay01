import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  CreateWallet: undefined;
  ImportWallet: undefined;
};

export default function WelcomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to</Text>
      <Text style={styles.title}>StarkLinkPay</Text>

      {/* <Image
        source={require('../assets/starklink-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      /> */}

      <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('CreateWallet')}>
        <Text style={styles.primaryButtonText}>Create New Wallet</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('ImportWallet')}>
        <Text style={styles.secondaryButtonText}>Import Wallet</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001F3F',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  welcome: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 4,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#FF416C',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 16,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    borderColor: '#FFFFFF',
    borderWidth: 2,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
