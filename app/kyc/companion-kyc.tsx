import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function CompanionKycScreen() {
  const [exequatur, setExequatur] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [experience, setExperience] = useState('');
  const [idNumber, setIdNumber] = useState('');

  const handleSubmitKyc = () => {
    alert(`Enviando documentos KYC de Acompañante. Cédula: ${idNumber}, Exequatur: ${exequatur}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Cabecera */}
        <View style={styles.header}>
          <Text style={styles.logoText}>JUNTOS</Text>
          <Text style={styles.title}>Verificación KYC Profesional</Text>
          <Text style={styles.subtitle}>Completa tus datos para validar tu perfil y comenzar a recibir servicios</Text>
        </View>

        {/* Formulario KYC */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Número de Cédula o Documento de Identidad</Text>
          <TextInput 
            style={styles.input} 
            placeholder="001-0000000-0" 
            placeholderTextColor="#94A3B8"
            value={idNumber}
            onChangeText={setIdNumber}
          />

          <Text style={styles.label}>Número de Exequatur / Licencia Profesional</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ej. 12345 (Si aplica)" 
            placeholderTextColor="#94A3B8"
            value={exequatur}
            onChangeText={setExequatur}
          />

          <Text style={styles.label}>Especialidad o Área de Cuidado</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ej. Enfermería Geriátrica / Cuidados en Casa" 
            placeholderTextColor="#94A3B8"
            value={specialty}
            onChangeText={setSpecialty}
          />

          <Text style={styles.label}>Años de Experiencia Comprobable</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ej. 5 años" 
            placeholderTextColor="#94A3B8"
            value={experience}
            onChangeText={setExperience}
            keyboardType="numeric"
          />

          {/* Sección de carga de documentos */}
          <View style={styles.uploadBox}>
            <Text style={styles.uploadTitle}>📄 Documentación de Respaldo</Text>
            <Text style={styles.uploadDesc}>Sube foto de tu Cédula, Exequatur y Certificado de Buena Conducta.</Text>
            <TouchableOpacity style={styles.uploadBtn} onPress={() => alert('Seleccionar archivos de respaldo')}>
              <Text style={styles.uploadBtnText}>Adjuntar Archivos</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitKyc}>
            <Text style={styles.submitButtonText}>Enviar para Validación Operativa</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContainer: { padding: 24, justifyContent: 'center', alignItems: 'center' },
  header: { alignItems: 'center', marginBottom: 24, width: '100%', maxWidth: 450 },
  logoText: { fontSize: 24, fontWeight: '900', color: '#0F172A', letterSpacing: 2, marginBottom: 12 },
  title: { fontSize: 22, fontWeight: '800', color: '#1E293B', marginBottom: 6, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#64748B', textAlign: 'center' },
  
  formContainer: { width: '100%', maxWidth: 450 },
  label: { fontSize: 13, fontWeight: '600', color: '#334155', marginBottom: 8 },
  input: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14, color: '#0F172A', marginBottom: 16 },
  
  uploadBox: { backgroundColor: '#F1F5F9', borderWidth: 1, borderStyle: 'dashed', borderColor: '#94A3B8', borderRadius: 12, padding: 16, alignItems: 'center', marginBottom: 20 },
  uploadTitle: { fontSize: 14, fontWeight: '700', color: '#1E293B', marginBottom: 4 },
  uploadDesc: { fontSize: 12, color: '#64748B', textAlign: 'center', marginBottom: 12 },
  uploadBtn: { backgroundColor: '#E2E8F0', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
  uploadBtnText: { fontSize: 12, fontWeight: '700', color: '#334155' },

  submitButton: { backgroundColor: '#0284C7', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  submitButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' }
});