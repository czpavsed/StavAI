import { useRouter } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>StavAI – Úvodní stránka</Text>
      <Button title="Přihlásit se" onPress={() => router.push("/login")} />
      <Button title="Registrovat se" onPress={() => router.push("/register")} />
    </View>
  );
}
