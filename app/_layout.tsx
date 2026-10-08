import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { supabase } from '../src/services/supabase';
import { View, ActivityIndicator } from 'react-native';

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Verificar sesión activa en Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    // Escuchar cambios de autenticación (Login / Logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <ActivityIndicator size="large" color="#0284C7" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        // Rutas cuando el usuario ha iniciado sesión
        <>
          <Stack.Screen name="(client)/home" />
          <Stack.Screen name="profile/user-profile" />
          <Stack.Screen name="wallet/payment-wallet" />
          <Stack.Screen name="payments/payment-methods-config" />
          <Stack.Screen name="notifications/push-notifications" />
          <Stack.Screen name="chat/internal-chat" />
          <Stack.Screen name="client/care-preferences" />
          <Stack.Screen name="client/favorite-locations" />
          <Stack.Screen name="kyc/companion-kyc" />
          <Stack.Screen name="matching/rating" />
        </>
      ) : (
        // Ruta de autenticación pública
        <Stack.Screen name="auth/login" />
      )}
    </Stack>
  );
}