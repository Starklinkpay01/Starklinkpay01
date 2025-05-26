import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

export default function FreelancerProfileScreen() {
  const [category, setCategory] = useState("");
  const [experience, setExperience] = useState("");
  const [rate, setRate] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const navigation = useNavigation();

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });
    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleContinue = () => {
    if (!category || !experience || !rate) {
      alert("Please complete all fields.");
      return;
    }
    // Save or send profile info here
    navigation.goBack(); // or navigate to Dashboard/JobTab
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        To Start Working as Freelancer{"\n"}Complete Your Profile
      </Text>

      <TouchableOpacity onPress={handlePickImage} style={styles.imageWrapper}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.imagePlaceholder}>📷</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.label}>Category</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Web Development"
        placeholderTextColor="#aaa"
        value={category}
        onChangeText={setCategory}
      />

      <Text style={styles.label}>Years Of Experience</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 3"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={experience}
        onChangeText={setExperience}
      />

      <Text style={styles.label}>Hourly Rate (In USD)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 20"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={rate}
        onChangeText={setRate}
      />

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
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
  title: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  imageWrapper: {
    alignSelf: "center",
    marginBottom: 20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imagePlaceholder: {
    fontSize: 24,
  },
  label: {
    color: "#ccc",
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#0A1E3F",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: "#FF6B6B",
    marginTop: 24,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
