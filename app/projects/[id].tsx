import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function ProjectDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail stavby</Text>
      <Text>ID: {id}</Text>
      <Text>Název stavby: (dynamicky z DB)</Text>
      <Text>Adresa: (dynamicky z DB)</Text>
      <Button
        title="Přidat zápis do deníku"
        onPress={() => router.push(`${id}/add-log`)} // Cíluje na /app/(tabs)/projects/[id]/add-log.tsx
      />
      {/* Seznam deníkových záznamů */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 12 }
});
