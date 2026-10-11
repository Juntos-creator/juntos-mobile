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
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../src/services/supabase';

export default function CompanionKYCScreen() {
  const router = useRouter();
  
  // Datos personales y profesionales
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [cedula, setCedula] = useState('');
  const [exequatur, setExequatur] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [bio, setBio] = useState('');

  // Referencia Personal / Emergencia
  const [referenceName, setReferenceName] = useState('');
  const [referencePhone, setReferencePhone] = useState('');

  // Documentos adjuntos (URLs / Estado)
  const [idDocumentUrl, setIdDocumentUrl] = useState('');
  const [criminalRecordUrl, setCriminalRecordUrl] = useState('');

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
          .select('full_name, phone')
          .eq('id', user.id)
          .maybeSingle();

        if (userData?.full_name) setFullName(userData.full_name);
        if (userData?.phone) setPhone(userData.phone);
      }
    } catch (error) {
      console.error('Error al cargar perfil:', error);
    }
  };

  const handleSubmitKYC = async () => {
    if (!fullName.trim() || !cedula.trim() || !phone.trim() || !specialty.trim() || !referencePhone.trim()) {
      showAlert(
        'Campos requeridos incompletos',
        'Por favor completa tu nombre, teléfono, cédula, especialidad y al menos un teléfono de referencia/emergencia.'
      );
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
              phone: phone.trim(),
              cedula: cedula.trim(),
              exequatur: exequatur.trim() || 'N/A',
              specialty: specialty.trim(),
              experience_years: parseInt(experienceYears) || 0,
              hourly_rate: parseFloat(hourlyRate) || 0,
              bio: bio.trim(),
              reference_name: referenceName.trim(),
              reference_phone: referencePhone.trim(),
              id_document_url: idDocumentUrl.trim() || null,
              criminal_record_url: criminalRecordUrl.trim() || null,
              status: 'pending_review',
              submitted_at: new Date().toISOString(),
            },
          ],
          { onConflict: 'user_id' }
        );

      if (kycError) throw kycError;

      showAlert(
        '¡Expediente enviado!',
        'Tus datos y documentos han sido enviados a RRHH y Legal para su revisión. Te notificaremos al aprobar tu cuenta.',
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
          <Text style={styles.subtitle}>Completa tu expediente profesional para el equipo de RRHH y Legal.</Text>
        </View>

        {/* Formulario KYC */}
        <View style={styles.formContainer}>
          
          <Text style={styles.sectionHeader}>1. Datos Personales y Contacto</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre Completo *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. Licda. Ana Martínez"
              placeholderTextColor="#94A3B8"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Teléfono de Contacto Directo *</Text>
            <TextInput
              style={styles.input}
              placeholder="809-000-0000"
              placeholderTextColor="#94A3B8"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cédula de Identidad y Electoral *</Text>
            <TextInput
              style={styles.input}
              placeholder="001-0000000-0"
              placeholderTextColor="#94A3B8"
              value={cedula}
              onChangeText={setCedula}
            />
          </View>

          <Text style={styles.sectionHeader}>2. Perfil Profesional y Especialidad</Text>

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
            <Text style={styles.label}>Especialidad / Área Principal *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. Cuidados Geriátricos / Enfermería / Acompañamiento"
              placeholderTextColor="#94A3B8"
              value={specialty}
              onChangeText={setSpecialty}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Años Experiencia</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. 5"
                placeholderTextColor="#94A3B8"
                value={experienceYears}
                onChangeText={setExperienceYears}
                keyboardType="numeric"
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>Tarifa/Hora (DOP$)</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. 600"
                placeholderTextColor="#94A3B8"
                value={hourlyRate}
                onChangeText={setHourlyRate}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Resumen de Experiencia / Biografía</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe brevemente tu experiencia previa en cuidado o acompañamiento de adultos mayores..."
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={4}
              value={bio}
              onChangeText={setBio}
            />
          </View>

          <Text style={styles.sectionHeader}>3. Referencia de Emergencia / Personal</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre de Referencia / Contacto *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. Dr. Carlos Gómez"
              placeholderTextColor="#94A3B8"
              value={referenceName}
              onChangeText={setReferenceName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Teléfono de Referencia *</Text>
            <TextInput
              style={styles.input}
              placeholder="809-555-0000"
              placeholderTextColor="#94A3B8"
              keyboardType="phone-pad"
              value={referencePhone}
              onChangeText={setReferencePhone}
            />
          </View>

          <Text style={styles.sectionHeader}>4. Documentación Adjunta (URLs)</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Enlace a Cédula/ID Escaneada</Text>
            <TextInput
              style={styles.input}
              placeholder="https://drive.google.com/..."
              placeholderTextColor="#94A3B8"
              value={idDocumentUrl}
              onChangeText={setIdDocumentUrl}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Enlace a Certificado de No Antecedentes</Text>
            <TextInput
              style={styles.input}
              placeholder="https://drive.google.com/..."
              placeholderTextColor="#94A3B8"
              value={criminalRecordUrl}
              onChangeText={setCriminalRecordUrl}
            />
          </View>

          <TouchableOpacity 
            style={[styles.submitButton, loading && { opacity: 0.7 }]} 
            onPress={handleSubmitKYC}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.submitButtonText}>Enviar expediente a RRHH y Legal →</Text>
            )}
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
  header: { alignItems: 'center', marginBottom: 24, width: '100%', maxWidth: 520 },
  logoMark: { width: 56, height: 56, borderRadius: 18, backgroundColor: '#E0F2FE', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  logoHeart: { fontSize: 34, color: '#0284C7', fontWeight: '700' },
  logoText: { fontSize: 24, fontWeight: '900', color: '#102A43', letterSpacing: 2, marginBottom: 6 },
  title: { fontSize: 22, fontWeight: '800', color: '#102A43', marginBottom: 6, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#627D98', textAlign: 'center', lineHeight: 20 },
  
  formContainer: { 
    width: '100%', 
    maxWidth: 520, 
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
  sectionHeader: { fontSize: 15, fontWeight: '800', color: '#0284C7', marginTop: 12, marginBottom: 14, borderBottomWidth: 1, borderBottomColor: '#E2E8F0', paddingBottom: 6 },
  inputGroup: { marginBottom: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  label: { fontSize: 13, fontWeight: '700', color: '#334E68', marginBottom: 8 },
  input: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14, color: '#102A43' },
  textArea: { height: 90, textAlignVertical: 'top' },

  submitButton: { backgroundColor: '#0284C7', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  submitButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
  backButton: { paddingVertical: 14, alignItems: 'center', marginTop: 8 },
  backButtonText: { fontSize: 14, color: '#334E68', fontWeight: '700' },
});