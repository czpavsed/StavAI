import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Project = {
  id: string;
  name: string;
  address: string;
};

const initialProjects: Project[] = [
  { id: "1", name: "Rodinný dům Kladno", address: "Kladno 123" },
  { id: "2", name: "Rekonstrukce bytu", address: "Praha 10, Růžová 12" }
];

export default function ProjectsScreen() {
  const [projects] = useState<Project[]>(initialProjects);
  const router = useRouter();

  // Navigace na přidání nové stavby
  const handleAddProject = () => {
    router.push("/add-project");
  };

  // Navigace na detail projektu
  const renderItem = ({ item }: { item: Project }) => (
    <TouchableOpacity
      style={styles.projectCard}
      onPress={() => router.push(`/projects/${item.id}`)}
    >
      <Text style={styles.projectName}>{item.name}</Text>
      <Text style={styles.projectAddress}>{item.address}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Moje stavby</Text>
      <FlatList
        data={projects}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>Žádné stavby zatím nejsou.</Text>}
      />
      <Button title="Přidat novou stavbu" onPress={handleAddProject} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  projectCard: { backgroundColor: "#eee", borderRadius: 8, padding: 16, marginBottom: 12 },
  projectName: { fontSize: 18, fontWeight: "bold" },
  projectAddress: { fontSize: 14, color: "#666" }
});
