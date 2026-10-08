import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../src/services/supabase'; // Ajusta la ruta si es necesario

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa tu correo y contraseña.');
      return;
    }

    setLoading(true);

    try {
      // 2. Inicio de sesión real en Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      Alert.alert('¡Bienvenido!', 'Has iniciado sesión correctamente.');
      router.replace('/(client)/home'); // O redirigir según el rol del usuario
    } catch (error: any) {
      Alert.alert('Error de inicio de sesión', error.message || 'Credenciales inválidas.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoToRegister = () => {
    router.push('/auth/register');
  };

  const handleGoBackHome = () => {
    router.push('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleGoBackHome} style={styles.logoMark}>
            <Text style={styles.logoHeart}>♡</Text>
          </TouchableOpacity>
          <Text style={styles.brandTitle}>JUNTOS</Text>
          <Text style={styles.brandSubtitle}>Bienvenido de nuevo</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Iniciar sesión</Text>
          <Text style={styles.subtitle}>Ingresa a tu cuenta para gestionar el acompañamiento.</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
              style={styles.input}
              placeholder="tu@correo.com"
              placeholderTextColor="#94A3B8"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#94A3B8"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity 
            style={[styles.primaryButton, loading && { opacity: 0.7 }]} 
            onPress={handleLogin} 
            disabled={loading}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryButtonText}>{loading ? 'Entrando...' : 'Entrar'}</Text>
          </TouchableOpacity>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>¿No tienes una cuenta? </Text>
            <TouchableOpacity onPress={handleGoToRegister}>
              <Text style={styles.linkText}>Créala aquí</Text>
            </TouchableOpacity>
          </View>

        </View>

        <TouchableOpacity onPress={handleGoBackHome} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Volver al inicio</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F9FC' },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 40, alignItems: 'center' },
  headerContainer: { alignItems: 'center', marginBottom: 25 },
  logoMark: { width: 56, height: 56, borderRadius: 18, backgroundColor: '#E0F2FE', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  logoHeart: { fontSize: 34, color: '#0284C7', fontWeight: '700' },
  brandTitle: { fontSize: 26, fontWeight: '900', color: '#102A43', letterSpacing: 2 },
  brandSubtitle: { fontSize: 13, color: '#0284C7', fontWeight: '600', marginTop: 4 },
  card: { width: '100%', maxWidth: 440, backgroundColor: '#FFFFFF', borderRadius: 24, padding: 30, shadowColor: '#102A43', shadowOpacity: 0.08, shadowRadius: 20, shadowOffset: { width: 0, height: 8 }, elevation: 4, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: '900', color: '#102A43', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#627D98', marginBottom: 24, lineHeight: 20 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '700', color: '#334E68', marginBottom: 8 },
  input: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 13, fontSize: 14, color: '#102A43' },
  primaryButton: { backgroundColor: '#0284C7', paddingVertical: 15, borderRadius: 12, alignItems: 'center', marginTop: 10, marginBottom: 20 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
  footerRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  footerText: { fontSize: 13, color: '#627D98' },
  linkText: { fontSize: 13, color: '#0284C7', fontWeight: '800' },
  backButton: { paddingVertical: 10 },
  backButtonText: { fontSize: 14, color: '#334E68', fontWeight: '700' },
});