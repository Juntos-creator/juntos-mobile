import React, { useState, useEffect } from 'react';
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

export default function CompanionKYCScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [cedula, setCedula] = useState('');
  const [exequatur, setExequatur] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const showAlert = (title: string, message: string, onOk?: () => void) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
      if (onOk) onOk();
    } else {
      Alert.alert(title, message, [{ text: 'OK', onPress: onOk }]);
    }
  };

  const loadUserProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: userData } = await supabase
          .from('users')
          .select('full_name')
          .eq('id', user.id)
          .maybeSingle();

        if (userData?.full_name) {
          setFullName(userData.full_name);
        }
      }
    } catch (error) {
      console.error('Error al cargar perfil:', error);
    }
  };

  const handleSubmitKYC = async () => {
    if (!fullName.trim() || !cedula.trim() || !specialty.trim()) {
      showAlert('Campos incompletos', 'Por favor llena al menos tu nombre, cédula y especialidad.');
      return;
    }

    setLoading(true);

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error('Debes iniciar sesión para enviar tu verificación KYC.');
      }

      const { error: kycError } = await supabase
        .from('companion_kyc')
        .upsert(
          [
            {
              user_id: user.id,
              full_name: fullName.trim(),
              cedula: cedula.trim(),
              exequatur: exequatur.trim() || 'N/A',
              specialty: specialty.trim(),
              experience_years: parseInt(experienceYears) || 0,
              status: 'pending_review',
              submitted_at: new Date().toISOString(),
            },
          ],
          { onConflict: 'user_id' }
        );

      if (kycError) throw kycError;

      showAlert(
        '¡Documentos enviados!',
        'Tu expediente ha sido enviado al equipo de RRHH y Legal para su validación. Te notificaremos cuando tu cuenta esté aprobada.',
        () => router.replace('/auth/login')
      );

    } catch (error: any) {
      showAlert('Error de envío', error.message || 'No se pudo registrar la información KYC.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoBackHome = () => {
    router.push('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Cabecera */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBackHome} style={styles.logoMark}>
            <Text style={styles.logoHeart}>♡</Text>
          </TouchableOpacity>
          <Text style={styles.logoText}>JUNTOS</Text>
          <Text style={styles.title}>Verificación KYC - Acompañante</Text>
          <Text style={styles.subtitle}>Completa tus datos profesionales para unirte a nuestra red certificada.</Text>
        </View>

        {/* Formulario KYC */}
        <View style={styles.formContainer}>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre Completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. Dra. Ana Martínez"
              placeholderTextColor="#94A3B8"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cédula de Identidad</Text>
            <TextInput
              style={styles.input}
              placeholder="001-0000000-0"
              placeholderTextColor="#94A3B8"
              value={cedula}
              onChangeText={setCedula}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Número de Exequatur (Si aplica)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. 12345"
              placeholderTextColor="#94A3B8"
              value={exequatur}
              onChangeText={setExequatur}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Especialidad / Área de Cuidado</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. Cuidados Geriátricos / Acompañamiento"
              placeholderTextColor="#94A3B8"
              value={specialty}
              onChangeText={setSpecialty}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Años de Experiencia</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. 5"
              placeholderTextColor="#94A3B8"
              value={experienceYears}
              onChangeText={setExperienceYears}
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity 
            style={[styles.submitButton, loading && { opacity: 0.7 }]} 
            onPress={handleSubmitKYC}
            disabled={loading}
            activeOpacity={0.85}
          >
            <Text style={styles.submitButtonText}>
              {loading ? 'Enviando expediente...' : 'Enviar para Revisión (RRHH & Legal)'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleGoBackHome} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Volver al inicio</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContainer: { padding: 24, alignItems: 'center', flexGrow: 1 },
  header: { alignItems: 'center', marginBottom: 24, width: '100%', maxWidth: 500 },
  logoMark: { width: 56, height: 56, borderRadius: 18, backgroundColor: '#E0F2FE', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  logoHeart: { fontSize: 34, color: '#0284C7', fontWeight: '700' },
  logoText: { fontSize: 24, fontWeight: '900', color: '#102A43', letterSpacing: 2, marginBottom: 6 },
  title: { fontSize: 22, fontWeight: '800', color: '#102A43', marginBottom: 6, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#627D98', textAlign: 'center', lineHeight: 20 },
  
  formContainer: { 
    width: '100%', 
    maxWidth: 500, 
    backgroundColor: '#FFFFFF', 
    borderRadius: 24, 
    padding: 28, 
    shadowColor: '#102A43', 
    shadowOpacity: 0.08, 
    shadowRadius: 20, 
    shadowOffset: { width: 0, height: 8 }, 
    elevation: 4,
    marginBottom: 40
  },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '700', color: '#334E68', marginBottom: 8 },
  input: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14, color: '#102A43' },

  submitButton: { backgroundColor: '#0284C7', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  submitButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
  backButton: { paddingVertical: 14, alignItems: 'center', marginTop: 8 },
  backButtonText: { fontSize: 14, color: '#334E68', fontWeight: '700' },
});