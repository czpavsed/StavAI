import * as Google from "expo-auth-session/providers/google";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect } from "react";
import { Alert, Button, Text, View } from "react-native";

import { useAuth } from "@/contexts/AuthContext";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: "827993045726-84adk1l6nlenvb9um753tt72dcpqu6je.apps.googleusercontent.com", // Web client ID!
    iosClientId: "827993045726-84adk1l6nlenvb9um753tt72dcpqu6je.apps.googleusercontent.com", // Pokud budeš buildit na iOS, přidáš
    // androidClientId: "", // Pokud budeš buildit na Android, přidáš
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      const fetchInfo = async () => {
        try {
          const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${authentication?.accessToken}` },
          });
          const info = await res.json();
          setUser({ name: info.name, email: info.email, picture: info.picture });
        } catch (e) {
          console.error(e);
        }
      };
      fetchInfo();

      Alert.alert("Přihlášení proběhlo úspěšně!");
      router.replace("/(tabs)");
    }
  }, [response, setUser, router]);

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
