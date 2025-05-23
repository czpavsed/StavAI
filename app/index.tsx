import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { auth } from "../constants/firebaseConfig";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/"); // Po přihlášení na domovskou stránku
    } catch (error: any) {
      Alert.alert("Přihlášení se nezdařilo", error.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>StavAI – Přihlášení</Text>
      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Heslo"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button title={loading ? "Přihlašuji..." : "Přihlásit se"} onPress={handleLogin} disabled={loading} />
      <Text
        style={styles.registerText}
        onPress={() => router.push("/register")}
      >
        Nemáte účet? Zaregistrujte se
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 32 },
  input: { width: "100%", borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 16 },
  registerText: { color: "#1e90ff", marginTop: 16 },
});
