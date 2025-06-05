import React, { useState } from 'react';
import { Image } from 'expo-image';
import { View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuth } from '@/contexts/AuthContext';

export default function UserTopBar() {
  const { user } = useAuth();
  const colorScheme = useColorScheme();
  const [error, setError] = useState(false);

  if (!user) {
    return null;
  }

  return (
    <View
      style={{
        height: 50,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: Colors[colorScheme ?? 'light'].background,
      }}
    >
      {error || !user.picture ? (
        <MaterialIcons name="person" size={32} color={Colors[colorScheme ?? 'light'].text} />
      ) : (
        <Image
          source={{ uri: user.picture }}
          onError={() => setError(true)}
          style={{ width: 32, height: 32, borderRadius: 16 }}
        />
      )}
    </View>
  );
}
