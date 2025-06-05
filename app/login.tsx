import * as Google from "expo-auth-session/providers/google";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect } from "react";
import { Alert, Button, Text, View } from "react-native";

import { useAuth } from "@/contexts/AuthContext";
import { Buffer } from "buffer";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "827993045726-84adk1l6nlenvb9um753tt72dcpqu6je.apps.googleusercontent.com", // Web client ID!
    iosClientId:
      "827993045726-84adk1l6nlenvb9um753tt72dcpqu6je.apps.googleusercontent.com", // Pokud budeš buildit na iOS, přidáš
    // androidClientId: "", // Pokud budeš buildit na Android, přidáš
    scopes: ["openid", "profile", "email"],
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      (async () => {
        try {
          let info: { name: string; email: string; picture: string } | null = null;

          // Decode the ID token first so we don't rely on an additional request
          const idToken = authentication?.idToken;
          if (idToken) {
            try {
              const base64 = idToken.split(".")[1];
              const decoded = JSON.parse(
                Buffer.from(base64, "base64").toString("utf8")
              );
              info = {
                name: decoded.name,
                email: decoded.email,
                picture: decoded.picture,
              };
            } catch {
              // ignore decode errors
            }
          }

          if (!info) {
            const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
              headers: { Authorization: `Bearer ${authentication?.accessToken}` },
            });
            info = await res.json();
          }

          if (info) {
            setUser({ name: info.name, email: info.email, picture: info.picture });
          }
        } catch (e) {
          console.error(e);
        }

        Alert.alert("Přihlášení proběhlo úspěšně!");
        router.replace("/(tabs)");
      })();
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
