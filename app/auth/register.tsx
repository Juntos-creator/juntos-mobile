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

export default function RegisterScreen() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>('companion');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleRegister = async () => {
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      showAlert('Campos requeridos', 'Por favor completa todos los campos para registrarte.');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            full_name: fullName.trim(),
            phone: phone.trim(),
            role: role,
            kyc_verified: role === 'companion' ? false : true,
          },
        },
      });

      if (error) throw error;

      if (Platform.OS === 'web') {
        localStorage.setItem('juntos_user_role', role);
      }

      setLoading(false);

      if (role === 'companion') {
        showAlert(
          'Registro Inicial Recibido',
          'Para activar tu perfil de Acompañante Verificado JUNTOS, debes completar la validación de identidad KYC.'
        );
        router.replace('/kyc/companion-kyc' as any);
      } else if (role === 'family') {
        showAlert('¡Registro Exitoso!', 'Bienvenido a JUNTOS. Redirigiendo al Portal Familiar...');
        router.replace('/(client)/FamilyPortalScreen' as any);
      } else {
        showAlert('¡Registro Exitoso!', 'Bienvenido a JUNTOS. Redirigiendo a tu panel de Cliente...');
        router.replace('/(client)/home' as any);
      }
    } catch (err: any) {
      setLoading(false);
      if (Platform.OS === 'web') {
        localStorage.setItem('juntos_user_role', role);
      }

      if (role === 'companion') {
        router.replace('/kyc/companion-kyc' as any);
      } else {
        router.replace('/(client)/home' as any);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={true}
        bounces={true}
      >
        
        {/* LOGO DE MARCA */}
        <View style={styles.logoContainer}>
          <View style={styles.logoMark}>
            <Text style={styles.logoHeart}>♡</Text>
          </View>
          <Text style={styles.brandTitle}>JUNTOS</Text>
          <Text style={styles.brandSubtitle}>Crear una nueva cuenta</Text>
        </View>

        {/* TARJETA DE REGISTRO */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Registro de Usuario</Text>
          <Text style={styles.cardSubtitle}>Indica tu perfil y completa tus datos para comenzar.</Text>

          {/* SELECTOR DE TIPO DE REGISTRO */}
          <Text style={styles.label}>Tipo de Registro</Text>
          <View style={styles.roleGrid}>
            <TouchableOpacity
              style={[styles.roleOption, role === 'client' && styles.roleOptionActiveClient]}
              onPress={() => setRole('client')}
              activeOpacity={0.85}
            >
              <Text style={styles.roleIcon}>👵</Text>
              <Text style={[styles.roleTitle, role === 'client' && styles.roleTitleActive]}>Cliente Directo</Text>
              <Text style={styles.roleSub}>Soy adulto mayor</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.roleOption, role === 'family' && styles.roleOptionActiveFamily]}
              onPress={() => setRole('family')}
              activeOpacity={0.85}
            >
              <Text style={styles.roleIcon}>👥</Text>
              <Text style={[styles.roleTitle, role === 'family' && styles.roleTitleActive]}>Familiar</Text>
              <Text style={styles.roleSub}>Busco cuidado familiar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.roleOption, role === 'companion' && styles.roleOptionActiveCompanion]}
              onPress={() => setRole('companion')}
              activeOpacity={0.85}
            >
              <Text style={styles.roleIcon}>🤝</Text>
              <Text style={[styles.roleTitle, role === 'companion' && styles.roleTitleActive]}>Acompañante</Text>
              <Text style={styles.roleSub}>Requiere KYC / Cédula</Text>
            </TouchableOpacity>
          </View>

          {/* MENSAJE INFORMATIVO KYC */}
          {role === 'companion' && (
            <View style={styles.kycInfoBanner}>
              <Text style={styles.kycInfoText}>
                🛡️ <Text style={{ fontWeight: '800' }}>Verificación KYC Requerida:</Text> Los acompañantes deben validar su documento de identidad y antecedentes policiales.
              </Text>
            </View>
          )}

          {/* FORMULARIO */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. María Pérez"
              placeholderTextColor="#94A3B8"
              value={fullName}
              onChangeText={setFullName}
            />
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
            <Text style={styles.label}>Teléfono de contacto</Text>
            <TextInput
              style={styles.input}
              placeholder="+809 000 0000"
              placeholderTextColor="#94A3B8"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
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

          {/* BOTÓN REGISTRAR / SIGUIENTE PASO */}
          <TouchableOpacity
            style={[styles.submitBtn, loading && { opacity: 0.7 }]}
            onPress={handleRegister}
            disabled={loading}
            activeOpacity={0.88}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.submitBtnText}>
                {role === 'companion' ? 'Continuar a Verificación KYC →' : 'Crear Cuenta y Entrar →'}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/auth/login')} style={styles.loginLink}>
            <Text style={styles.loginLinkText}>¿Ya tienes cuenta? <Text style={styles.loginBold}>Inicia Sesión</Text></Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F9FC' },
  scrollContent: { 
    paddingHorizontal: 20, 
    paddingTop: 20, 
    paddingBottom: 80, 
    alignItems: 'center', 
    flexGrow: 1, 
    justifyContent: 'center' 
  },

  logoContainer: { alignItems: 'center', marginBottom: 16 },
  logoMark: { width: 48, height: 48, borderRadius: 14, backgroundColor: '#E0F2FE', alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  logoHeart: { fontSize: 28, color: '#0284C7', fontWeight: '700' },
  brandTitle: { fontSize: 24, fontWeight: '900', color: '#102A43', letterSpacing: 2 },
  brandSubtitle: { fontSize: 12, color: '#0284C7', fontWeight: '700', marginTop: 2 },

  card: { width: '100%', maxWidth: 520, backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24, borderWidth: 1, borderColor: '#E2E8F0', shadowColor: '#102A43', shadowOpacity: 0.05, shadowRadius: 16, elevation: 3 },
  cardTitle: { fontSize: 20, fontWeight: '900', color: '#102A43', marginBottom: 2 },
  cardSubtitle: { fontSize: 12, color: '#627D98', marginBottom: 16 },

  label: { fontSize: 12, fontWeight: '800', color: '#334E68', marginBottom: 6 },
  
  roleGrid: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  roleOption: { flex: 1, backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, padding: 8, alignItems: 'center' },
  roleOptionActiveClient: { backgroundColor: '#F0FDF4', borderColor: '#16A34A' },
  roleOptionActiveFamily: { backgroundColor: '#F0F9FF', borderColor: '#0284C7' },
  roleOptionActiveCompanion: { backgroundColor: '#F0FDF4', borderColor: '#15803D' },
  roleIcon: { fontSize: 18, marginBottom: 2 },
  roleTitle: { fontSize: 11, fontWeight: '800', color: '#64748B' },
  roleTitleActive: { color: '#102A43' },
  roleSub: { fontSize: 8, color: '#94A3B8', textAlign: 'center', marginTop: 2 },

  kycInfoBanner: { backgroundColor: '#F0F9FF', borderRadius: 10, padding: 10, borderWidth: 1, borderColor: '#BAE6FD', marginBottom: 12 },
  kycInfoText: { fontSize: 11, color: '#0369A1', lineHeight: 15 },

  inputGroup: { marginBottom: 10 },
  input: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, fontSize: 13, color: '#102A43' },

  submitBtn: { backgroundColor: '#0284C7', paddingVertical: 15, borderRadius: 12, alignItems: 'center', marginTop: 12 },
  submitBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '900' },

  loginLink: { marginTop: 14, alignItems: 'center' },
  loginLinkText: { fontSize: 12, color: '#627D98' },
  loginBold: { fontWeight: '800', color: '#0284C7' },
});