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
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../src/services/supabase';

export default function RegisterScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [clientRole, setClientRole] = useState<'cliente' | 'familiar'>('cliente');
  const [loading, setLoading] = useState(false);

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleRegister = async () => {
    if (!fullName || !email || !password) {
      showAlert('Error', 'Por favor completa todos los campos requeridos.');
      return;
    }

    setLoading(true);

    try {
      // 1. Registro en Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            full_name: fullName,
            phone: phone,
            user_type: clientRole,
          },
        },
      });

      if (authError) throw authError;

      const user = authData.user;

      if (user) {
        // 2. Insertar/Actualizar en la tabla public.users con el tipo específico
        const { error: profileError } = await supabase.from('users').upsert({
          id: user.id,
          full_name: fullName,
          email: email.trim(),
          phone: phone,
          user_type: clientRole,
          created_at: new Date().toISOString(),
        });

        if (profileError) {
          console.error('Error guardando perfil:', profileError.message);
        }

        showAlert(
          'Registro exitoso',
          'Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión.'
        );

        // 3. Redireccionar al login
        router.replace('/auth/login');
      }
    } catch (error: any) {
      console.error('Error en registro:', error);
      showAlert('Error de registro', error.message || 'No se pudo crear la cuenta.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoToLogin = () => {
    router.push('/auth/login');
  };

  const handleGoBackHome = () => {
    router.push('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Cabecera / Logo */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleGoBackHome} style={styles.logoMark}>
            <Text style={styles.logoHeart}>♡</Text>
          </TouchableOpacity>
          <Text style={styles.brandTitle}>JUNTOS</Text>
          <Text style={styles.brandSubtitle}>Crear una nueva cuenta</Text>
        </View>

        {/* Formulario */}
        <View style={styles.card}>
          <Text style={styles.title}>Registro de Usuario</Text>
          <Text style={styles.subtitle}>Indica tu perfil y completa tus datos para comenzar.</Text>

          {/* Selector de Tipo de Usuario */}
          <Text style={styles.label}>Tipo de Registro</Text>
          <View style={styles.roleSelectorContainer}>
            <TouchableOpacity
              style={[
                styles.roleOption,
                clientRole === 'cliente' && styles.roleOptionActive,
              ]}
              onPress={() => setClientRole('cliente')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.roleOptionText,
                  clientRole === 'cliente' && styles.roleOptionTextActive,
                ]}
              >
                👴 Cliente Directo
              </Text>
              <Text style={styles.roleDescription}>Soy adulto mayor</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleOption,
                clientRole === 'familiar' && styles.roleOptionActive,
              ]}
              onPress={() => setClientRole('familiar')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.roleOptionText,
                  clientRole === 'familiar' && styles.roleOptionTextActive,
                ]}
              >
                👥 Familiar
              </Text>
              <Text style={styles.roleDescription}>Busco cuidado para un familiar</Text>
            </TouchableOpacity>
          </View>

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
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Teléfono de contacto</Text>
            <TextInput
              style={styles.input}
              placeholder="+809 000 0000"
              placeholderTextColor="#94A3B8"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
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
            onPress={handleRegister}
            disabled={loading}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryButtonText}>
              {loading ? 'Creando cuenta...' : 'Registrarme'}
            </Text>
          </TouchableOpacity>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>¿Ya tienes una cuenta? </Text>
            <TouchableOpacity onPress={handleGoToLogin}>
              <Text style={styles.linkText}>Inicia sesión</Text>
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
  subtitle: { fontSize: 14, color: '#627D98', marginBottom: 20, lineHeight: 20 },
  roleSelectorContainer: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  roleOption: { flex: 1, padding: 12, borderWidth: 2, borderColor: '#E2E8F0', borderRadius: 12, backgroundColor: '#F8FAFC', alignItems: 'center' },
  roleOptionActive: { borderColor: '#0284C7', backgroundColor: '#E0F2FE' },
  roleOptionText: { fontSize: 13, fontWeight: '700', color: '#64748B' },
  roleOptionTextActive: { color: '#0284C7' },
  roleDescription: { fontSize: 10, color: '#94A3B8', marginTop: 2, textAlign: 'center' },
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