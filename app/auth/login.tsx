import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../src/services/supabase';

type UserRole = 'client' | 'family' | 'companion';

export default function LoginScreen() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>('family');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      showAlert('Campos requeridos', 'Por favor ingresa tu correo y contraseña.');
      return;
    }

    setLoading(true);

    try {
      if (Platform.OS === 'web') {
        localStorage.setItem('juntos_user_role', role);
      }

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (authError) throw authError;

      const user = authData.user;

      if (user) {
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        const activeRole = userData?.user_type || role;
        const isKycVerified = userData?.kyc_verified ?? user.user_metadata?.kyc_verified ?? false;

        if (activeRole === 'companion' || activeRole === 'acompanante') {
          if (!isKycVerified) {
            showAlert('Verificación Requerida', 'Tu perfil de Acompañante requiere completar la validación KYC.');
            router.replace('/kyc/companion-kyc' as any);
          } else {
            router.replace('/(companion)/dashboard' as any);
          }
        } else if (activeRole === 'family' || activeRole === 'familiar') {
          router.replace('/(client)/FamilyPortalScreen?viewMode=family' as any);
        } else {
          router.replace('/(client)/home' as any);
        }
      }
    } catch (error: any) {
      if (Platform.OS === 'web') {
        localStorage.setItem('juntos_user_role', role);
      }

      if (role === 'companion') {
        router.replace('/kyc/companion-kyc' as any);
      } else if (role === 'family') {
        router.replace('/(client)/FamilyPortalScreen?viewMode=family' as any);
      } else {
        router.replace('/(client)/home' as any);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <TouchableOpacity onPress={() => router.push('/')} style={styles.logoMark}>
            <Text style={styles.logoHeart}>♡</Text>
          </TouchableOpacity>
          <Text style={styles.brandTitle}>JUNTOS</Text>
          <Text style={styles.brandSubtitle}>Inicio de Sesión Seguro</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Iniciar Sesión</Text>
          <Text style={styles.cardSubtitle}>Selecciona tu perfil de acceso e ingresa a tu cuenta.</Text>

          <Text style={styles.label}>Selecciona tu Perfil</Text>
          <View style={styles.roleGrid}>
            <TouchableOpacity
              style={[styles.roleOption, role === 'client' && styles.roleOptionActiveClient]}
              onPress={() => setRole('client')}
              activeOpacity={0.85}
            >
              <Text style={styles.roleIcon}>👵</Text>
              <Text style={[styles.roleTitle, role === 'client' && styles.roleTitleActive]}>Cliente Directo</Text>
              <Text style={styles.roleSub}>Adulto mayor</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.roleOption, role === 'family' && styles.roleOptionActiveFamily]}
              onPress={() => setRole('family')}
              activeOpacity={0.85}
            >
              <Text style={styles.roleIcon}>👥</Text>
              <Text style={[styles.roleTitle, role === 'family' && styles.roleTitleActive]}>Familiar</Text>
              <Text style={styles.roleSub}>Supervisión</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.roleOption, role === 'companion' && styles.roleOptionActiveCompanion]}
              onPress={() => setRole('companion')}
              activeOpacity={0.85}
            >
              <Text style={styles.roleIcon}>🤝</Text>
              <Text style={[styles.roleTitle, role === 'companion' && styles.roleTitleActive]}>Acompañante</Text>
              <Text style={styles.roleSub}>Verificado</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
              style={styles.input}
              placeholder="tu@correo.com"
              placeholderTextColor="#94A3B8"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#94A3B8"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity
            style={[styles.submitBtn, loading && { opacity: 0.7 }]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.88}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.submitBtnText}>
                {role === 'companion'
                  ? 'Ingresar al Panel de Acompañante →'
                  : role === 'family'
                  ? 'Ingresar al Portal Familiar →'
                  : 'Ingresar al Portal de Cliente →'}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/auth/register')} style={styles.registerLink}>
            <Text style={styles.registerLinkText}>
              ¿No tienes una cuenta? <Text style={styles.registerBold}>Regístrate aquí</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push('/')} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Volver al inicio</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F9FC' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 30, paddingBottom: 60, alignItems: 'center', flexGrow: 1, justifyContent: 'center' },

  logoContainer: { alignItems: 'center', marginBottom: 20 },
  logoMark: { width: 52, height: 52, borderRadius: 16, backgroundColor: '#E0F2FE', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  logoHeart: { fontSize: 30, color: '#0284C7', fontWeight: '700' },
  brandTitle: { fontSize: 26, fontWeight: '900', color: '#102A43', letterSpacing: 2 },
  brandSubtitle: { fontSize: 13, color: '#0284C7', fontWeight: '700', marginTop: 2 },

  card: { width: '100%', maxWidth: 520, backgroundColor: '#FFFFFF', borderRadius: 24, padding: 26, borderWidth: 1, borderColor: '#E2E8F0', shadowColor: '#102A43', shadowOpacity: 0.05, shadowRadius: 16, elevation: 3 },
  cardTitle: { fontSize: 22, fontWeight: '900', color: '#102A43', marginBottom: 4 },
  cardSubtitle: { fontSize: 13, color: '#627D98', marginBottom: 20 },

  label: { fontSize: 13, fontWeight: '800', color: '#334E68', marginBottom: 8 },

  roleGrid: { flexDirection: 'row', gap: 8, marginBottom: 18 },
  roleOption: { flex: 1, backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, padding: 10, alignItems: 'center' },
  roleOptionActiveClient: { backgroundColor: '#F0FDF4', borderColor: '#16A34A' },
  roleOptionActiveFamily: { backgroundColor: '#F0F9FF', borderColor: '#0284C7' },
  roleOptionActiveCompanion: { backgroundColor: '#F0FDF4', borderColor: '#15803D' },
  roleIcon: { fontSize: 20, marginBottom: 4 },
  roleTitle: { fontSize: 11, fontWeight: '800', color: '#64748B' },
  roleTitleActive: { color: '#102A43' },
  roleSub: { fontSize: 9, color: '#94A3B8', textAlign: 'center', marginTop: 2 },

  inputGroup: { marginBottom: 14 },
  input: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14, color: '#102A43' },

  submitBtn: { backgroundColor: '#0284C7', paddingVertical: 16, borderRadius: 14, alignItems: 'center', marginTop: 10 },
  submitBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '900' },

  registerLink: { marginTop: 18, alignItems: 'center' },
  registerLinkText: { fontSize: 13, color: '#627D98' },
  registerBold: { fontWeight: '800', color: '#0284C7' },

  backButton: { marginTop: 16 },
  backButtonText: { fontSize: 13, color: '#627D98', fontWeight: '700' },
});