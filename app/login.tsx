import * as Google from "expo-auth-session/providers/google";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect } from "react";
import { Alert, Button, Text, View } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const router = useRouter();

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: "827993045726-84adk1l6nlenvb9um753tt72dcpqu6je.apps.googleusercontent.com", // Web client ID!
    iosClientId: "827993045726-84adk1l6nlenvb9um753tt72dcpqu6je.apps.googleusercontent.com", // Pokud budeš buildit na iOS, přidáš
    // androidClientId: "", // Pokud budeš buildit na Android, přidáš
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      // authentication.accessToken, authentication.idToken
      Alert.alert("Přihlášení proběhlo úspěšně!");
      // Zde si můžeš uložit uživatele, nebo zavolat svoje API, nebo přesměrovat:
      router.replace("/(tabs)");
    }
  }, [response]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        StavAI – Přihlášení přes Google
      </Text>
      <Button
        disabled={!request}
        title="Přihlásit se přes Google"
        onPress={() => promptAsync()}
      />
    </View>
  );
}
