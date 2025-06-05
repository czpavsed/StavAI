import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function AddProjectScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const handleSave = () => {
    // Tady později uložíme do Firestore, zatím jen alert a návrat
    if (!name.trim() || !address.trim()) {
      alert("Vyplňte název a adresu stavby!");
      return;
    }
    // Zatím návrat do seznamu (budeš doplňovat později logiku ukládání)
    router.replace("/projects");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Přidat novou stavbu</Text>
      <TextInput
        style={styles.input}
        placeholder="Název stavby"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Adresa stavby"
        value={address}
        onChangeText={setAddress}
      />
      <Button title="Uložit stavbu" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff", justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16, alignSelf: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 16 }
});
