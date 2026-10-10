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
import { getCarePreferences, saveCarePreferences } from '../../src/services/clientService';

export default function CarePreferencesScreen() {
  const router = useRouter();
  const [mobilityNeeds, setMobilityNeeds] = useState('');
  const [dailyRoutine, setDailyRoutine] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    loadPreferences();
  }, []);

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const loadPreferences = async () => {
    try {
      const data = await getCarePreferences();
      if (data) {
        setMobilityNeeds(data.mobility_needs || '');
        setDailyRoutine(data.daily_routine || '');
        setEmergencyContact(data.emergency_contact || '');
      }
    } catch (error: any) {
      console.error('Error al cargar preferencias:', error);
    } finally {
      setFetching(false);
    }
  };

  const handleSavePreferences = async () => {
    setLoading(true);
    try {
      await saveCarePreferences({
        mobility_needs: mobilityNeeds.trim(),
        daily_routine: dailyRoutine.trim(),
        emergency_contact: emergencyContact.trim(),
      });

      showAlert('¡Actualizado!', 'Las preferencias y rutinas de cuidado se han guardado correctamente.');
      router.replace('/(client)/home');
    } catch (error: any) {
      showAlert('Error', error.message || 'No se pudieron guardar las preferencias.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Cabecera */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/(client)/home')} style={styles.logoMark}>
            <Text style={styles.logoHeart}>♡</Text>
          </TouchableOpacity>
          <Text style={styles.logoText}>JUNTOS</Text>
          <Text style={styles.title}>Preferencias de Acompañamiento</Text>
          <Text style={styles.subtitle}>
            Información clave para que el acompañante brinde una asistencia personalizada, cómoda y segura.
          </Text>
        </View>

        {/* Formulario */}
        <View style={styles.formContainer}>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Necesidades de Movilidad y Asistencia Física</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Ej. Utiliza bastón, requiere apoyo leve para caminatas o subir escalones..."
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={3}
              value={mobilityNeeds}
              onChangeText={setMobilityNeeds}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Rutina Diaria o Preferencias de Horarios</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Ej. Prefiere paseos por la mañana, descanso a las 3:00 PM, lectura de tarde..."
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={3}
              value={dailyRoutine}
              onChangeText={setDailyRoutine}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contacto de Emergencia / Familiar Responsable</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre y Teléfono (Ej. María Gómez - 809-000-0000)"
              placeholderTextColor="#94A3B8"
              value={emergencyContact}
              onChangeText={setEmergencyContact}
            />
          </View>

          <TouchableOpacity 
            style={[styles.submitButton, (loading || fetching) && { opacity: 0.7 }]} 
            onPress={handleSavePreferences}
            disabled={loading || fetching}
            activeOpacity={0.85}
          >
            <Text style={styles.submitButtonText}>
              {loading ? 'Guardando...' : 'Guardar Preferencias'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/(client)/home')} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Volver al Panel Principal</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContainer: { padding: 24, alignItems: 'center' },
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
    elevation: 4 
  },
  inputGroup: { marginBottom: 18 },
  label: { fontSize: 13, fontWeight: '700', color: '#334E68', marginBottom: 8 },
  input: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14, color: '#102A43' },
  textArea: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14, color: '#102A43', textAlignVertical: 'top', minHeight: 90 },

  submitButton: { backgroundColor: '#0284C7', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  submitButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
  backButton: { paddingVertical: 14, alignItems: 'center', marginTop: 8 },
  backButtonText: { fontSize: 14, color: '#334E68', fontWeight: '700' },
});