import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function ProjectDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Tady budeš později tahat reálná data projektu podle ID (z databáze)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail stavby</Text>
      <Text>ID: {id}</Text>
      <Text>Název stavby: (dynamicky z Firestore)</Text>
      <Text>Adresa: (dynamicky z Firestore)</Text>
      <Button title="Přidat zápis do deníku" onPress={() => router.push(`/projects/${id}/add-log`)} />
      {/* Seznam deníkových záznamů zde */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 12 }
});
