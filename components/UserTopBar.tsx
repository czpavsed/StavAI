import React from 'react';
import { Image, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuth } from '@/contexts/AuthContext';

export default function UserTopBar() {
  const { user } = useAuth();
  const colorScheme = useColorScheme();

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
      <Image
        source={{ uri: user.picture }}
        style={{ width: 32, height: 32, borderRadius: 16 }}
      />
    </View>
  );
}
