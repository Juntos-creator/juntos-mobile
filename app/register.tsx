import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('cliente'); // 'cliente' o 'acompanante'

  const handleRegister = () => {
    if (userType === 'acompanante') {
      // Si se registra como acompañante, lo llevamos a la pantalla de verificación de perfil
      router.push('/verification');
    } else {
      alert(`Cuenta creada con éxito para cliente: ${email}`);
      router.push('/');
    }
  };

  const handleGoToLogin = () => {
    router.push('/login');
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
          <Text style={styles.brandSubtitle}>Cuidado y compañía no clínica</Text>
        </View>

        {/* Formulario de Registro */}
        <View style={styles.card}>
          <Text style={styles.title}>Crea tu cuenta</Text>
          <Text style={styles.subtitle}>Selecciona cómo deseas unirte a nuestra comunidad.</Text>

          {/* Selector de Tipo de Usuario */}
          <View style={styles.typeSelectorRow}>
            <TouchableOpacity
              style={[styles.typeButton, userType === 'cliente' && styles.activeTypeButton]}
              onPress={() => setUserType('cliente')}
            >
              <Text style={[styles.typeButtonText, userType === 'cliente' && styles.activeTypeButtonText]}>
                Busco Acompañamiento (Cliente)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.typeButton, userType === 'acompanante' && styles.activeTypeButton]}
              onPress={() => setUserType('acompanante')}
            >
              <Text style={[styles.typeButtonText, userType === 'acompanante' && styles.activeTypeButtonText]}>
                Quiero Ser Acompañante
              </Text>
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

          <TouchableOpacity style={styles.primaryButton} onPress={handleRegister} activeOpacity={0.85}>
            <Text style={styles.primaryButtonText}>
              {userType === 'acompanante' ? 'Continuar con Verificación →' : 'Crear cuenta'}
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
  container: {
    flex: 1,
    backgroundColor: '#F5F9FC',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoMark: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  logoHeart: {
    fontSize: 34,
    color: '#0284C7',
    fontWeight: '700',
  },
  brandTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#102A43',
    letterSpacing: 2,
  },
  brandSubtitle: {
    fontSize: 13,
    color: '#0284C7',
    fontWeight: '600',
    marginTop: 4,
  },
  card: {
    width: '100%',
    maxWidth: 460,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 28,
    shadowColor: '#102A43',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#102A43',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#627D98',
    marginBottom: 20,
    lineHeight: 20,
  },
  typeSelectorRow: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 4,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 6,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTypeButton: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#102A43',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  typeButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    textAlign: 'center',
  },
  activeTypeButtonText: {
    color: '#0284C7',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334E68',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#102A43',
  },
  primaryButton: {
    backgroundColor: '#0284C7',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: '#627D98',
  },
  linkText: {
    fontSize: 13,
    color: '#0284C7',
    fontWeight: '800',
  },
  backButton: {
    paddingVertical: 10,
  },
  backButtonText: {
    fontSize: 14,
    color: '#334E68',
    fontWeight: '700',
  },
});