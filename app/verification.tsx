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

export default function CompanionVerificationScreen() {
  const router = useRouter();
  const [idNumber, setIdNumber] = useState('');
  const [exequatur, setExequatur] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [experience, setExperience] = useState('');

  const handleSubmitVerification = () => {
    alert(`Enviando documentación de acompañante. Cédula: ${idNumber}`);
    router.push('/');
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
          <Text style={styles.brandSubtitle}>Verificación de tu Perfil de Acompañante</Text>
        </View>

        {/* Formulario de Verificación */}
        <View style={styles.card}>
          <Text style={styles.title}>Completa tus datos profesionales</Text>
          <Text style={styles.subtitle}>
            Para garantizar la seguridad y confianza de las familias, requerimos validar tu identidad y antecedentes antes de comenzar a recibir servicios.
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Número de Cédula o Documento de Identidad</Text>
            <TextInput
              style={styles.input}
              placeholder="001-0000000-0"
              placeholderTextColor="#94A3B8"
              value={idNumber}
              onChangeText={setIdNumber}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Número de Exequatur / Licencia Profesional (Si aplica)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. 12345"
              placeholderTextColor="#94A3B8"
              value={exequatur}
              onChangeText={setExequatur}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Especialidad o Área de Cuidado</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. Cuidados Geriátricos / Acompañamiento en Casa"
              placeholderTextColor="#94A3B8"
              value={specialty}
              onChangeText={setSpecialty}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Años de Experiencia Comprobable</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. 3 años"
              placeholderTextColor="#94A3B8"
              value={experience}
              onChangeText={setExperience}
              keyboardType="numeric"
            />
          </View>

          {/* Sección de carga de documentos */}
          <View style={styles.uploadBox}>
            <Text style={styles.uploadTitle}>📄 Documentación de Respaldo</Text>
            <Text style={styles.uploadDesc}>
              Sube una foto clara de tu Cédula, Exequatur y Certificado de Buena Conducta.
            </Text>
            <TouchableOpacity
              style={styles.uploadBtn}
              onPress={() => alert('Seleccionar archivos de respaldo')}
            >
              <Text style={styles.uploadBtnText}>Adjuntar Archivos</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={handleSubmitVerification} activeOpacity={0.85}>
            <Text style={styles.primaryButtonText}>Enviar para revisión</Text>
          </TouchableOpacity>

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
    fontSize: 24,
    fontWeight: '900',
    color: '#102A43',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  brandSubtitle: {
    fontSize: 13,
    color: '#0284C7',
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 480,
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
    fontSize: 22,
    fontWeight: '900',
    color: '#102A43',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: '#627D98',
    marginBottom: 20,
    lineHeight: 20,
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
  uploadBox: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#94A3B8',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 5,
  },
  uploadTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  uploadDesc: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 18,
  },
  uploadBtn: {
    backgroundColor: '#E2E8F0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  uploadBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
  },
  primaryButton: {
    backgroundColor: '#0284C7',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 5,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
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